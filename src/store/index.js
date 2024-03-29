import { createStore } from "vuex";
import axios from "axios";
// import swal from "sweetalert2";
import $ from "jquery";
axios.interceptors.request.use((config) => {
  console.log("config", config);
  return config;
});
axios.interceptors.response.use(
  (res) => {
    console.log("res", res);
    return Promise.resolve(res);
  },
  (err) => {
    console.log("err", err);
    return Promise.reject(err);
  }
);

export default createStore({
  state: {
    name: "Dell",
    data: {},
    editData: {},
    fullname: "",
    email: "",
    password: "",
  },

  getters: {},

  mutations: {
    apigetdata(state, responsedata) {
      state.data = responsedata;
      
      state.data.map((data) => {
        data.password = window.atob(data.password);
      });
    },
    editdata(state, response) {
      state.editData = response;
    },
  },

  actions: {
    apiData({ commit }) {
      axios
        .get(`https://api-generator.retool.com/2DhLht/data`)
        .then((response) => {
          commit("apigetdata", response.data);
          setTimeout(() => {
            $("#datatable").DataTable({
              lengthMenu: [
                [5, 10, 25, 50, -1],
                [5, 10, 25, 50, "All"],
              ],
              pageLength: 5,
              retrieve: true,
              stateSave: true,
              bDestroy: true,
            });
          });
        });
    },

    updateData({ dispatch, state }, recordId) {
      var a = state.password;
      var b = window.btoa(a);
      console.log(b);
      fetch("https://api-generator.retool.com/2DhLht/data/" + recordId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: state.fullname,
          email: state.email,
          password: b,
        }),
      }).then(() => {
        dispatch("apiData");
      });
    },
    deleteData({ dispatch }, id) {
      fetch("https://api-generator.retool.com/2DhLht/data/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        dispatch("apiData");
      });
    },
    addAdata({ state, dispatch }) {
      let a = state.password;
      let b = window.btoa(a);
      fetch(" https://api-generator.retool.com/2DhLht/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: state.fullname,
          email: state.email,
          password: b,
        }),
      }).then(() => {
        dispatch("apiData");
      });
    },

    editdata({ commit }, id) {
      axios
        .get("https://api-generator.retool.com/2DhLht/data/" + id)
        .then((response) => {
          commit("editdata", response.data);
        });
    },
  },

  modules: {},
});
