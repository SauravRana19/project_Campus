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
            <td @click="userid(item.id)">
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
      <div class="modal" id="useredit" @close="getdata()">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 style="font-size: 2vw">Edit UserData</h1>
              <form>
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
                  <label for=""> Email:</label
                  ><input
                    class="form-control"
                    placeholder="Enter Email"
                    type="email"
                    v-model="EditData.email"
                    @keyup="register"
                  />
                </div>
                <div class="form-group">
                  <label for=""> Password:</label
                  ><input
                    class="form-control"
                    placeholder="Enter Password"
                    type="password"
                    v-model="EditData.password"
                    @keyup="register"
                  />
                </div>
              </form>
            </div>
            <button
              type="button"
              class="btn btn-warning"
              @click="Update(EditData.id)"
            >
              <i class="fa fa-pencil" aria-hidden="true"></i>Update
            </button>
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

import { onMounted, computed, ref } from "vue";
import headers from "@/components/header.vue";

export default {
  components: { headers, userform },
  name: "dash-board",
  setup() {
    let Data = ref([]);

    let EditData = ref({});
    let b = ref("");


    const store = useStore();

    const post = computed(() => {
      return store.state.data;
    });
    function getdata() {
      store.commit("apiData");
    }
    function Dell(id) {
      fetch("https://api-generator.retool.com/2DhLht/data/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          alert("Succesful");
          getdata();
          // swal.fire({ html: "Deleted! success" });
        }
      });
    }
    function userid(id) {
      axios
        .get("https://api-generator.retool.com/2DhLht/data/" + id)
        .then((response) => {
          EditData.value = response.data;
          console.log(" Data value", EditData.value);
        });
    }
    function Update(recordId) {
      if (
        EditData.value.FullName == "" ||
        EditData.value.email == "" ||
        EditData.value.password == ""
      ) {
        // swal.fire({ title: "Empty Fields" });
      } else {
        

        var a = EditData.value.password;
        b.value = window.btoa(a);
        fetch("https://api-generator.retool.com/2DhLht/data/" + recordId, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname: EditData.value.fullname,
            email: EditData.value.email,
            password: b.value,
          }),
        })
          .then((res) => {
            if (res.ok) {
              console.log("PUT Request Successful");
              this.getdata();
              // swal.fire({ html: "Updated!" });
            } else {
              console.log("PUT Request Failed");
            }
            return res;
          })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
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
      Update,
      b,
    };
  },
};
</script>
<style scoped>
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
td a {
  text-decoration: none;
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
</style>
