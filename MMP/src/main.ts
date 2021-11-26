import "./polyfill";
import { createApp } from "vue";
import App from "./App.vue";

import { router } from "./router";
import { store } from "./store";

import "./css/index.css";

import Notifications from "notiwind";

// import Vant from "vant";
// import "vant/lib/index.css";

const app = createApp(App);

// app.use(Vant);
app.use(router);
app.use(store);
app.use(Notifications);

app.mount("#app");
