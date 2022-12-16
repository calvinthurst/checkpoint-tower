<template>
  <div class="col-11">
    <div class="row rounded bg-secondary m-3">
      <img class="col-3 my-3" :src="account.picture" alt="" />
      <div class="col-9">
        <h1>Welcome {{ account.name }}</h1>
        <p>{{ account.email }}</p>
      </div>
    </div>
    <div class="row">
      <h3 class="">My Events:</h3>
      <div v-for="e in myEvent" class="col-4 ">
        <EventCard :event="e" />
      </div>
    </div>
    <div class="row">
      <h3 class="">My Tickets:</h3>
      <div v-for="t in myTickets" class="col-4 ">
        <TicketCard :ticket="t" />
      </div>
    </div>

  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import EventCard from "../components/EventCard.vue";
import TicketCard from "../components/TicketCard.vue";
import { eventService } from "../services/EventService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
export default {
  setup() {
    async function getMyEvents() {
      try {
        await eventService.getEvents();
      } catch (error) {
        logger.log(error)
        Pop.error(error)
      }
    }
    onMounted(() => getMyEvents())
    return {
      account: computed(() => AppState.account),
      myEvent: computed(() => AppState.event.filter(e => e.creator.id == AppState.account.id)),
      myTickets: computed(() => AppState.ticket.filter(t => t.accountId == AppState.account.id))
    };
  },
  components: { EventCard, TicketCard }
}
</script>

<style scoped>
img {
  object-fit: cover;

}
</style>
