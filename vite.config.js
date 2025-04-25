import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', 'vitest'],
      dts: './src/auto-imports.d.ts', // 檔案位置
      eslintrc: {
        enabled: true, // 改為 true 會自動生成 unplugin-auto-import 的規則設定
        filepath: './.eslintrc-auto-import.mjs', // 設定自動生成的 ESLint 規則檔案路徑，預設為 `./.eslintrc-auto-import.json`
      },
    }),
    tailwindcss(),
  ],
  server: {
    port: 3374,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  /* 由於 terminal 會出現 "Deprecation Warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0" 的警告訊息
    因此需要在下方加入 css 配置來解決此問題
    詳細資訊請參考：https://github.com/vitejs/vite/issues/18164 */
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or 'modern'
      },
    },
  },
})
