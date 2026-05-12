# Spec: CPI Calculation Logic

## 1. Input Data
- Item Name: `UNIQLO U 系列圓領 T 恤 (短袖)`
- Price Points:
  - 2022-01-01: 390 (LIST)
  - 2023-01-01: 490 (LIST)
  - 2024-01-01: 590 (LIST)

## 2. Calculation Formulas
- **Cumulative Inflation %**: `((Latest_List_Price - 2022_List_Price) / 2022_List_Price) * 100`
- **Result**: `((590 - 390) / 390) * 100 = 51.28%`

## 4. UI Style Guide (UNIQLO Inspired)
- **Colors**: 
  - Brand Red: `#ff0000` (Logo & Call-to-action)
  - Layout: Clean white background (`#ffffff`), light gray borders (`#e6e6e6`)
  - Typography: Sans-serif (Open Sans / Roboto), bold titles.
- **Layout Elements**:
  - Top Red Bar for brand identity.
  - Grid-based product cards with simple, sharp edges.
  - Minimalist search bar with red search button.

## 5. Advanced Mapping Logic
- **Cross-Item Linking**: 當系統偵測到商品屬於同一 `model_group_id` 時，應自動將不同 `item_code` 的價格點合併至同一個 Timeline 展示，並標註「貨號更迭」。

## 6. Crawler Specification
- **Engine**: Headless Browser (Node.js).
- **Retry Policy**: 失敗時自動重試 3 次，間隔 1 分鐘。
- **Data Integrity**: 抓取到的價格若低於歷史最低價的 50%，需標記為「疑似錯誤」並發送通知，避免官網標錯價或解析失敗導致數據污染。
- **User-Agent**: 使用隨機 User-Agent 模擬真實瀏覽行為，避免被官網封鎖偵測。
- **Crawler Compatibility**: 所有新增至系統的商品必須與現行爬蟲引擎兼容，確保能正確抓取商品名稱與當前價格。

## 7. Database & Seeding
- **Expanded Product Database**: 系統應包含 10-15 個額外的 UNIQLO 商品，覆蓋主要服飾類別（如上衣、下著、外套等）。
- **Data Initialization**: 執行種子腳本時，應確保至少包含 10 個不重複的經典商品貨號 (Item Codes)。
