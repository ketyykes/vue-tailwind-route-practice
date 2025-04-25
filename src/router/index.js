import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/MainView.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: 'users', // /users
        component: () => import('@/views/UserView.vue'),
        children: [
          {
            path: ':id', // /users/123
            name: 'UserDetail',
            component: () => import('@/views/UserDetailView.vue'),
            children: [
              {
                path: 'posts', // /users/123/posts
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

export default createRouter({
  history: createWebHistory(),
  routes,
})
