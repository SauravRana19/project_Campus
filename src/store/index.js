import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    name: "Dell",
    data: {},
  },
  getters: {},
  mutations: {
    apiData(state) {
      axios
        .get(`https://api-generator.retool.com/2DhLht/data`)
        .then((response) => {
          state.data = response.data;
          state.data.map((data) => {
            data.password = window.atob(data.password);
          });
        });
    },
  },
  actions: {},
  modules: {},
});
