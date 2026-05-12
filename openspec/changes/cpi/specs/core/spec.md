## ADDED Requirements

### Requirement: 網站名稱與數據輸入
系統必須擁有正式名稱且提供使用者輸入新價格數據的介面。

#### Scenario: 標題展示
- **WHEN** 網頁首頁載入時
- **THEN** 頂部標題必須顯示 「UNIQLO Archive: Price | 優衣庫價格檔案館」

#### Scenario: 手動輸入數據
- **WHEN** 使用者在表單輸入「日期、商品名稱、商品價格」並送出
- **THEN** 後端 Express API 會將數據寫入 SQLite 資料庫

### Requirement: 簡易查詢與篩選
系統必須提供文字框搜尋功能，並能以表格或清單展現物價。

#### Scenario: 文字框縮小範圍
- **WHEN** 使用者在搜尋文字框輸入關鍵字 (如 "AIRism")
- **THEN** 下方的商品清單表格應立即過濾出符合名稱的項目

#### Scenario: 表格展現歷史
- **WHEN** 進入商品詳情頁面時
- **THEN** 系統必須以時間序代表格列出所有已紀錄的價格變動清單
