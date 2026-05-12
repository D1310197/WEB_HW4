# Design: CPI Tracker Architecture

## Data Model (SQLite)

### `Products` Table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | PK |
| model_group_id | TEXT | 用於串聯不同年份的相同款式 (e.g., 'u-crew-t') |
| item_code | TEXT | UNIQLO 商品編號 (unique, e.g., '422992') |
| name | TEXT | 商品名稱 |
| category | TEXT | 分類 |

### `Price_History` Table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | PK |
| product_id | INTEGER | FK -> Products.id |
| price | INTEGER | 價格 |
| price_type | TEXT | 'LIST' (原價) or 'SALE' (特價) |
| recorded_at | DATE | 紀錄日期 |
| change_reason | TEXT | 調價原因 (e.g., '材質升級', '國際棉價上漲') |

## Frontend Components
- `MainLayout`: 包含網站標題 **"UNIQLO Archive: Price | 優衣庫價格檔案館"**。
- `DataEntryForm`: 輸入(日期、商品名稱、商品價格)的表單介面。
- `SearchSection`: 帶有文字框搜尋功能，可即時縮小搜尋範圍。
- `PriceTable`: 以表格呈現歷年物價變化清單。
- `InflationStat`: 顯示 2022 至今的漲幅預算。
- `PriceChart`: 使用折線圖呈現時間序列。
- `PriceCrawler`: 定期抓取官網價格的爬蟲模組。

## Backend Architecture
- **Framework**: Express.js
- **API Endpoints**:
  - `POST /api/prices`: 新增價格紀錄 (日期、名稱、價格)。
  - `GET /api/products/search?q=...`: 根據文字框輸入縮小搜尋範圍。
  - `GET /api/products/:id/history`: 獲取表格與圖表所需之歷史清單。
- `GET /api/products/search?q=...`
- `GET /api/products/:id/history`
