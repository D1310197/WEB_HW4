## ADDED Requirements

### Requirement: 自動背景抓取任務
系統必須在每日固定時間自動啟動爬蟲機制，並更新資料庫中所有已知商品的當前價格。

#### Scenario: 每日定時觸發
- **WHEN** 系統時間達到每日凌晨 01:00
- **THEN** 系統必須啟動爬蟲服務並遍歷 Products 資料表

### Requirement: 任務執行日誌
系統應在 console 或日誌檔案中記錄自動抓取任務的起始時間與結果。

#### Scenario: 成功更新紀錄
- **WHEN** 某次自動抓取成功並寫入 `Price_History`
- **THEN** 系統必須輸出包含商品貨號與新價格的紀錄日誌
