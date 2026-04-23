## Why

目前應用程式在 index.html 中硬編碼 data-theme="dark"，使用者無法切換至淺色主題。雖然 DaisyUI 已配置 light 和 dark 兩組主題，但缺少讓使用者切換主題的 UI 控制項，且主題偏好未持久化至 localStorage。

## What Changes

- 新增主題切換按鈕（sun/moon 圖示）置於頁面 header 區域，讓使用者可一鍵切換深色與淺色主題
- 新增 Pinia store 管理主題狀態，並透過 localStorage 持久化使用者的主題偏好
- 移除 index.html 中硬編碼的 data-theme="dark"，改由 JavaScript 動態設定 html 元素的 data-theme 屬性
- 將 YoubikeCardItem 元件中硬編碼的深色系 Tailwind class 替換為 DaisyUI 語義化色彩 class，使其能隨主題自動適配

## Non-Goals (optional)

- 不實作自訂主題（僅支援 DaisyUI 內建的 light/dark）
- 不追蹤系統層級的 prefers-color-scheme 變化做即時同步（僅在初始化時參考）
- 不修改 DaisyUI 主題的色彩配置

## Capabilities

### New Capabilities

- `theme-switching`: 提供深色/淺色主題切換功能，包含 UI 切換按鈕、Pinia 狀態管理、localStorage 偏好持久化，以及透過 DaisyUI data-theme 屬性動態套用主題

### Modified Capabilities

（無）

## Impact

- Affected specs: 新增 theme-switching capability
- Affected code:
  - New: src/stores/Theme.js, src/components/ThemeToggle/index.vue
  - Modified: index.html, src/App.vue, src/components/YoubikeCardItem/index.vue, src/style.css
  - Removed:（無）
