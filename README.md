# 台北市 Youbike 查詢

## 介紹
本專案可查詢台北市 Youbike 的即時資訊，資料來源為 [台北市政府 Open Data](https://data.taipei/dataset/detail?id=c6bc8aed-557d-41d5-bfb1-8da24f78f2fb)。

- 使用技術：Vue.js Composition API 實作

## 功能
1. **查詢站點**：輸入關鍵字，按下 Enter 鍵或「查詢」按鈕後，會列出符合名稱或地址的站點。
2. **顯示詳細資訊**：點擊站點卡片可顯示該站點詳細資訊（如：站名、地址、可租借車輛數等）。
3. **收藏站點**：可收藏或刪除常用站點（資料儲存於 localStorage），點擊按鈕可快速展開收藏清單。

## 操作說明
1. 在首頁輸入關鍵字（站名或地址），按 Enter 或點擊「查詢」按鈕。
2. 於查詢結果中點擊站點卡片，可查看詳細資訊。
3. 在站點卡片上點擊「收藏」按鈕，可將站點加入收藏；再次點擊可移除。
4. 收藏站點會顯示於首頁上方，方便快速查詢。

## IDE 推薦設定

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (請停用 Vetur 擴充功能)

## 自訂設定

參考 [Vite 設定文件](https://vite.dev/config/)

## 專案設定

```sh
npm install
```

### 開發環境編譯和熱重載

```sh
npm run dev
```

### 正式環境編譯和壓縮

```sh
npm run build
```

## 專案結構

```
src/
├── App.vue          # 主要應用程式元件
└── main.js         # 應用程式進入點
```
