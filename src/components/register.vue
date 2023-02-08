<template>
  <div>
    <div class="container m-auto mt-3 rounded">
      <div class="row w-60 backgd rounded">
        <div class="col-md-6 rounded">
          <h1 class="display-1 text-center h1">Register page</h1>
          <img
            class="img-fluid rounded mx-auto d-none d-sm-block"
            src="../assets/back.png"
          />
        </div>
        <div class="col-md-6">
          <form class="form rounded">
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
                <span class="red">{{ e.UsernameNValid }}</span>
                <span class="red">{{ e.regUsername }}</span>
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
                <span class="red">{{ e.emailReqError }}</span>
                <span class="red">{{ e.emailNValid }}</span>
                <span>{{ e.emailValid }}</span>
              </li>
            </ul>
            <div class="form-outline">
              <label class="label">Password</label>
              <div>
                <input
                  :type="passwordField"
                  class="form-control form-icon-trailing bt1"
                  placeholder=" Enter Password"
                  autocomplete="off"
                  v-model="Password"
                  @keyup.prevent="validationP()"
                />

                <font-awesome-icon
                  @click="showpwd()"
                  class="fnt"
                  :icon="['fas', 'eye']"
                />

                <p v-if="error.length"></p>

                <ul>
                  <li v-for="e in error" v-bind:key="e.id">
                    <span class="red">{{ e.PasswordNValid }}</span>
                    <span class="red">{{ e.regPassword }}</span>
                    <span>{{ e.PasswordValid }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="form">
              <label class="label">Confirm-Password</label>
              <input
                :type="CpasswordField"
                class="form-control bt1"
                placeholder="Enter Confirm-Password"
                autocomplete="off"
                v-model="Confirmpassword"
                @keyup.prevent="validationCP"
              />
              <font-awesome-icon
                @click="showCpwd()"
                class="fnt1"
                :icon="['fas', 'eye']"
              />
              <p v-if="error.length"></p>
              <ul>
                <li v-for="e in error" v-bind:key="e.id">
                  <span class="red">{{ e.ConfirmpasswordNValid }}</span>
                  <span class="red">{{ e.regConfirmpassword }}</span>
                  <span>{{ e.ConfirmpasswordValid }}</span>
                </li>
              </ul>
            </div>
            <div class="row mt-4 text-center">
              <Button
                @click="register()"
                id="btn1"
                type="button"
                class="btn btn-warning btn-lg bt1"
                :disabled="Username && Email && Confirmpassword != Password"
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
    const passwordField = ref("password");
    const CpasswordField = ref("password");

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

    function register() {
      if (
        (Username.value == "") & (Email.value == "") & (Password.value == "") &&
        Confirmpassword.value == ""
      ) {
        alert("Empty  Field");
      } else {
        data.value.push(Username.value, Email.value, Password.value);
        console.log(data);
        localStorage.setItem("Registeruser", JSON.stringify(data.value));
        router.push({ name: "login" });
      }
    }

    function showpwd() {
      passwordField.value =
        passwordField.value === "password" ? "text" : "password";
    }
    function showCpwd() {
      CpasswordField.value =
        CpasswordField.value === "password" ? "text" : "password";
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
            "Only one Numeric, one Special Ch, Min 6 Ch  ",
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
      passwordField,
      CpasswordField,

      error,
      data,
      login,
      router,
      validationU,
      validationE,
      validationP,
      validationCP,
      showpwd,
      showCpwd,
    };
  },
};
</script>
<style scoped>
.form {
  position: relative;
}
.label {
  font-size: 2.3vw;
}
span {
  font-size: 1.5vw;
  margin-top: -20px;  
  color: green;
  font-family: "Exo 2", sans-serif;
  position: absolute;
}
.red {
  font-size: 1.5vw;
  margin-top: -20px;
  color: red;
  font-family: "Exo 2", sans-serif;
  position: absolute;
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
  display: flex;
  right: 3%;
  font-size: 1vw;
  align-items: center;
  bottom: 45.5%;
}
.fnt1 {
  display: flex;
  position: absolute;
  align-items: center;
  right: 3%;
  font-size: 1vw;
  bottom: 20.5%;
}
</style>
