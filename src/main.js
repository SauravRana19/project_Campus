import { createApp } from "vue";

import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { fas } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(fas);

createApp(App)
  .use(store)
  .use(router, axios)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
