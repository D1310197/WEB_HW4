## Context

目前系統資料庫中僅包含少量測試商品。系統已具備爬蟲邏輯 `crawler.js` 與資料庫模式 `db.js`。我們需要一種非破壞性的方式來批量增加商品數據，同時不影響既有的價格歷史記錄。

## Goals / Non-Goals

**Goals:**
- 擴展商品庫，增加涵蓋多元類別（上衣、褲裝、配件等）的 UNIQLO 商品。
- 確保所有新商品都能夠與現有的 `crawlPrice` 函數相容。
- 提供一個簡單的指令或機制來初始化這些新商品，而不會導致重複插入。

**Non-Goals:**
- 不涉及前端 UI 的結構性修改（僅數據層面的增加）。
- 不修改現有的爬蟲核心邏輯。

## Decisions

- **資料初始化方式**：建立一個獨立的 `update-seed.js` 腳本，專門用於執行 `INSERT OR IGNORE` 語法，這可以確保在重複執行時不會發生 Unique Constraint 錯誤（針對 `item_code`）。
- **商品選取原則**：挑選 UNIQLO 網站上具有長期銷售性質的經典商品（如 AIRism 系列、Heattech 系列、U系列 T-shirt 等），以利於長期的 CPI（消費者物價指數）追蹤。

## Risks / Trade-offs

- **[Risk]** 商品 Item Code 過期 → **Mitigation**: 選擇長青基本款，並在 `crawler.js` 中增加錯誤日誌記錄以方便後續更新 Item Code。
- **[Risk]** 爬蟲頻率限制 → **Mitigation**: 增加商品後的完整抓取可能耗時幾分鐘，應維持每日凌晨執行一次的頻率。
