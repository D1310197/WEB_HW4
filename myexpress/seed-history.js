import db from './db.js';

const historicalData = [
    { item_code: '464851', prices: [{p: 390, d: '2022-05-15'}, {p: 490, d: '2023-05-15'}, {p: 590, d: '2024-05-15'}] },
    { item_code: '464022', prices: [{p: 390, d: '2022-06-10'}, {p: 490, d: '2023-06-10'}, {p: 590, d: '2024-06-10'}] },
    { item_code: '469456', prices: [{p: 290, d: '2022-08-01'}, {p: 390, d: '2023-08-01'}, {p: 390, d: '2024-08-01'}] },
    { item_code: '459590', prices: [{p: 1990, d: '2022-10-20'}, {p: 2490, d: '2023-11-15'}, {p: 2490, d: '2024-11-15'}] },
    { item_code: '463991', prices: [{p: 1290, d: '2022-03-01'}, {p: 1290, d: '2023-03-01'}, {p: 1490, d: '2024-03-01'}] },
    { item_code: '450251', prices: [{p: 390, d: '2022-12-01'}, {p: 590, d: '2023-12-01'}] },
    { item_code: '459190', prices: [{p: 990, d: '2022-04-01'}, {p: 1290, d: '2023-04-01'}] },
    { item_code: '422992', prices: [{p: 390, d: '2021-09-01'}, {p: 590, d: '2023-09-01'}] },
    { item_code: '464912', prices: [{p: 1290, d: '2023-01-01'}, {p: 1490, d: '2024-01-01'}] },
    { item_code: '467008', prices: [{p: 1990, d: '2022-05-01'}, {p: 2490, d: '2024-05-01'}] },
    { item_code: '460324', prices: [{p: 590, d: '2022-06-01'}, {p: 790, d: '2023-06-01'}] },
    { item_code: '464437', prices: [{p: 390, d: '2022-03-01'}, {p: 590, d: '2024-03-01'}] },
    { item_code: '464018', prices: [{p: 790, d: '2022-08-01'}, {p: 990, d: '2023-08-01'}] },
    { item_code: '464836', prices: [{p: 790, d: '2022-11-01'}, {p: 990, d: '2023-11-01'}] },
    { item_code: '461394', prices: [{p: 790, d: '2022-07-01'}, {p: 990, d: '2023-07-01'}] }
];

async function seedHistory() {
    console.log('--- 歷史價格數據導入中 ---');
    
    for (const data of historicalData) {
        db.get('SELECT id FROM Products WHERE item_code = ?', [data.item_code], (err, product) => {
            if (product) {
                data.prices.forEach(h => {
                    db.run(
                        'INSERT INTO Price_History (product_id, price, price_type, recorded_at, change_reason) VALUES (?, ?, "LIST", ?, "歷史通膨數據導入")',
                        [product.id, h.p, h.d],
                        (err) => { if (err) console.error(err); }
                    );
                });
                console.log(`✓ 已為 #${data.item_code} 加入 ${data.prices.length} 筆歷史紀錄`);
            }
        });
    }

    setTimeout(() => {
        console.log('--- 數據填充完成 ---');
        process.exit(0);
    }, 3000);
}

seedHistory();
