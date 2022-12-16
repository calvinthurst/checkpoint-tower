<template>
  <div class="row container-fluid">
    <RouterLink :to="{ name: 'Events', params: { eventId: event.id } }">
      <div class="text-grey cover-img rounded">
        <div class="bg-tint col-12 text-center rounded-top align-items-end">
          <h3>{{ event.name }}</h3>
          <p v-if="event.isCanceled || event.capacity == 0" class="event-gone align-self-end"> event is canceled</p>
          <p v-if="event.capacity == 0" class="event-gone align-self-end"> event is sold out</p>
        </div>
      </div>
    </RouterLink>
  </div>

</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect } from 'vue';
import { RouterLink, useRoute } from "vue-router";
export default {
  props: {
    event: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()

    return {
      route,
      coverImg: computed(() => {
        if (!props.event.coverImg) { return 'url(https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZXZlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60)' }
        else { return `url(${props.event.coverImg})` }
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

.event-gone {
  background-color: rgba(218, 85, 85, 0.632);
}
</style>