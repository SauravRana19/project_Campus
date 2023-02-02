import { createRouter, createWebHistory } from "vue-router";
import register from "@/components/register.vue";
import login from "@/components/login.vue";
import dashboard from "@/components/dashboard.vue";

const routes = [
  {
    path: "/",
    name: "register",
    component: register,
  },
  {
    path: "/login",
    name: "login",  
    component: login,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
