## Why

目前系統中的商品種類較少，這限制了使用者查詢不同服飾類別價格變動趨勢的能力。新增更多來自 UNIQLO 的多樣商品（如上衣、褲裝、內衣等）可以顯著提升系統的實用性與參考價值，讓使用者能更全面地觀察不同產品線的通膨狀況。

## What Changes

- 在資料庫中預埋更多熱門 UNIQLO 商品的 ID。
- 商品類別將擴大，包含男裝、女裝、童裝的多個子類別。
- 確保新加入的商品能被現有的自動爬蟲排程正確抓取價格。

## Capabilities

### New Capabilities
- `extended-product-database`: 擴充現有的資料庫，加入約 10-20 個精選商品的初始數據（Item Codes）。

### Modified Capabilities
- `cpi_spec`: 更新商品列表的管理邏輯（如果有特定的分類需求）。

## Impact

- 影響資料庫 `Products` 表的初始數據內容。
- [myexpress/seed.js](myexpress/seed.js) 可能需要更新或替換，以包含新的商品清單。
- 爬蟲任務的單次執行時間將因商品數量增加而稍微延長。
