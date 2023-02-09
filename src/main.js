import { createApp } from "vue";

import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import DataTable from 'datatables.net-vue3'
import Select from 'datatables.net-select';
import DataTableBs5 from 'datatables.net-bs5';

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { fas } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(fas);

DataTable.use(Select,DataTableBs5);
createApp(App)
  .use(store)
  .use(router, axios, VueSweetalert2)
  .component("font-awesome-icon", FontAwesomeIcon,DataTable,)
  .mount("#app");
