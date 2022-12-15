<template>
  <div v-if="events" class="col-11">
    <div class="row  m-1 justify-content-around cover-img">
      <button v-if="account.id == events.creatorId && events.isCanceled == false" type="button"
        class="col-2 btn bg-dark elevation-3 text-primary m-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Edit Event
      </button>
      <EventForm />
      <div class="bg-tint col-10 text-grey">
        <h2>{{ events.name }}</h2>
        <h5>{{ events.description }}</h5>
        <p>{{ events.startDate }}</p>
      </div>
      <div class="col-1">
        <button v-if="account.id == events.creatorId" type="button" @click="cancelEvent"
          class="btn bg-light text-primary "><i class="mdi mdi-trash-can-outline"></i></button>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect } from 'vue';
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { eventService } from "../services/EventService.js";
import EventCard from "../components/EventCard.vue";
import EventForm from "../components/EventForm.vue";
import { format } from "path";
export default {
  setup() {
    const route = useRoute();
    let coverImg = ''
    async function getEventById() {
      try {
        await eventService.getEventById(route.params.eventId);
      }
      catch (error) {
        logger.log(error);
        Pop.error(error);
      }
    }
    watchEffect(() => {
      if (AppState.activeEvent) {
        coverImg = `url(${AppState.activeEvent.coverImg})`
        events.start
      }
    }, {

    })
    onMounted(() => {
      getEventById();
    });

    return {
      coverImg,
      events: computed(() => AppState.activeEvent),
      account: computed(() => AppState.account),
    };
  },
  components: { EventCard, EventForm }
};
</script>


<style lang="scss" scoped>
.cover-img {
  max-height: 35vh;
  background-image: v-bind(coverImg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  opacity: .6;

}

.bg-tint {
  background-color: #63585e83;
}
</style>