<template>
  <header>
    <nav
      class="navbar navbar-expand-lg navbar-light bg-light border border-bottom-0-dark rounded-top"
    >
      <h1>Dashboard</h1>
      <div class="container-fluid">
        <div class="navbar" style="margin-left: 85%">
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://icon2.cleanpng.com/20180920/att/kisspng-user-logo-information-service-design-5ba34f886b6700.1362345615374293844399.jpg"
                  alt="mdo"
                  width="32"
                  height="32"
                  class="rounded-circle"
                />
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li @click="logout()">
                  <a class="dropdown-item" href="">Log out</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
import { useRouter } from "vue-router";
export default {
  name: "hea-ders",
  setup() {
    let router = useRouter();

    function logout() {
      localStorage.removeItem("Registeruser");
    //   swal.fire({ html: "User Logout" });
      router.push({ name: "login" });
    }
    function alluser() {
    //   swal.fire({ html: "All User Data" });
     router.push({ name: "user-profile" });
    }
    function home() {
    //   swal.fire({ html: "Dashboard" });
      router.push({ name: "dashboard" });
    }
    return {
      logout,
      alluser,
      home,
    };
  },
};
</script>
<style scoped>
h1{
    font-size: 3vw;
}
</style>
