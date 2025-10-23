import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/movie/:id',
      name: 'movie-detail',
      // Ini adalah "lazy loading". 
      // Kode untuk DetailView.vue hanya akan di-download saat pengguna
      // mengklik link ke halaman detail. Ini membuat loading awal lebih cepat.
      component: () => import('../views/DetailView.vue')
    }
  ]
})

export default router