import { createRouter, createWebHistory } from "vue-router";
import register from "@/components/register.vue";
import login from "@/components/login.vue";
import dashboard from "@/components/dashboard.vue";
import headers from  "@/components/header.vue";
import userform from '@/components/userform.vue'
import userdata from '@/components/userdata.vue'



const routes = [
  {
    path: "/",
    name: "register",
    component: register,
    meta: {
      auth: false,
    },
  },
  {
    path: "/login",
    name: "login",  
    component: login,
    meta: {
      auth: false,
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
    meta: {
      auth: true,
    },
  },
  {
    path: "/headers",
    name: "headers",
    component: headers,
    meta: {
      auth: true,
    },
  },
  {
    path: "/userform",
    name: "userform",
    component: userform,
    meta: {
      auth: true,
    },
  },
  {
    path: "/userdata/:id",
    name: "userdata",
    component: userdata,
    meta: {
      auth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  base: import.meta.env.BASE_URL,
  routes,
});

function isLoggedIn() {
  return localStorage.getItem("Registeruser");
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (!isLoggedIn()) {
      next({
        name: "login",
        query: { redirect: to.fullPath },

      });
    } else {
      next();
    }
  } else {
    if (isLoggedIn()) {
      if(to.name!="login"){
        next({
          name: "dashboard",
          query: { redirect: to.fullPath },
        });
      }else{
        next({
          name: "dashboard",
        });
      }
    }else{
      next();
    }
  }
})
export default router;
