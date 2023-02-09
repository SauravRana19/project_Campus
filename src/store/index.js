import { createStore } from "vuex";
import axios from "axios";
// import swal from "sweetalert2";

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
    addAdata({ state }) {
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
