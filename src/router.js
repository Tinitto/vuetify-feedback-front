import Vue from "vue";
import Router from "vue-router";
import AppList from "./views/AppList.vue";
import AppDetail from "./views/AppDetail.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "app-list",
      component: AppList
      // Lazy-load the view
      // component: () => import("./views/AppList.vue")
      // Lazy loading seems to be causing issues with github pages
    },
    {
      path: "/:id",
      name: "app-detail",
      component: AppDetail
      // component: () => import("./views/AppDetail.vue")
    },
    {
      path: "*", // for  any random url
      name: "app-all",
      component: AppList
      // Lazy-load the view
      // component: () => import("./views/AppList.vue")
    }
  ]
});
