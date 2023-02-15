<template>
  <header>
    <div id="mySidenav" class="sidenav">
      <a class="closebtn" @click="closeNav()">&#127817;</a>
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
    </div>
    <span style="font-size: 2vw" @click="openNav()">&#127919;</span>
    
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
    function openNav() {
      document.getElementById("mySidenav").style.width = "250px";
      document.getElementById("main").style.marginLeft = "250px";
      document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    }
    function closeNav() {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
      document.body.style.backgroundColor = "white";
    }
    return {
      logout,
      alluser,
      home,
      openNav,
      closeNav,
    };
  },
};
</script>
<style>
h1 {
  font-size: 3vw;
}
.sidenav {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: #111; /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
}
.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}
.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}
#main {
  transition: margin-left 0.5s;
  padding: 16px;
}
</style>
