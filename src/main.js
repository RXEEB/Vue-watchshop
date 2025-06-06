import './assets/main.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'

import { createApp } from 'vue'
import App from './App.vue'
import Favorites from './pages/Favorites.vue'



const app = createApp(App)

const routes = [
  { path: '/',name:'Home', component: Home },
  { path: '/favorites',name:'Favorites', component: Favorites }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(autoAnimatePlugin)
app.use(router)
app.mount('#app')
