<template>
  <div>
    <div class="container  mt-5 rounded">
      <div class="row backgd rounded">
        <div class="col-md-6 rounded">
          <h1 class="display-1 text-center h1">Login page</h1>
          <img
            class="img-fluid rounded mx-auto d-none d-sm-block"
            src="../assets/loginbg.jpg"
          />
        </div>
        <div class="col-md-6 mt-5">
          <form class="rounded">
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

              <p v-if="error.length">
              <ul>
                <li v-for="e in error" v-bind:key="e.id">
                  {{ e.emailReqError }}
                  {{ e.emailNValid }}
                  <span>{{ e.emailValid }}</span>
                </li>
              </ul></p>
            </div>
            <div class="form-group">
              <label class="label mt-2">Password</label>
              <input
                type="text"
                class="form-control bt1"
                placeholder="Enter Password"
                autocomplete="off"
                v-model="Password"
                required="password"
                @keyup="validationP"
              />
              <p v-if="error.length">
              <ul>
                <li v-for="e in error" v-bind:key="e.id">
                  {{ e.PasswordNValid }}
                  {{ e.regNPassword }}
                  <span>{{ e.PasswordValid}}</span>
                </li>
              </ul></p>
            </div>

            <div class="row mt-2 text-center">
              <button
                @click="login()"
                type="button"
                class="btn btn-warning btn-lg bt1 mt-4"
                :disabled=" Password == ''"
              >
                Login
              </button>
              <a class="bt1 mt-4" href="#"><p @click="Signup()">Sign Up</p></a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
import { ref} from "vue";

export default {
  name: "log-in",
  setup() {
    const Email = ref("");
    const Password = ref("");
    const error =ref("");
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
            PasswordNValid:
            "Password Should containe one Numeric, one Special Character, Minimum 6 Chracter  ",
        });
      } else {
        error.value.push({
            PasswordValid: "Password is valid",
        });
      }
    }
    function login() {
      let EmailR = localStorage.getItem("Registeruser");
      const tempData =JSON.parse(EmailR)
      const [LocalData]= tempData
      const {email, password}=LocalData
      console.log("ssssssss",email,password) 
      // router.push({ name: "dashboard" });
    }
    function Signup() {
      router.push({ name: "register" });
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
      
    };
  },
};
</script>
<style scoped>

.label {
  font-size: 3vw;
}
span{
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
