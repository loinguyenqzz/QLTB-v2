import System from "../pages/System.vue";
import Home from "../pages/Home.vue";
import Equipment from "../pages/Equipment.vue";
import Order from "../pages/Order.vue";
import Report from "../pages/Report.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/system", name: "System", component: System },
  { path: "/", name: "Home", component: Home },
  { path: "/report", name: "Report", component: Report },
  { path: "/equipment", name: "Equipment", component: Equipment },
  { path: "/order", name: "Order", component: Order },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
