<template>
  <RouterLink :to="{ name: 'Events', params: { eventId: ticket.eventId } }">
    <div class="text-grey cover-img rounded">
      <div class="bg-tint col-12 text-center rounded-top align-items-end">
        <div class="fs-3">{{ ticket.event.name }}</div>
        <!-- <p v-if="event.capacity == 0" class="event-gone align-self-end"> event is sold out</p> -->
      </div>
    </div>
  </RouterLink>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { RouterLink } from "vue-router";
export default {
  props: {
    ticket: {
      type: Object
    }
  },
  setup(props) {
    return {
      coverImg: computed(() => {
        if (!props.ticket.event.coverImg) { return 'url(https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZXZlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60)' }
        else { return `url(${props.ticket.event.coverImg})` }
      }),
    };
  },
  components: { RouterLink }
};
</script>


<style lang="scss" scoped>
.cover-img {
  height: 25vh;
  background-image: v-bind(coverImg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.bg-tint {
  height: fit-content;
  background-color: #63585e83;
}
</style>