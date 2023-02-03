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
            <td @click="DiscUser(item.id)">
              <a href="#">{{ item.fullname }} </a>
            </td>
            <td>{{ item.email }}</td>
            <td>{{ item.password }}</td>
            <td>
              <button
                @click="editUser(item.id)"
                type="button"
                class="btn btn-warning btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#useredit"
              >
                <i class="fa fa-pencil" aria-hidden="true"></i>
                <span class="btn1">Edit</span>
              </button>
            </td>
            <td>
              <button
                @click="Dell(item.id)"
                type="button"
                class="btn btn-danger btn-sm"
              >
                <i class="fa fa-close"></i>
                <span class="btn2">Delete</span>
              </button>
            </td>
          </tr>
        </thead>
      </table>
      <userform />
    </div>
  </div>
</template>
<script>
import userform from "@/components/userform.vue";
import axios from "axios";
import { onMounted, ref, reactive } from "vue";
import headers from "@/components/header.vue";
export default {
  components: { headers, userform },
  name: "dash-board",
  setup() {
    let post = ref("");
    let b = reactive([]);

    function getdata() {
      axios
        .get(`https://api-generator.retool.com/2DhLht/data`)
        .then((response) => {
          post.value = response.data;
          // console.log(post.value);
          b = response.data;
          // console.log("Response b ", b);
          b.map((b) => {
            // console.log("data", b.password);
            b.password = window.atob(b.password);
            // console.log("data password",b.password)
          });
        });
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

    onMounted(function () {
      getdata();
    });
    return {
      getdata,
      post,
      Dell,
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
