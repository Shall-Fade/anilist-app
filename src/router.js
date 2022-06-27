import { createRouter, createWebHistory } from "vue-router";
import HeroPage from "./views/HeroPage.vue";
import AboutPage from "./views/AboutPage.vue";
import SearchPage from "./views/SearchPage.vue";
import ListPage from "./views/ListPage.vue";
import AnimeInfoPage from "./views/AnimeInfoPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HeroPage,
    },
    {
      path: "/about",
      name: "about",
      component: AboutPage,
    },
    {
      path: "/search",
      name: "search",
      component: SearchPage,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    },
    {
      path: "/my-anime-list",
      name: "list",
      component: ListPage,
    },
    {
      path: "/anime/:id",
      name: "info",
      component: AnimeInfoPage,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // Прокрутка страницы наверх
    return { left: 0, top: 0 };
  },
});

export default router;
