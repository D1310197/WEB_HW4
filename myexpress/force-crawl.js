import db from './db.js';
import { updateProductPrices } from './crawler.js';

async function runForceCrawl() {
    console.log('Starting manual crawl to verify implementation and synchronize data...');
    try {
        await updateProductPrices();
        console.log('Manual crawl completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Manual crawl failed:', error);
        process.exit(1);
    }
}

runForceCrawl();
