<template>
  <div class="dashboard">
    <headers />
    <input
      type="text"
      id="myInput"
      @keyup="myFunction()"
      placeholder="Search for names.."
      title="Type in a name"
      style="border: 2px solid green;
      border-radius: 5px;"
    />
    <table
      id="datatable"
      class="table table-light table-borderless table-hover"
    > 
      <thead>
        <tr class="trfilter">
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in post" v-bind:key="item.id">
          <td>{{ item.id }}</td>
          <td @click="userdata(item.id)">
            <a href="#">{{ item.fullname }} </a>
          </td>
          <td>{{ item.email }}</td>
          <td>{{ item.password }}</td>
          <td>
            <button
              @click="userid(item.id)"
              type="button"
              class="btn btn-warning btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#useredit"
            >
              <i class="fa fa-pencil btn1" aria-hidden="true"></i>
              <span class="btn1">Edit</span>
            </button>
          </td>

          <td>
            <button
              @click="Dell(item.id)"
              type="button"
              class="btn btn-danger btn-sm"
            >
              <i class="fa fa-close btn1"></i>
              <span class="btn2">Delete</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      id="useredit"
      @close="getdata()"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title">Edit UserData</h1>
          </div>
          <form class="form-auto">
            <div class="form-group">
              <label for=""> FullName:</label
              ><input
                class="form-control"
                placeholder="Enter Full Name"
                type="text"
                @keyup="register"
                v-model="EditData.fullname"
              />
            </div>
            <div class="form-group">
              <label for="Email"> Email:</label
              ><input
                class="form-control"
                placeholder="Enter Email"
                type="email"
                v-model="EditData.email"
                @keyup="register"
              />
            </div>
            <div class="form-group">
              <label for="Password"> Password:</label
              ><input
                class="form-control"
                placeholder="Enter Password"
                type="password"
                v-model="EditData.password"
                @keyup="register"
              />
            </div>
          </form>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-warning"
              @click="updateData(EditData.id)"
              data-bs-dismiss="modal"
            >
              <i class="fa fa-pencil" aria-hidden="true"></i>Update
            </button>
            <button
              class="btn btn-danger ml-2"
              type="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <userform />
  </div>
</template>
<script>
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";


import userform from "@/components/userform.vue";

import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { onMounted, computed, ref } from "vue";
import headers from "@/components/header.vue";

export default {
  components: { headers, userform },
  name: "dash-board",
  setup() {
    let Data = ref([]);

    let b = ref("");
    let router = useRouter();

    const store = useStore();

    let EditData = computed(() => {
      return store.state.editData;
    });

    const post = computed(() => {
      return store.state.data;
    });

    let Datatable = post.value;

    // function start

    function getdata() {
      store.dispatch("apiData");
      
    }
    function Dell(id) {
      store.dispatch("deleteData", id);
    }
    function userid(id) {
      store.dispatch("editdata", id);
    }
    function userdata(recordId) {
      router.push({
        name: "userdata",
        params: {
          id: recordId,
        },
      });
    }
    function updateData(recordId) {
      store.state.fullname = EditData.value.fullname;
      store.state.email = EditData.value.email;
      store.state.password = EditData.value.password;
      store.dispatch("updateData", recordId);
    }
    function myFunction() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("datatable");
      tr = table.getElementsByTagName("tr");

      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }

    onMounted(function () {
      getdata();
      
      
    });
    return {
      getdata,
      post,
      Dell,
      userid,
      Data,
      EditData,
      updateData,
      userdata,
      b,
      Datatable,
      myFunction,
    };
  },
};
</script>
<style>
.dashboard {
  width: 90%;

  margin-left: 4rem;
  margin-top: 10px;
  border-radius: 10px;
  background-color: white;
}
li {
  list-style: none;
}
tr {
  font-size: 1.2vw;
}
.trfilter {
  font-size: 1.2vw;
}
</style>
