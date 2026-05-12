import db from './db.js';

const seedData = () => {
    try {
        // better-sqlite3 uses standard synchronous calls, no .serialize()
        
        // Insert product
        const insertProduct = db.prepare(`INSERT OR IGNORE INTO Products (model_group_id, item_code, name, category) 
                VALUES (?, ?, ?, ?)`);
        insertProduct.run('u-crew-t', '422992', 'UNIQLO U 系列圓領 T 恤 (短袖)', 'T-Shirt');

        const product = db.prepare('SELECT id FROM Products WHERE item_code = ?').get('422992');
        const productId = product.id;

        // Insert price history
        const history = [
            [productId, 390, 'LIST', '2022-01-01', '基準售價'],
            [productId, 490, 'LIST', '2023-01-01', '全球物流成本與原物料上漲'],
            [productId, 590, 'LIST', '2024-01-01', '品質升級與磅數增加']
        ];

        const insertHistory = db.prepare(`INSERT INTO Price_History (product_id, price, price_type, recorded_at, change_reason) VALUES (?, ?, ?, ?, ?)`);
        
        // Run in a transaction for better-sqlite3 performance and safety
        const transaction = db.transaction((rows) => {
            for (const row of rows) insertHistory.run(row);
        });
        
        transaction(history);
        
        console.log('Seed data inserted successfully.');
    } catch (err) {
        console.error('Error seeding data:', err.message);
    }
};

seedData();
