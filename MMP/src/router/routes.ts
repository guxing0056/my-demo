import Home from "@/pages/Home.vue";
import IDO from "@/pages/IDO.vue";
import Stake from "@/pages/Stake.vue";
import Bond from "@/pages/Bond.vue";
import Introdution from "@/pages/Introdution.vue";

export const routes = [
  { path: "/", component: Home },
  { path: "/ido", component: IDO },
  { path: "/stake", component: Stake },
  { path: "/bond", component: Bond },
  { path: "/introdution", component: Introdution },
];

export const navigation = [
  { name: "Home", href: "/" },
  { name: "IDO", href: "/ido" },
  { name: "Stake", href: "/stake" },
  { name: "Bond", href: "/bond" },
  { name: "Introdution", href: "/introdution" },
];
