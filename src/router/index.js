import { createRouter, createWebHistory } from "vue-router";
import { defineAsyncComponent } from 'vue'
import Buy from "../views/Buy.vue";
import Movies from "../views/Movies.vue";
import Descriptions from "../views/Descriptions.vue";
import Search from "../views/Search.vue";
import Series from "../views/Series.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import { useAuth } from "../store/auth";


const routes = [
  {
    path: "/",
    name: "Movies",
    meta: { requiresAuth: true },
    component: Movies,
  },
  // {
  //   path: "/Buy",
  //   name: "Buy",
  //   component: Buy,
  //   meta: { requiresAuth: true },
  // },

  {
    path: "/Movies",
    component: Movies,

  },
  {
    path: "/Descriptions",
    name: "Descriptions",
    component: Descriptions,
    meta: { requiresAuth: true },
  },
  {
    path: "/Search",
    name: "Search",
    component: Search,
    meta: { requiresAuth: true },
  },
  // {
  //   path: "/Series",
  //   name: "Series",
  //   component: Series,
  //   meta: { requiresAuth: true },
  // },
  // {
  //   path: "/Login",
  //   name: "Login",
  //   component: Login,
  //   meta: { hideForAuth: true },
  // },
  // {
  //   path: "/Register",
  //   name: "Register",
  //   component: Register,
  //   meta: { hideForAuth: true },
  // },
];

const router = createRouter({
  routes,
  linkExactActiveClass: "active",
  history: createWebHistory(),
});

// router.beforeEach((to, from, next) => {
//   const myStore = localStorage.getItem("token");
//   const isAuth = to.matched.some((record) => record.meta.requiresAuth);
//   const isHide = to.matched.some((record) => record.meta.hideForAuth);

//   if (isAuth && !myStore) {
//     return next({ path: "/Login" });
//   } else if (isHide && myStore === true) {
//     return next(
//       { path: "/" },
//       { path: "/Buy" },
//       { path: "/Series" },
//       { path: "/Movies" }
//     );
//   }
//   next();
// });
export default router;
