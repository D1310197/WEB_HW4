import cron from 'node-cron';
import { updateProductPrices } from './crawler.js';

export function setupScheduler() {
    // 排程任務：每日凌晨 01:00 執行價格爬取
    // Cron 格式: '分 時 日 月 週'
    cron.schedule('0 1 * * *', async () => {
        console.log(`[${new Date().toISOString()}] 啟動每日自動價格爬取任務...`);
        try {
            await updateProductPrices();
            console.log(`[${new Date().toISOString()}] 自動爬取任務完成。`);
        } catch (error) {
            console.error(`[${new Date().toISOString()}] 自動爬取任務出錯:`, error);
        }
    });

    console.log('價格自動爬取排程器已啟動 (每日 01:00 執行)');
}
