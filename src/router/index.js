import { createRouter, createWebHistory } from "vue-router";

import Wordle from '@/views/wordle.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',component:Wordle
    },

  ],
});

export default router;
