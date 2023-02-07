<template>
  <div>
    <div class="container mt-5 rounded">
      <div class="row backgd rounded">
        <div class="col-md-6 rounded">
          <h1 class="display-1 text-center h1">Login page</h1>
          <img
            class="img-fluid rounded mx-auto d-none d-sm-block"
            src="../assets/loginbg.jpg"
          />
        </div>
        <div class="col-md-6 mt-5">
          <form class="rounded form">
            <div class="form-group">
              <label class="label mt-4">Email</label>
              <input
                type="text"
                class="form-control bt1"
                placeholder="Enter Email"
                v-model="Email"
                @keyup="validationE"
              />
              <!-- Error Message -->

              <p v-if="error.length"></p>
              <ul>
                <li v-for="e in error" v-bind:key="e.id">
                  <span class="red">{{ e.emailReqError }}</span>
                  <span>{{ e.emailNValid }}</span>
                </li>
              </ul>
            </div>
            <div class="form-group">
              <label class="label mt-2">Password</label>
              <input
                :type="passwordField"
                class="form-control bt1"
                placeholder="Enter Password"
                autocomplete="off"
                v-model="Password"
                @keyup="validationP"
              />
              <font-awesome-icon
                @click="showpwd()"
                class="fnt"
                :icon="['fas', 'eye']"
              />
              <p v-if="error.length"></p>
              <ul>
                <li v-for="e in error" v-bind:key="e.id">
                  <span class="red"> {{ e.PasswordNValid }}</span>
                  <span>{{ e.regNPassword }}</span>
                </li>
              </ul>
            </div>

            <div class="row mt-2 text-center">
              <button
                @click="login()"
                type="button"
                class="btn btn-warning btn-lg bt1 mt-4"
                :disabled="Email && Password == ''"
              >
                Login
              </button>
              <a class="bt1 mt-4" href="#"
                ><p @click="Signup()">Create a new account</p></a
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  name: "log-in",
  setup() {
    const Email = ref("");
    const Password = ref("");
    const error = ref("");
    const passwordField = ref("password");
    const regEmail = ref(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/
    );
    const regPassword = ref(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/
    );

    let router = useRouter();

    function validationE() {
      error.value = [];
      if (Email.value === "") {
        error.value.push({
          emailReqError: "Email is required",
        });
      } else if (!regEmail.value.test(Email.value)) {
        error.value.push({
          emailNValid: "Email is not valid",
        });
      } else {
        error.value.push({
          emailValid: "Username is valid",
        });
      }
    }
    function validationP() {
      error.value = [];
      if (Password.value === "") {
        error.value.push({
          PasswordNValid: "Password is required",
        });
      } else if (!regPassword.value.test(Password.value)) {
        error.value.push({
          PasswordNValid: "Password Not Valid  ",
        });
      } else {
        error.value.push({
          regNPassword: "Password is valid",
        });
      }
    }
    function login() {
      let EmailR = localStorage.getItem("Registeruser");
      const tempData = JSON.parse(EmailR);
      const LocalData = tempData;
      console.log(LocalData);
      if (Email.value == LocalData[1] && Password.value == LocalData[2]) {
        console.log(Email.value && Password.value == LocalData[1]);
        router.push({ name: "dashboard" });
      } else {
        console.log(Email.value && Password.value == LocalData[1]);
      }
    }
    function Signup() {
      router.push({ name: "register" });
    }
    function showpwd() {
      passwordField.value =
        passwordField.value === "password" ? "text" : "password";
    }
    return {
      Email,
      Password,
      regEmail,
      regPassword,
      Signup,
      login,
      error,
      validationE,
      validationP,
      showpwd,
      passwordField,
    };
  },
};
</script>
<style scoped>
.form{
  position: relative;
}
.label {
  font-size: 2.4vw;
}
span {
  color: green;
}
.h1 {
  font-size: 3vw;
}
.bt1 {
  font-size: 1.5vw;
}
.backgd {
  background-color: white;
  font-family: "Exo 2", sans-serif;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}
.red {
  color: red;
}
.fnt {
  position: absolute;
  right: 3%;
  font-size: 1.2vw;
  bottom: 50%;
}
.red {
  color: red;
}
</style>
