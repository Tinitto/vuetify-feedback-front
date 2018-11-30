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
    },
    {
      path: "/:id",
      name: "app-detail",
      component: AppDetail
    }
    /*{
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import("./views/About.vue")
    }*/
  ]
});
