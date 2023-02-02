<template>
  <div>
    <div class="tables rounded">
      <table class="table table-hover">
        <thead class="thead-dark">
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
          <tr v-for="item in post" v-bind:key="item.id">
            <td>{{ item.id }}</td>
            <td @click="DiscUser(item.id)">
              <a href="#">{{ item.FullName }} </a>
            </td>
            <td>{{ item.email }}</td>
            <td>{{ item.number }}</td>
            <td>
              <button
                @click="editUser(item.id)"
                type="button"
                class="btn1"
                data-bs-toggle="modal"
                data-bs-target="#useredit"
              >
                <i class="fa fa-pencil" aria-hidden="true"></i>
                Edit
              </button>
            </td>
            <td>
              <button @click="Dell(item.id)" type="button" class="btn2">
                <i class="fa fa-close"></i>
                Delete
              </button>
            </td>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { onMounted, ref } from "vue";
export default {
  name: "dash-board",
  setup() {
    let post = ref("");

    function getdata() {
      axios
        .get(`https://api-generator.retool.com/jJl7vj/data`)
        .then((response) => {
          post.value = response.data;
          console.log(post.value);
          //    b = response.data;
          //     b.map((data) => {
          //     console.log("data", data.number);
          //     data.number = window.atob(data.number);
        });
      // });
    }

    onMounted(function () {
      getdata();
    });
    return {
      getdata,
      post,
    };
  },
};
</script>
<style>
.btn1 {
  background-color: #fff000;
  border-radius: 12px;
  color: #000;
  cursor: pointer;
  font-weight: bold;
  padding: 10px 15px;
  text-align: center;
  transition: 200ms;
  width: 100%;
  box-sizing: border-box;
  border: 0;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
.btn2 {
  background-color: rgba(255, 0, 0, 0.626);
  border-radius: 12px;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  padding: 10px 15px;
  text-align: center;
  transition: 200ms;
  width: 100%;
  box-sizing: border-box;
  border: 0;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
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
  width: auto;
  height: auto;
}
span {
  font-size: 2vw;
  color: darkslategray;
}

.align-right {
  text-align: right;
}
</style>
