# 改善計畫：在站點卡片上直接顯示車輛可用狀態徽章

## 問題與動機

目前站點卡片（`YoubikeCardItem`）只顯示站名與地址，使用者必須點擊「詳細」按鈕才能看到最重要的資訊——**可租借車輛數**與**可停放車位數**。這造成操作流程繁瑣，使用者無法在一眼掃視時快速掌握站點狀況。

此外，`Youbike.js` store 中的 `removeLikeStation` 方法使用了 `.find()`（回傳物件）而非 `.findIndex()`（回傳索引），導致呼叫 `.splice(物件, 1)` 時索引被強制轉型為 `NaN → 0`，始終刪除第一筆收藏，而非正確的目標站點。

## 改善方案

- 在站點卡片底部新增兩個色彩編碼的徽章（DaisyUI badge）：
  - 🟢 **可租借**：數量 ≥ 5 → `badge-success`
  - 🟡 **可租借**：數量 1–4 → `badge-warning`
  - 🔴 **可租借**：數量 = 0 → `badge-error`
  - 相同邏輯套用於**可停放**徽章
- 使用 `computed` 屬性計算顏色，保持模板簡潔
- 一併修正 `removeLikeStation` 中 `.find()` 應改為 `.findIndex()` 的邏輯錯誤，避免刪除錯誤的收藏站點

## 受影響的檔案

| 檔案 | 變更說明 |
|------|----------|
| `src/components/YoubikeCardItem/index.vue` | 新增可用狀態徽章（可租 / 可還）及對應色彩邏輯 |
| `src/stores/Youbike.js` | 修正 `removeLikeStation` 使用 `.find()` 應改為 `.findIndex()` 的 Bug |
