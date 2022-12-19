<template>
  <div class="col-11">
    <div class="row rounded bg-info m-3 p-2 align-items-top">
      <img class="col-3 my-3" :src="account.picture" alt="" />
      <div class="col-9">
        <div class="fs-2">Welcome {{ account.name }}</div>
        <p>{{ account.email }}</p>
      </div>
    </div>
    <div class="row text-center">
      <div class="fs-3 mb-3">My Events:</div>
      <div v-for="e in myEvent" class="col-4 my-2">
        <EventCard :event="e" />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="fs-3 m-3">You Have Tickets For:</div>
      <div v-for="t in myTickets" class="col-11 my-2 ">
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
import { ticketService } from "../services/TicketService.js";
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
    async function getMyTickets() {
      try {
        await ticketService.getMyTickets(AppState.account.id)
      } catch (error) {
        logger.log(error)
        Pop.error(error)
      }
    }
    onMounted(() => {
      getMyEvents()
      getMyTickets()
    })
    return {
      account: computed(() => AppState.account),
      myEvent: computed(() => AppState.event.filter(e => e.creator.id == AppState.account.id)),
      myTickets: computed(() => AppState.myTickets)
    };
  },
  components: { EventCard, TicketCard }
}
</script>

<style scoped>
img {
  object-fit: contain;

}
</style>
