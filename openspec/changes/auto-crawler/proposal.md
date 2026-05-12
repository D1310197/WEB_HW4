## Why

目前系統雖具備爬蟲邏輯，但仍需手動觸發。為了實現「優衣庫價格檔案館」的自動化監控目標，系統需要一個背景定時任務，在伺服器運行期間自動更新資料庫中的價格數據。

## What Changes

- 在伺服器啟動時初始化定時任務 (Cron Job)。
- 每隔 24 小時（或於每日凌晨 1 點）自動執行 `crawler.js` 中的 `updateProductPrices()`。
- 自動化監控所有已存在於資料庫中的商品貨號。

## Capabilities

### New Capabilities
- `automatic-background-crawl`: 定義背景定時執行爬蟲的頻率與錯誤報警規範。

### Modified Capabilities
- `cpi-logic`: 更新價格更新的觸發來源，從單一手動/API 擴展至系統自動。

## Impact

- `bin/www` 或 `app.js`: 需加入定時任務啟動邏輯。
- `crawler.js`: 確保 `updateProductPrices` 能正確處理大規模併發或錯誤。
- `database.sqlite`: 每日會產生新的價格快照。
