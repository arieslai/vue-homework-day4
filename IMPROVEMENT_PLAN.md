# 改善計畫：站點卡片顯示即時可借/可還車位數，並修正取消收藏邏輯錯誤

## 問題說明 / 動機

### 問題一：UX 不直覺 — 可用車位資訊被藏在 Modal 裡
目前 `YoubikeCardItem` 卡片只顯示站名與地址。使用者若要查看「可借車輛數」與「可還車位數」，必須額外點擊「詳細」按鈕才能看到，操作流程繁瑣，不符合一般使用習慣。

YouBike 查詢最核心的使用情境就是：**快速判斷附近站點是否有車可借／有位可還**，若這個資訊不在卡片上直接呈現，大幅降低了應用的實用性。

### 問題二：嚴重邏輯錯誤 — `removeLikeStation` 總是刪除第一筆收藏
`src/stores/Youbike.js` 中 `removeLikeStation` 方法：

```js
const index = likeStations.value.find((s) => s.sno == station.sno) // ← 回傳物件，非索引
likeStations.value.splice(index, 1) // ← 物件傳入 splice() → 轉為 NaN → 視為 0
```

`Array.find()` 回傳的是**找到的物件**，而非索引。`splice()` 的第一個參數若非數字，JavaScript 會轉為 `NaN`，再被視為 `0`，因此**每次取消收藏都會刪掉陣列中的第一個站點**，而非使用者點擊的那個站點。

---

## 改善方案

- 在 `YoubikeCardItem` 卡片上直接顯示 **可借車輛數**（`available_rent_bikes`）與 **可還車位數**（`available_return_bikes`）
- 根據數量以顏色標籤提供視覺提示：
  - 🟢 綠色（`badge-success`）：數量 ≥ 5，充足
  - 🟡 黃色（`badge-warning`）：數量 1–4，偏少
  - 🔴 紅色（`badge-error`）：數量 = 0，無車/滿位
- 將 `removeLikeStation` 中的 `find()` 改為 `findIndex()`，正確取得索引後再呼叫 `splice()`

---

## 異動檔案

| 檔案 | 異動內容 |
|---|---|
| `src/components/YoubikeCardItem/index.vue` | 新增可借/可還數量色彩標籤顯示 |
| `src/stores/Youbike.js` | 修正 `removeLikeStation` 使用 `findIndex()` |
