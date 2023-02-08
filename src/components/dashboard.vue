<template>
  <div class="container">
    <div class="tables rounded">
      <headers />
      <table class="table table-hover">
        <thead class="thead-dark">
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
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
        </thead>
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
      <userform @show="getdata()" />
    </div>
  </div>
</template>
<script>
import userform from "@/components/userform.vue";
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { onMounted, computed, ref } from "vue";
import headers from "@/components/header.vue";


export default {
  components: { headers, userform },
  name: "dash-board",
  setup() {
    let Data = ref([]);

    let EditData = ref({});
    let b = ref("");
    let router = useRouter();

    const store = useStore();

    const post = computed(() => {
      return store.state.data;
    });
    function getdata() {
      store.dispatch("apiData");
    }
    function Dell(id) {
      store.dispatch("deleteData", id)
    }
    function userid(id) {
      axios
        .get("https://api-generator.retool.com/2DhLht/data/" + id)
        .then((response) => {
          EditData.value = response.data;
          console.log(" Data value", EditData.value);
        });
    }
    function userdata(recordId){
      console.log("recoded id of user data page",recordId)
      router.push({
        name: "userdata",
        params: {
          id: recordId,
          
        },
        
      });
      
    }
    function updateData(recordId){
      store.state.fullname = EditData.value.fullname
      store.state.email = EditData.value.email
      store.state.password = EditData.value.password
      store.dispatch("updateData",recordId);
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
    };
  },
};
</script>
<style >
.btn1 {
  font-size: 1.2vw;
  color: black;
  padding-left: 10px;
}
.btn2 {
  font-size: 1.2vw;
  color: white;
  padding-left: 10px;
}
th {
  padding-left: 10px;
  font-size: 1.5vw;
}
li {
  list-style: none;
}
ul {
  color: red;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: large;
  margin-left: -30px;
}

tr {
  font-size: 1.4vw;
}
.tables {
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  margin: 2% 0% 0% 1%;
  border-radius: 0 0 10px 10px;
  background-color: aliceblue;
}
span {
  font-size: 2vw;
  color: darkslategray;
}

.align-right {
  text-align: right;
}
label {
  font-size: 1.5vw;
}
</style>
