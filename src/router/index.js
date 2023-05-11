import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'loginview',
      component: () => import('../views/LoginView.vue')
    },

    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/SignUp.vue')
    },
    {
      path: '/todo',
      name: 'todo',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TodoViewERROR.vue'),
      meta: {
        requiredAuth: true
      }
    }
  ]
})
router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('userToken')
    if (!token) {
      return { name: '/' }
    }
  }
})
export default router
