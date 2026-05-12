# Spec: CPI Calculation & Crawler Logic

## 1. Data Definitions
- **Base Year**: 2022 (用於計算通膨基準)。
- **Inflation Formula**: `((Current_List_Price - Base_Price) / Base_Price) * 100`。
- **Price Types**: 
  - `LIST`: 官方定價。
  - `SALE`: 限時特價。

## 2. Crawler Requirements
- **Target**: UNIQLO Taiwan Official Website.
- **Selector Reference**: 
  - List Price: `.price-limited` (or current active price class).
  - Item Content: `.pdp-title`.
- **Validation**: 若抓取到的價格與上次紀錄差異 > 50%，系統需紀錄為 `pending_verification`。

## 3. UI Design Requirements (UNIQLO Identity)
- **Primary Color**: `#ff0000` (Pantone Uniqlo Red).
- **Secondary Color**: `#000000`, `#ffffff`.
- **Chart Type**: Step Line Chart (階梯圖)，能精確反映價格跳動的瞬間。
