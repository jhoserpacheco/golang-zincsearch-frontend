import {
  createRouter,
  createWebHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Emails from '../components/Emails.vue'
import Bulk from '../components/Bulk.vue'


const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [{
      path: '/',
      name: 'home',
      component: Emails,
    },
    {
      path: '/bulk',
      name: 'bulk',
      component: Bulk,
    }
  ]
})

export default router