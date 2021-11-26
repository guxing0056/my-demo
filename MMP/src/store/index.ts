import { createPinia } from "pinia";
import { loading } from "./plugins/loading";

export * from "./wallet";
export * from "./mmp";

export const store = createPinia();
store.use(loading);
