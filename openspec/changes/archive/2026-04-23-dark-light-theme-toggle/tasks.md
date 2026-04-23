## 1. 建立主題 Store

- [x] 1.1 建立 src/stores/Theme.js，實作 useThemeStore（Theme state managed by Pinia store），包含 currentTheme reactive state（預設值 "dark"）、toggleTheme 函式、initTheme 函式
- [x] 1.2 在 initTheme 中從 localStorage 讀取 theme preference key，若無儲存值則預設為 "dark"（First visit without saved preference）
- [x] 1.3 在 toggleTheme 中切換 currentTheme 值（"dark" ↔ "light"），同步更新 localStorage 並設定 document.documentElement.setAttribute("data-theme", newTheme)（Theme preference persistence、Store toggle function switches theme）

## 2. 建立主題切換元件

- [x] 2.1 建立 src/components/ThemeToggle/index.vue 實作 Theme toggle button，引入 useThemeStore，渲染一個按鈕：深色主題時顯示 sun SVG icon、淺色主題時顯示 moon SVG icon
- [x] 2.2 按鈕點擊事件綁定 store.toggleTheme()，實現一鍵切換（Toggle from dark to light、Toggle from light to dark）

## 3. 整合至 App.vue

- [x] 3.1 在 src/App.vue 中引入 useThemeStore，在 onMounted 呼叫 store.initTheme() 初始化主題（Theme preference restored on load）
- [x] 3.2 在 App.vue 的 header 區域加入 ThemeToggle 元件，置於標題右側
- [x] 3.3 實作 Theme applied via data-theme attribute：移除 index.html 中 html 元素上硬編碼的 data-theme="dark" 屬性，改由 store.initTheme() 動態設定

## 4. 卡片元件主題適配

- [x] 4.1 實作 Theme-aware card styling：修改 src/components/YoubikeCardItem/index.vue，將卡片 div 的 class 從硬編碼深色 gradient（from-slate-900 via-indigo-900 to-cyan-900 border-cyan-500/30）替換為 DaisyUI 語義化 class（bg-base-200 border-base-300）
- [x] 4.2 將卡片標題 class 從 text-cyan-300 替換為 text-primary，描述文字從 text-cyan-200 替換為 text-base-content/70（Card appearance in light theme、Card appearance in dark theme）

## 5. 樣式調整

- [x] 5.1 確認 src/style.css 的 DaisyUI 主題配置（light 和 dark）已正確設定，確保語義化 class 在兩種主題下均能正常渲染
