## ADDED Requirements

### Requirement: 擴展商品數據庫
系統應包含更多樣化的 UNIQLO 商品項，以覆蓋主要服飾類別。

#### Scenario: 初始化擴展商品
- **WHEN** 執行數據初始化或種子腳本時
- **THEN** 資料庫中應新增至少 10 個不重複的經典商品 Item Codes。

### Requirement: 兼容性價格爬取
所有新增的商品必須能夠通過現有的爬蟲機制正確獲取價格。

#### Scenario: 驗證新商品爬取
- **WHEN** 針對新加入的商品 Item Code 調用 `crawlPrice` 函數時
- **THEN** 系統應能成功返回該商品的名稱與當前價格。
