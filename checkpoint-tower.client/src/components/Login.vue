<template>
  <span class="navbar-text m-2">
    <router-link :to="{ name: 'Home' }">
      <div class="text-center mb-2">
        Home
      </div>
    </router-link>
    <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0 mb-2" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>
    <div v-else>
      <div v-if="account.picture || user.picture" class="text-center mb-2">
        <img :src="account.picture || user.picture" alt="account photo" height="40" class="rounded" />
      </div>
    </div>
    <div class="mb-2">
      <router-link :to="{ name: 'Account' }">
        <div class="text-center border border-light rounded">
          Manage Account
        </div>
      </router-link>
      <div class=" text-danger selectable text-center mb-2" @click="logout">
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

</style>
