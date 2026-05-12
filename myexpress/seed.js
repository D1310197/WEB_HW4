import db from './db.js';

const seedData = async () => {
    db.serialize(() => {
        // Insert product
        db.run(`INSERT OR IGNORE INTO Products (model_group_id, item_code, name, category) 
                VALUES ('u-crew-t', '422992', 'UNIQLO U 系列圓領 T 恤 (短袖)', 'T-Shirt')`, function(err) {
            if (err) return console.error(err.message);
            const productId = 1; // Simplification for seeding

            // Insert price history
            const history = [
                [productId, 390, 'LIST', '2022-01-01', '基準售價'],
                [productId, 490, 'LIST', '2023-01-01', '全球物流成本與原物料上漲'],
                [productId, 590, 'LIST', '2024-01-01', '品質升級與磅數增加']
            ];

            const stmt = db.prepare(`INSERT INTO Price_History (product_id, price, price_type, recorded_at, change_reason) VALUES (?, ?, ?, ?, ?)`);
            history.forEach(row => stmt.run(row));
            stmt.finalize();
            
            console.log('Seed data inserted successfully.');
        });
    });
};

seedData();
