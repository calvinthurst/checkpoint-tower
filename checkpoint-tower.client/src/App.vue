<template >
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer class="bg-footer col-11 text-black fs-4 m-0 p-2 text-center">
    Made for big ballers
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 43px;
}

.bg-footer {
  background-color: rgb(223, 251, 223);
}

.text-black {
  color: rgb(48, 48, 48);
}
</style>
