import { createApp } from "vue";

import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

createApp(App).use(store).use(router,axios).mount("#app");
