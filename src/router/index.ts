import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import StartPage from "@/pages/StartPage/index.vue";
import SuccessPage from "@/pages/SuccessfulPage/index.vue";
import UnsuccessPage from "@/pages/UnsuccessfulPage/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "StartPage",
    component: StartPage,
  },
  {
    path: "/success",
    name: "SuccessPage",
    component: SuccessPage,
  },
  {
    path: "/unsuccess",
    name: "UnsuccessPage",
    component: UnsuccessPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
