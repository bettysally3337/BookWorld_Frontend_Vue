# BookWorld - 互動式書選與導覽地圖

歡迎來到 **BookWorld**！這是一個結合了互動式 NPC 地圖、自動化書櫃導覽與日夜模式切換的多功能網頁專案。本專案使用 Vue 3、Vite 與 SCSS 打造，旨在提供使用者舒適的閱讀與探索體驗。

---

## 命名規範 (Naming Conventions)

為了保持程式碼的一致性與可讀性，請所有開發參與者遵守以下規範：

### 1. 檔案與目錄命名
- **目錄名稱**：所有資料夾請使用 camelCase（例如：`components`, `views`, `api`）。
- **檔案名稱**：一般程式碼檔案請使用 camelCase（例如：`npcService.ts`）。
  - *Vue 元件*：統一放在 `components/` 或 `views/` 下。

### 2. 變數與常數命名
- **一般變數**：使用 camelCase（例如：`activeTab`, `isDarkMode`）。
- **常數**：全域固定值使用 UPPER_SNAKE_CASE。

### 3. 加入新的頁面或邏輯時，請務必遵循上述規範。

---

## 專案架構 (Project Structure)

本專案採用模組化設計，以下是 `src/` 目錄下各檔案與資料夾的職責說明：

### 📂 `src/api/` (資料與服務層)
- **`mockData.ts`**：專案的核心資料庫。定義了 `BookData` 與 `NPCData` 的介面，並存儲了所有書籍、角色、名言以及外部連結。
- **`npcService.ts`**：模擬後端 API 的服務。包含非同步抓取資料的邏輯，並模擬了網路延遲效果。

### 📂 `src/styles/` (SCSS 樣式架構)
- **`index.scss`**：**樣式的匯出與匯入中心 (Export Hub)**。它使用 `@forward` 匯出變數供全域使用，並使用 `@use` 載入基礎樣式，是整個專案樣式的進入點。
- **`_variables.scss`**：存儲所有 CSS 變數（包含日、夜模式的色彩集：米白、拿鐵、濃縮咖啡等）及佈局常數（導覽列高度）。
- **`_base.scss`**：定義全域的重設 (Reset)、字體 (`Inter`)、以及基礎佈局 (`app-layout`)。

### 📂 `src/views/` (頁面視圖)
- **`town.vue`**：互動式 BookTown 地圖。包含 NPC 隨機移動、點擊對話氣泡、台詞輪播等邏輯。
- **`library.vue`**：精美的互動式書櫃。包含立體書脊排列、側邊資訊欄 (Side Panel)、以及購書連結跳轉功能。
- **`movie.vue`**：Movie 分頁預留位置。

### 📂 `src/components/` (通用元件)
- **`nav.vue`**：全域導覽列。負責處理分頁切換以及「晨/昏」日夜切換按鈕。

### 📄 其他重要檔案
- **`App.vue`**：根元件。負責管理分頁狀態、日夜主題切換的 DOM 操作。
- **`main.ts`**：程式進入點，在此匯入 `index.scss` 核心樣式。
- **`style.css`**：包含 Vite 預設樣式與部分基礎版面微調。

---

## 功能亮點 (Features)

1. **互動地圖 (BookTown NPC)**：
   - NPC 角色使用透明 `.png` 搭配 `drop-shadow` 實現擬真站立感。
   - 點擊角色可觸發名言氣泡，且台詞會自動輪播。

2. **精美書櫃 (Library Shelf)**：
   - 採用 CSS Grid 打造擬真書架排列。
   - 側邊欄提供完整的圖書資訊、簡介，以及跳轉至博客來、誠品、Goodreads 的連結。

3. **日夜模式 (Coffee & Book Theme)**：
   - 以咖啡與古書為靈感的配色方案。
   - 切換按鈕（☕/🌙）可流暢地在「溫潤米白」與「深焙咖啡」主題間切換。

---

## 專案啟動與建置

```bash
# 安裝套件
yarn install

# 啟動開發環境 (localhost:5173)
yarn dev

# 專案打包
yarn build
```

