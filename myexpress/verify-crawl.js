import { updateProductPrices } from './crawler.js';

console.log('Starting full price crawl for all products...');
updateProductPrices()
    .then(() => {
        console.log('Crawl request dispatched.');
        // Note: updateProductPrices is async but uses nested callbacks,
        // so we'll wait a bit longer to see outputs in console.
        setTimeout(() => {
            console.log('Verification script finishing.');
            process.exit(0);
        }, 30000); // Wait 30s for some products to be crawled
    })
    .catch(err => {
        console.error('Crawl failed:', err);
        process.exit(1);
    });
