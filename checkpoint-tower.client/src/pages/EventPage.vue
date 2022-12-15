<template>
  <div v-if="events" class="col-11">
    <div class="row container-fluid m-1">
      <img :src="events.coverImg" class="cover-img" alt="">
      <div class="bg-tint col-12 text-center text-grey">
        <h2>{{ events.name }}</h2>
        <h5>{{ events.description }}</h5>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { eventService } from "../services/EventService.js";
import EventCard from "../components/EventCard.vue";
export default {
  setup() {
    const route = useRoute();
    async function getEventById() {
      try {
        await eventService.getEventById(route.params.eventId);
      }
      catch (error) {
        logger.log(error);
        Pop.error(error);
      }
    }
    onMounted(() => {
      getEventById();
    });
    return {
      events: computed(() => AppState.activeEvent),
    };
  },
  components: { EventCard }
};
</script>


<style lang="scss" scoped>
.cover-img {
  max-height: 35vh;
  object-fit: cover;
  object-position: center;

}

.bg-tint {
  height: 16vh;
  background-color: #63585e83;
  transform: translateY(-15vh);
}
</style>