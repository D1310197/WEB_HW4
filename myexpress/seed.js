import db from './db.js';

const products = [
    { item_code: '422992', model_group_id: 'u-crew-t', category: 'T-Shirt', name: 'UNIQLO U 系列圓領 T 恤 (短袖)' },
    { item_code: '464851', model_group_id: 'SUPIMA-T', category: 'T-Shirt', name: 'SUPIMA COTTON 圓領 T 恤' },
    { item_code: '464022', model_group_id: 'AIRISM-T', category: 'T-Shirt', name: 'AIRism 棉質寬版 T 恤' },
    { item_code: '461394', model_group_id: 'OXFORD-SHIRT', category: 'Shirt', name: '牛津合身襯衫' },
    { item_code: '463991', model_group_id: 'SELVEDGE-JEANS', category: 'Pants', name: '彈性赤耳合身牛仔褲' },
    { item_code: '464912', model_group_id: 'CHINO-PANTS', category: 'Pants', name: '合身休閒長褲' },
    { item_code: '450251', model_group_id: 'HEATTECH-T', category: 'Innerwear', name: 'HEATTECH 圓領 T 恤' },
    { item_code: '459590', model_group_id: 'ULTRA-LIGHT-DOWN', category: 'Outerwear', name: '特級極輕羽絨外套' },
    { item_code: '467008', model_group_id: 'BLOCKTECH-PARKA', category: 'Outerwear', name: 'BLOCKTECH 防風雨連帽外套' },
    { item_code: '460324', model_group_id: 'DRY-EX-T', category: 'Activewear', name: 'DRY-EX 圓領 T 恤' },
    { item_code: '459701', model_group_id: 'SWEAT-PANTS', category: 'Pants', name: '休閒長褲' },
    { item_code: '469456', model_group_id: 'ROUND-MINI-BAG', category: 'Accessories', name: '弧形迷你肩背包' },
    { item_code: '464437', model_group_id: 'UT-GRAPHIC-T', category: 'T-Shirt', name: 'UT 印花 T 恤' },
    { item_code: '459190', model_group_id: 'LINEN-SHIRT', category: 'Shirt', name: '高級麻製襯衫' },
    { item_code: '464018', model_group_id: 'ANKLE-PANTS', category: 'Pants', name: '聰明九分褲' },
    { item_code: '464836', model_group_id: 'FLANNEL-SHIRT', category: 'Shirt', name: '法蘭絨格子襯衫' }
];

const seedData = () => {
    try {
        console.log('Starting full database seeding...');

        const insertProduct = db.prepare(`INSERT OR IGNORE INTO Products (item_code, model_group_id, category, name) VALUES (?, ?, ?, ?)`);
        const insertHistory = db.prepare(`INSERT INTO Price_History (product_id, price, price_type, recorded_at, change_reason) VALUES (?, ?, ?, ?, ?)`);
        
        const transaction = db.transaction(() => {
            for (const p of products) {
                insertProduct.run(p.item_code, p.model_group_id, p.category, p.name);
                
                // Get the ID (either just inserted or already existed)
                const product = db.prepare('SELECT id FROM Products WHERE item_code = ?').get(p.item_code);
                const productId = product.id;

                // Add a default price history for each to make the chart not empty
                const checkHistory = db.prepare('SELECT id FROM Price_History WHERE product_id = ?').get(productId);
                if (!checkHistory) {
                    insertHistory.run(productId, 590, 'LIST', '2024-01-01', '初始種子資料');
                }
            }
        });

        transaction();
        console.log(`Successfully seeded ${products.length} products.`);
    } catch (err) {
        console.error('Error seeding data:', err.message);
    }
};

seedData();
