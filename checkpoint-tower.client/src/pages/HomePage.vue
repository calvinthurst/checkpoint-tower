<template>
  <div class="row container-fluid">
    <div class="col-11 border rounded p-3 d-flex mx-2 my-5 seats">
      <div class="col-6 text-info opacity-100 fs-3 ">
        Get ahead of the scalpers. Reserve your seat now with real events for real people.
      </div>
    </div>
    <div class="row">
      <div class="col-11 bg-secondary p-3 rounded d-flex justify-content-around ms-3">
        <button @click="filterBy = ''" class="btn rounded-pill bg-info elevation-3">All</button>
        <button @click="filterBy = 'sport'" class="btn rounded-pill bg-info elevation-3">Sports</button>
        <button @click="filterBy = 'concert'" class="btn rounded-pill bg-info elevation-3">Concerts</button>
        <button @click="filterBy = 'convention'" class="btn rounded-pill bg-info elevation-3">Convention</button>
        <button @click="filterBy = 'digital'" class="btn rounded-pill bg-info elevation-3">Digital</button>
      </div>
    </div>
    <div class="col-11 ">
      <div class="row justify-content-around">
        <div v-for="e in events" class="col-4 mt-3">
          <EventCard :event="e" />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { AppState } from '../AppState.js';
import EventCard from "../components/EventCard.vue";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { eventService } from '../services/EventService.js';
import { onMounted } from "vue";
import { computed, ref } from "@vue/reactivity";


export default {
  setup() {
    const filterBy = ref("");
    async function getEvents() {
      try {
        await eventService.getEvents();
      } catch (error) {
        logger.log(error)
        Pop.error(error)
      }
    }
    onMounted(() => {
      getEvents();
    })
    return {
      filterBy,
      account: computed(() => AppState.account),
      events: computed(() => {
        if (filterBy.value == '') {
          return AppState.event;
        } else {
          return AppState.event.filter(e => e.type == filterBy.value);
        }
      })
    };
  },
  components: { EventCard }
}
</script>

<style scoped lang="scss">
.seats {
  height: 20vh;
  background-image: url('https://media.istockphoto.com/id/1219322560/photo/empty-chairs-in-large-conference-hall-for-corporate-convention-or-lecture.jpg?b=1&s=170667a&w=0&k=20&c=8Fx-8AnAla8Ba2SPQ-BO2uU2PVPhpXKIV1iLGpZgras=');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: .6
}
</style>
