import { createRouter, createWebHistory } from "vue-router";
import About from '@/views/about.vue';
import Index from '@/views/index.vue';
import Wordle from '@/views/wordle.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/about',component: About
    },
    {
      path:'/',component:Index
    },
    {
      path: '/game',component: Wordle
    }
    
  ],
});

export default router;
