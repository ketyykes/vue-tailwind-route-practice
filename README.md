# Vue 3 + Vite 專案模板

這是一個使用 Vue 3 和 Vite 建立的專案模板，整合了多項現代前端開發工具。

## Tech Stack

- Vue 3
- Vite
- Pinia (狀態管理)
- Vue Router
- TailwindCSS
- SASS
- ESLint + Prettier (程式碼品質工具)
- Stylelint
- 套件自動引入工具 (unplugin-auto-import)
- Vitest (單元測試框架)


## 建議的開發環境設定

- [VSCode](https://code.visualstudio.com/) 
- [Vue -Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss#review-details)

- Node.js 20+ 版本
- pnpm 9+ 版本

## 專案設定

安裝依賴：
```sh
pnpm install
```

### 開發指令

開發環境運行（支援熱重載）：
```sh
pnpm dev
```

建置生產版本：
```sh
pnpm build
```

預覽建置結果：
```sh
pnpm preview
```

### 程式碼品質與測試

執行程式碼格式化：
```sh
pnpm format
```

執行 ESLint 檢查與自動修復：
```sh
pnpm lint
```

執行單元測試：
```sh
pnpm test:unit
```

## 專案結構說明

- `/src` - 原始碼目錄
- `/public` - 靜態資源目錄
- `/tests` - 測試檔案目錄

## 相關文件

- [Vite 設定參考](https://vitejs.dev/config/)
- [Vue 3 文件](https://vuejs.org/)
- [Pinia 文件](https://pinia.vuejs.org/)
- [TailwindCSS 文件](https://tailwindcss.com/docs)
- [Stylelint 文件](https://stylelint.io/)
- [ESLint 文件](https://eslint.org/)
- [Prettier 文件](https://prettier.io/)
