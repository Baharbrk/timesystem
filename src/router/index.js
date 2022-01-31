
import Vue from "vue";
import VueRouter from "vue-router";
import Calendar from "../views/Calendar.vue";
import Login from "../views/Login.vue";
import Verwaltung from "../views/Verwaltung.vue";
import Zeitenauswerten from "../views/Zeitenauswerten.vue";
import Zeiterfassen from "../views/Zeiterfassen.vue";
import Zeitkorriegieren from "../views/Zeitkorriegieren.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/",
   component: Login 
   },
  { path: "/calendar",
   components: {Calendar: Calendar},
   props: true,
   },
  { path: "/verwaltung",
   component: Verwaltung ,
  },
  {
    path: "/zeitenauswerten",
    components: { Zeitenauswerten: Zeitenauswerten },
    props: true,
  },
  {
    path: "/zeiterfassen",
    components: { Zeiterfassen: Zeiterfassen },
    props: true,
  },
  {
    path: "/zeitkorriegieren",
    components: { Zeitkorriegieren: Zeitkorriegieren },
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
