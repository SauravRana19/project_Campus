<template>
  <div class="container">
    <button
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#userforms"
      class="btn btn-success"
    >
      <i class="fa fa-address-book" aria-hidden="true"></i>Add New User
    </button>
    <div
      class="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      id="userforms"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-2 text-center">User-Form</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form>
            <div class="form-auto">
              <label for=""> Username:</label
              ><input
                class="form-control"
                placeholder="Enter first name"
                type="text"
                v-model="Username"
                @keyup="validationU"
              />
              <!-- Error Message -->
              <ul>
                <li v-for="e in error" v-bind:key="e.id">
                  <span>{{ e.regUsername }}</span>
                  <span>{{ e.UsernameNValid }}</span>
                  <span style="color: green">{{ e.UsernameValid }}</span>
                </li>
              </ul>
            </div>
            <div class="form-group">
              <label for=""> Email:</label
              ><input
                class="form-control"
                placeholder="Enter Email"
                type="email"
                v-model="Email"
                @keyup="validationE"
              />
              <!-- Error Message -->
              <ul>
                <li v-for="e in error" v-bind:key="e.id">
                  <span>{{ e.EmailReqError }}</span>
                  <span>{{ e.EmailNValid }}</span>
                  <span style="color: green">{{ e.EmailValid }}</span>
                </li>
              </ul>
            </div>
            <div class="form-group">
              <label for=""> Password:</label
              ><input
                class="form-control"
                placeholder="Enter password"
                type="password"
                v-model="Password"
                @keyup="validationP"
              />
              <!-- Error Message -->
              <ul>
                <li v-for="e in error" v-bind:key="e.id">
                  <span>{{ e.PasswordNValid }}</span>
                  <span>{{ e.PasswordReqError }}</span>
                  <span style="color: green">{{ e.PasswordValid }}</span>
                </li>
              </ul>
            </div>
            <button
              data-bs-dismiss="modal"
              type="button"
              class="btn btn-primary"
              @click="register()"
            >
              <i class="fa fa-address-book" aria-hidden="true"></i>Add
            </button>
            <button
              type="button"
              class="btn btn-warning"
              data-bs-dismiss="modal"
              @click="returnd()"
            >
              <i class="fa fa-long-arrow-left" aria-hidden="true"></i> Return
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import swal from "sweetalert2";
import { ref,watch } from "vue";
import { useStore } from "vuex";
export default {
  name: "userfo-rm",
  setup() {
    const error = ref("");
    const Username = ref("");
    const Email = ref("");
    const Password = ref("");

    const store = useStore();
    const regUsername = ref(
      /^(?=.{5,20}$)(?![_.-])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$/
    );
    const regEmail = ref(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/
    );
    const regPassword = ref(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/
    );
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
          EmailReqError: "Email is required",
        });
      } else if (!regEmail.value.test(Email.value)) {
        error.value.push({
          EmailNValid: "Email is not valid",
        });
      } else {
        error.value.push({
          EmailValid: "Email is valid",
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
          PasswordNValid: "Password not valid  ",
        });
      } else {
        error.value.push({
          PasswordValid: "Password is valid",
        });
      }
    }
    function register() {
      if (Username.value == "" || Email.value == "" || Password.value == "") {
        swal.fire({ title: "Empty Fields" });
      } else {
        store.state.fullname = Username.value;
        store.state.email = Email.value;
        store.state.password = Password.value;
        store.dispatch("addAdata");
      }
    }

    watch(Username,(newval,olvalue)=>{
      console.log(newval, "== ",olvalue)
    })
    return {
      Username,
      Email,
      Password,
      regUsername,
      regEmail,
      regPassword,
      error,
      validationU,
      validationE,
      validationP,
      register,
    };
  },
};
</script>
<style scoped>
li {
  list-style: none;
}
span {
  font-size: 1.2vw;
  color: red;
  font-family: "Exo 2", sans-serif;
}
label {
  font-size: 1.5vw;
}
</style>
