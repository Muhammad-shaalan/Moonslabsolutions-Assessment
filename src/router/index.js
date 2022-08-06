import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/questions/:id",
    name: "questions",
    component: () => import("../views/Questions.vue"),
  },
  {
    path: "/results",
    name: "results",
    component: () => import("../views/Result.vue"),
  },
];

const router = createRouter({
  mode: "history",
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
