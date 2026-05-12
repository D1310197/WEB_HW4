## 1. Environment Setup & Dependencies

- [x] 1.1 安裝後端依賴: sqlite3, express, puppeteer
- [x] 1.2 安裝前端依賴: recharts, tailwindcss, lucide-react
- [x] 1.3 設置 SQLite 資料庫連接池與初始化腳本

## 2. Database Implementation

- [x] 2.1 建立 `Products` 資料表 (含 model_group_id, item_code)
- [x] 2.2 建立 `Price_History` 資料表 (含 price_type, recorded_at, change_reason)
- [x] 2.3 撰寫初始數據填入腳本 (Seed data for UNIQLO U T-shirt)

## 3. Crawler Development (Puppeteer)

- [x] 3.1 實作基礎爬蟲邏輯: 根據 item_code 開啟 UNIQLO 官網頁面
- [x] 3.2 實作價格解析邏輯: 抓取 listPrice 與 salePrice
- [x] 3.3 實作爬蟲排程與自動更新資料庫邏輯
- [x] 3.4 實作異常偵測: 價格變動過大時標註為待核實

## 4. Backend API Development (Express.js)

- [x] 4.1 初始化 Express.js 專案結構與路由
- [x] 4.2 實作 `POST /api/prices`: 接收並儲存 (日期、商品名稱、商品價格)
- [x] 4.3 實作 `GET /api/products/search`: 支援文字框關鍵字篩選

## 5. Frontend UI Implementation (UNIQLO Style)

- [x] 5.1 建立標題組件: "UNIQLO Archive: Price | 優衣庫價格檔案館"
- [x] 5.2 實作資料輸入表單 (日期、名稱、價格)
- [x] 5.3 實作簡易查詢表格/清單
- [x] 5.4 實作關鍵字搜尋文字框聯動邏輯
- [x] 5.5 整合 Recharts 實作價格折線圖
