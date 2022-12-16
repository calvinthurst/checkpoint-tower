<template>
  <div class="component">
    {{ ticket.event }}

  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  props: {
    ticket: {
      type: Object
    }
  },
  setup(props) {
    return {}
  }
};
</script>


<style lang="scss" scoped>

</style>