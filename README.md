# Vue 巢狀路由教學

本專案展示了 Vue Router 中巢狀路由的實作方式。巢狀路由允許在主要視圖內嵌套子視圖，創建複雜的頁面結構。

### 專案路由結構

```
/                   (MainView + HomeView)
/users              (MainView + UserView)
/users/:id          (MainView + UserView + UserDetailView)
/users/:id/posts    (MainView + UserView + UserDetailView + UserPostsView)
```

### 如何實作巢狀路由

1. **在路由配置中使用 children 屬性**

   在 `src/router/index.js` 中，我們定義了巢狀路由結構：

   ```js
   const routes = [
     {
       path: '/',
       component: () => import('@/views/MainView.vue'),
       children: [
         {
           path: '',  // 對應 / 路徑
           component: () => import('@/views/HomeView.vue'),
         },
         {
           path: 'users',  // 對應 /users 路徑
           component: () => import('@/views/UserView.vue'),
           children: [
             {
               path: ':id',  // 對應 /users/:id 路徑
               name: 'UserDetail',
               component: () => import('@/views/UserDetailView.vue'),
               children: [
                 {
                   path: 'posts',  // 對應 /users/:id/posts 路徑
                   name: 'UserPosts',
                   component: () => import('@/views/UserPostsView.vue'),
                 },
               ],
             },
           ],
         },
       ],
     },
   ]
   ```

2. **在父組件中使用 `<router-view>` 顯示子路由內容**

   每個父視圖元件都需要包含 `<router-view>` 標籤來顯示其子路由的內容：

   ```vue
   <template>
     <div>
       <!-- 父組件的內容 -->
       <router-view />  <!-- 子路由內容將在此處渲染 -->
     </div>
   </template>
   ```

3. **URL 參數使用**

   在路由路徑中使用冒號定義參數，如 `:id`。在組件中可以通過 `useRoute().params.id` 獲取參數值：

   ```js
   import { useRoute } from 'vue-router'
   
   const route = useRoute()
   const userId = route.params.id
   ```

### 各層路由實作詳解

#### 第一層：`MainView.vue` - 主布局

```vue
<script setup>
import DefaultLayout from '@/layout/DefaultLayout.vue'
</script>
<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
</template>
```

**解說**：
- `MainView` 是最外層的容器，負責導入並使用全域布局組件 `DefaultLayout`
- `DefaultLayout` 提供頁面的基本結構（頁首、主內容區和頁尾）
- `<RouterView />` 在主內容區中渲染第二層路由內容（首頁或使用者清單頁）

#### 第二層：`HomeView.vue` - 首頁

```vue
<script setup></script>
<template>
  <div>Home Page</div>
</template>
```

**解說**：
- 簡單的首頁組件，當訪問根路徑 `/` 時渲染
- 顯示在 `MainView` 的 `<RouterView />` 位置

#### 第二層：`UserView.vue` - 使用者清單頁

```vue
<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <div class="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-md">
    <h2 class="mb-4 border-b pb-2 text-2xl font-bold text-gray-800">
      使用者清單
    </h2>
    <div class="mb-6 flex space-x-4">
      <!-- 使用 <router-link> 設定巢狀參數 -->
      <RouterLink
        :to="{ name: 'UserDetail', params: { id: 1 } }"
        class="rounded-md bg-blue-600 px-4 py-2 text-black transition duration-300 hover:bg-indigo-700"
      >
        查看 #1
      </RouterLink>
      <RouterLink
        :to="{ name: 'UserDetail', params: { id: 2 } }"
        class="rounded-md bg-blue-600 px-4 py-2 text-black transition duration-300 hover:bg-indigo-700"
      >
        查看 #2
      </RouterLink>
    </div>
    <!-- 第二層 router-view，渲染 /users/:id 畫面 -->
    <div class="rounded-lg bg-gray-50 p-4">
      <RouterView />
    </div>
  </div>
</template>
```

**解說**：
- 當訪問 `/users` 路徑時渲染
- 顯示使用者清單標題和兩個導航按鈕
- `<RouterLink>` 使用命名路由和參數導航到特定使用者詳情頁
- `<RouterView />` 位於底部，用於渲染第三層路由（使用者詳情）

#### 第三層：`UserDetailView.vue` - 使用者詳情頁

```vue
<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <div class="mb-4 border-l-4 border-indigo-500 pl-4">
    <h3 class="mb-2 text-xl font-semibold text-gray-700">
      使用者 {{ $route.params.id }}
    </h3>
    <RouterLink
      :to="{ name: 'UserPosts', params: { id: $route.params.id } }"
      class="inline-block rounded bg-indigo-100 px-3 py-1 text-sm text-indigo-700 transition duration-300 hover:bg-indigo-200"
    >
      查看貼文
    </RouterLink>
  </div>

  <!-- 第三層 router-view，渲染 /users/:id/posts -->
  <RouterView />
</template>
```

**解說**：
- 當訪問 `/users/:id` 路徑時渲染在 `UserView` 的 `<RouterView />` 位置
- 顯示當前使用者 ID，使用 `$route.params.id` 獲取路由參數
- 提供 "查看貼文" 的導航連結，保留相同的 `id` 參數
- 底部的 `<RouterView />` 用於渲染第四層路由（使用者貼文）

#### 第四層：`UserPostsView.vue` - 使用者貼文頁

```vue
<script setup></script>
<template>
  <div class="mt-4 rounded-lg bg-blue-50 p-4 shadow-sm">
    <h4 class="mb-2 text-lg font-medium text-blue-800">使用者貼文</h4>
    <div class="border-t border-blue-200 pt-3">
      <p class="text-gray-600">這裡是使用者的貼文內容...</p>
    </div>
  </div>
</template>
```

**解說**：
- 當訪問 `/users/:id/posts` 路徑時渲染在 `UserDetailView` 的 `<RouterView />` 位置
- 顯示使用者的貼文內容
- 是路由巢狀的最深一層

### 路由巢狀結構與資料流動

1. **路由參數傳遞**：
   - 參數從上層路由傳遞到下層路由（如 `id` 參數從 `UserView` 傳到 `UserDetailView` 再到 `UserPostsView`）
   - 可通過 `$route.params` 或 `useRoute().params` 在各層級訪問

2. **視圖巢狀渲染**：
   - 當訪問 `/users/1/posts` 時：
     - `MainView` 渲染布局
     - `UserView` 渲染在 `MainView` 的 `<RouterView />`
     - `UserDetailView` 渲染在 `UserView` 的 `<RouterView />`
     - `UserPostsView` 渲染在 `UserDetailView` 的 `<RouterView />`

### 最佳實踐

- 將相關的路由組織在一起，使用巢狀結構提高程式碼可讀性
- 使用懶加載 (`() => import()`) 提高應用性能
- 為重要路由指定名稱，方便使用 `router.push({ name: 'RouteName' })` 進行導航
- 使用 `<RouterLink>` 組件創建導航連結，如 `<RouterLink to="/users">使用者列表</RouterLink>`

### 延伸學習

- 路由守衛：控制路由訪問權限
- 路由元資料：為路由添加額外信息
- 捲動行為：控制頁面切換時的捲動位置


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

- Node.js 18.18.2 版本
- pnpm 9.15.9 版本

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

