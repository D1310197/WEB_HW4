import db from './db.js';

const products = [
    { item_code: '464851', model_group_id: 'SUPIMA-T', category: 'T-Shirt' }, // SUPIMA COTTON Crew Neck T-Shirt
    { item_code: '464022', model_group_id: 'AIRISM-T', category: 'T-Shirt' }, // AIRism Cotton Oversized T-Shirt
    { item_code: '461394', model_group_id: 'OXFORD-SHIRT', category: 'Shirt' }, // Oxford Slim Fit Shirt
    { item_code: '463991', model_group_id: 'SELVEDGE-JEANS', category: 'Pants' }, // Stretch Selvedge Slim Fit Jeans
    { item_code: '464912', model_group_id: 'CHINO-PANTS', category: 'Pants' }, // Slim Fit Chino Pants
    { item_code: '450251', model_group_id: 'HEATTECH-T', category: 'Innerwear' }, // HEATTECH Crew Neck T-Shirt
    { item_code: '459590', model_group_id: 'ULTRA-LIGHT-DOWN', category: 'Outerwear' }, // Ultra Light Down Jacket
    { item_code: '467008', model_group_id: 'BLOCKTECH-PARKA', category: 'Outerwear' }, // BLOCKTECH Parka
    { item_code: '460324', model_group_id: 'DRY-EX-T', category: 'Activewear' }, // DRY-EX Crew Neck T-Shirt
    { item_code: '459701', model_group_id: 'SWEAT-PANTS', category: 'Pants' }, // Sweat Pants
    { item_code: '469456', model_group_id: 'ROUND-MINI-BAG', category: 'Accessories' }, // Round Mini Shoulder Bag
    { item_code: '464437', model_group_id: 'UT-GRAPHIC-T', category: 'T-Shirt' }, // UT Graphic T-Shirt
    { item_code: '459190', model_group_id: 'LINEN-SHIRT', category: 'Shirt' }, // Premium Linen Shirt
    { item_code: '464018', model_group_id: 'ANKLE-PANTS', category: 'Pants' }, // Smart Ankle Pants
    { item_code: '464836', model_group_id: 'FLANNEL-SHIRT', category: 'Shirt' }  // Flannel Checked Shirt
];

function seedProducts() {
    console.log('Starting to expand product database...');
    
    products.forEach((product) => {
        db.run(
            `INSERT OR IGNORE INTO Products (item_code, model_group_id, category) VALUES (?, ?, ?)`,
            [product.item_code, product.model_group_id, product.category],
            function(err) {
                if (err) {
                    console.error(`Error inserting ${product.item_code}:`, err.message);
                } else if (this.changes > 0) {
                    console.log(`Added new product: ${product.item_code} (${product.model_group_id})`);
                } else {
                    console.log(`Product ${product.item_code} already exists, skipping.`);
                }
            }
        );
    });

    // Close the DB connection after a short delay to ensure all async insertions finish
    setTimeout(() => {
        console.log('Product expansion completed.');
        process.exit(0);
    }, 2000);
}

// 執行種子導入
seedProducts();
