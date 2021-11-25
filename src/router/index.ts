import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import StartPage from "@/pages/StartPage/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "StartPage",
    component: StartPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
