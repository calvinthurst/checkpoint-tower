<template>
  <span class="navbar-text m-2">
    <router-link :to="{ name: 'Home' }">
      <div class="text-center mb-2  text-dark fw-bold">
        Home
      </div>
    </router-link>
    <button class="btn selectable lighten-30 text-uppercase my-2 my-lg-0 mb-2  text-dark" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>
    <div v-else>
      <div v-if="account.picture || user.picture" class="text-center my-2">
        <img :src="account.picture || user.picture" alt="account photo" height="40" class="rounded" />
      </div>
    </div>
    <div class="">
      <router-link :to="{ name: 'Account' }">
        <div class="text-center  rounded my-3 text-dark fw-bold">
          Manage Account
        </div>
      </router-link>
      <div class=" text-grey back rounded selectable text-center mb-2 fw-bold" @click="logout">
        <i class="mdi mdi-logout"></i>
        logout
      </div>
    </div>
  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.back {
  background-color: rgba(0, 0, 0, 0.605);
}
</style>
