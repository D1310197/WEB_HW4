import db from './db.js';
import { crawlPrice } from './crawler.js';

async function updateAllNames() {
    console.log('--- 品名自動補全工具啟動 ---');
    
    db.all(`SELECT id, item_code FROM Products WHERE name IS NULL`, [], async (err, rows) => {
        if (err) return console.error(err);
        
        console.log(`發現 ${rows.length} 個尚無品名的商品。`);

        for (const product of rows) {
            console.log(`正在抓取商品名稱: #${product.item_code}...`);
            const data = await crawlPrice(product.item_code);
            
            if (data && data.name) {
                db.run(`UPDATE Products SET name = ? WHERE id = ?`, [data.name, product.id]);
                console.log(`✓ 已成功更新: ${data.name}`);
            } else {
                console.log(`× 無法獲取商品 #${product.item_code} 的品名`);
            }
        }
        
        setTimeout(() => {
            console.log('--- 全部更新完成 ---');
            process.exit(0);
        }, 3000);
    });
}

updateAllNames();
