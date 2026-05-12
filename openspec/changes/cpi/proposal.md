# Proposal: 商品通膨查詢系統 (CPI Tracker)

## Problem
隨著全球通膨，消費者對於品牌商品（如 UNIQLO）的漲價感知日益強烈，但缺乏一個透明、視覺化的工具來追蹤歷史價格變動。

## Proposed Change
建立一個「UNIQLO Archive: Price (優衣庫價格檔案館)」，首波以 UNIQLO U 系列圓領 T 恤為例，追蹤其從 2022 年至今的定價變化。

## Strategy
- **Backend**: Node.js Express.js 寫 Web API。
- **Database**: SQLite 資料庫儲存商品與價格歷史。
- **Frontend**: React + Tailwind CSS (UNIQLO 風格)。

## Scope
- [x] 資料庫 Schema 設計 (SQLite)
- [x] 商品歷史價格紀錄 (含手動輸入與爬蟲)
- [x] 網站標題: UNIQLO Archive: Price (優衣庫價格檔案館)
- [x] 資料輸入介面 (日期、商品名稱、價格)
- [x] 簡易查詢與表格清單呈現
- [x] 文字框關鍵字搜尋縮小範圍
- [x] 前端查詢介面與折線圖視覺化
