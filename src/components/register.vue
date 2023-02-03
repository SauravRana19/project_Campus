<template>
  <div>
    <div class="container m-auto mt-3 rounded">
      <div class="row backgd rounded">
        <div class="col-md-6 rounded">
          <h1 class="display-1 text-center h1">Register page</h1>
          <img
            class="img-fluid rounded mx-auto d-none d-sm-block"
            src="../assets/back.png"
          />
        </div>
        <div class="col-md-6">
          <form class="rounded">
            <label class="label">UserName</label>
            <input
              type="text"
              class="form-control bt1"
              placeholder="Enter Username"
              autocomplete="off"
              v-model="Username"
              @keyup.prevent="validationU"
            />
            <p v-if="error.length"></p>
            <ul>
              <li v-for="e in error" v-bind:key="e.id">
                {{ e.UsernameNValid }}
                {{ e.regUsername }}
                <span>{{ e.UsernameValid }}</span>
              </li>
            </ul>

            <label class="label">Email</label>
            <input
              type="text"
              class="form-control bt1"
              placeholder="Enter Email"
              v-model="Email"
              @keyup.prevent="validationE"
            />
            <!-- Error Message -->

            <p v-if="error.length"></p>
            <ul>
              <li v-for="e in error" v-bind:key="e.id">
                {{ e.emailReqError }}
                {{ e.emailNValid }}
                <span>{{ e.emailValid }}</span>
              </li>
            </ul>

            <label class="label">Password</label>
            <input
              type="password"
              class="form-control bt1"
              placeholder="Enter Password"
              autocomplete="off"
              v-model="Password"
              @keyup.prevent="validationP()"
            />
            <p v-if="error.length"></p>
            <ul>
              <li v-for="e in error" v-bind:key="e.id">
                {{ e.PasswordNValid }}
                {{ e.regPassword }}
                <span>{{ e.PasswordValid }}</span>
              </li>
            </ul>
            <label class="label">Confirm-Password</label>
            <input
              type="password"
              class="form-control bt1"
              placeholder="Enter Confirm-Password"
              autocomplete="off"
              v-model="Confirmpassword"
              @keyup.prevent="validationCP"
            />
            <p v-if="error.length"></p>
            <ul>
              <li v-for="e in error" v-bind:key="e.id">
                {{ e.ConfirmpasswordNValid }}
                {{ e.regConfirmpassword }}
                <span>{{ e.ConfirmpasswordValid }}</span>
              </li>
            </ul>
            <div class="row mt-4 text-center">
              <Button
                @click="register()"
                id="btn1"
                type="button"
                class="btn btn-warning btn-lg bt1"
                :disabled="Username && Email && Confirmpassword != Password  "
                >Sign UP
              </Button>
              <a class="bt1" href="#"
                ><p @click.prevent="login()">Already Account login</p></a
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
  name: "regi-ster",
  setup() {
    let data = ref([]);
    const Username = ref("");
    const Email = ref("");
    const Password = ref("");
    const Confirmpassword = ref("");
    const error = ref("");

    const regUsername = ref(
      /^(?=.{5,20}$)(?![_.-])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$/
    );
    const regEmail = ref(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/
    );
    const regPassword = ref(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/
    );

    let router = useRouter();

    // const button1 = document.querySelector("#btn1");

    function register() {
      if (
        (Username.value == "") & (Email.value == "") & (Password.value == "") &&
        Confirmpassword.value == ""
      ) {
        alert("Empty  Field");
      } else {
        data.value.push(
          Username.value,
          Email.value,
          Password.value,
          Confirmpassword.value
        );
        console.log(data);
        localStorage.setItem("Registeruser", JSON.stringify(data.value));
        router.push({ name: "dashboard" });
      }
    }
    function validationU() {
      error.value = [];
      if (Username.value === "") {
        error.value.push({
          regUsername: "Username is required",
        });
      } else if (!regUsername.value.test(Username.value)) {
        error.value.push({
          UsernameNValid: "Username is not valid",
        });
      } else {
        error.value.push({
          UsernameValid: "Username is valid",
        });
      }
    }
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
          emailValid: "Email is valid",
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
          PasswordNValid:
            "Password Should containe one Numeric, one Special Character, Minimum 6 Chracter  ",
        });
      } else {
        error.value.push({
          PasswordValid: "Password is valid",
        });
      }
    }
    function validationCP() {
      error.value = [];

      if (Confirmpassword.value === "") {
        error.value.push({
          ConfirmpasswordNValid: "Confirm-Password ",
        });
      } else if (Confirmpassword.value !== Password.value) {
        error.value.push({
          ConfirmpasswordNValid: "Password Not Match",
        });
      } else {
        error.value.push({
          ConfirmpasswordValid: "Password Matched",
        });
      }
    }
    function login() {
      router.push({ name: "login" });
    }

    return {
      Username,
      Email,
      Password,
      Confirmpassword,
      register,

      error,
      data,
      login,
      router,
      validationU,
      validationE,
      validationP,
      validationCP,
    };
  },
};
</script>
<style scoped>
.label {
  font-size: 3vw;
}
span {
  color: green;
}
.h1 {
  font-size: 4vw;
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
</style>
