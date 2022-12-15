<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img class="bg-blank" alt="logo" src="../assets/img/Logo.png" height="45" />
      </div>
    </router-link>
    <!-- LOGIN COMPONENT HERE -->
    <button v-if="account" type="button" class="btn bg-dark elevation-3 text-primary mx-4" data-bs-toggle="modal"
      data-bs-target="#exampleModal">
      Create Event
    </button>
    <EventForm />
  </nav>
  <div class="row justify-content-end m-0 ">

    <nav class="col-1 navbar justify-content-center navbar-dark align-items-start bg-navbar ">
      <Login />
    </nav>

  </div>
</template>

<script>
import Login from './Login.vue'
import ModalContent from "../components/ModalContent.vue";
import { AppState } from "../AppState.js";
import { computed, reactive, onMounted } from 'vue';
import EventForm from "./EventForm.vue";



export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  },
  components: { Login, EventForm }
}
</script>

<style scoped>
.bg-navbar {
  height: 102vh;
  position: fixed;
  transform: translateY(-11vh);
  background: #C4DACF;
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
