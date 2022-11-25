import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import ExampleCharts from "../views/ExampleCharts.vue";
import Feeds from "../views/Feeds.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/example-charts",
    name: "example-charts",
    component: ExampleCharts,
  },
  {
    path: "/feeds",
    name: "feeds",
    component: Feeds,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
