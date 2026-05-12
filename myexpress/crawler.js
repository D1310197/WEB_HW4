import puppeteer from 'puppeteer';
import db from './db.js';

export async function crawlPrice(itemCode) {
    const browser = await puppeteer.launch({ 
        headless: "new",
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', // <- this one can be tricky but sometimes helps in low ram
            '--disable-gpu'
        ]
    });
    const page = await browser.newPage();
    try {
        const url = `https://www.uniqlo.com/tw/zh_TW/product.html?itemCode=${itemCode}`;
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

        // UNIQLO TW uses specific classes for price. 
        // Note: These selectors may need updates based on actual site structure.
        const priceData = await page.evaluate(() => {
            const listPriceEl = document.querySelector('.price-limited');
            const nameEl = document.querySelector('.pdp-title');
            
            return {
                price: listPriceEl ? parseInt(listPriceEl.innerText.replace(/[^0-9]/g, '')) : null,
                name: nameEl ? nameEl.innerText.trim() : null
            };
        });

        return priceData;
    } catch (error) {
        console.error(`Error crawling ${itemCode}:`, error.message);
        return null;
    } finally {
        await browser.close();
    }
}

export async function updateProductPrices() {
    const rows = db.prepare(`SELECT id, item_code FROM Products`).all();

    for (const product of rows) {
        console.log(`Crawling price for item: ${product.item_code}`);
        const data = await crawlPrice(product.item_code);
        
        if (data && data.price) {
            // 更新商品名稱（如果資料庫中還沒有名稱）
            if (data.name) {
                db.prepare(`UPDATE Products SET name = ? WHERE id = ? AND name IS NULL`).run(data.name, product.id);
            }

            // Check last recorded price to prevent redundancy or detect major jumps
            const lastRecord = db.prepare(`SELECT price FROM Price_History WHERE product_id = ? ORDER BY recorded_at DESC LIMIT 1`).get(product.id);
            
            if (!lastRecord || lastRecord.price !== data.price) {
                const changeReason = lastRecord ? '系統自動偵測價格異動' : '初始採集';
                db.prepare(`INSERT INTO Price_History (product_id, price, price_type, recorded_at, change_reason) 
                        VALUES (?, ?, 'LIST', DATE('now'), ?)`).run(product.id, data.price, changeReason);
                console.log(`Updated price for ${product.item_code}: $${data.price}`);
            } else {
                console.log(`Price for ${product.item_code} remains the same.`);
            }
        }
    }
}
