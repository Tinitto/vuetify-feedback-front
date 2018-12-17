import Vue from "vue";
import Router from "vue-router";
// import AppList from "./views/AppList.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "app-list",
      // component: AppList, // Lazy-load the view
      component: () => import("./views/AppList.vue")
    },
    {
      path: "/users",
      name: "user-list",
      component: () => import("./views/UserList.vue")
    },
    {
      path: "/:id",
      name: "app-detail",
      component: () => import("./views/AppDetail.vue")
    },
    {
      path: "/rate/:id",
      name: "app-rating-form",
      component: () => import("./views/AppRatingForm.vue")
    },
    {
      path: "*", // for  any random url
      name: "app-all",
      // component: AppList, // Lazy-load the view
      component: () => import("./views/AppList.vue")
    }
  ]
});
