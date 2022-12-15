<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img class="bg-blank" alt="logo" src="../assets/img/Logo.png" height="45" />
      </div>
    </router-link>
    <!-- LOGIN COMPONENT HERE -->
  </nav>
  <div class="row justify-content-end m-0 ">

    <nav class="col-1 navbar justify-content-center navbar-dark align-items-start bg-navbar ">
      <Login />
    </nav>

  </div>
</template>

<script>
import Login from './Login.vue'
export default {
  setup() {
    return {}
  },
  components: { Login }
}
</script>

<style scoped>
.bg-navbar {
  min-height: 100vh;
  background-image: linear-gradient(rgb(61, 61, 61), rgba(61, 61, 61, 0.623));
}

a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
