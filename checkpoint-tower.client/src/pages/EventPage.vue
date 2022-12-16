<template>
  <div v-if="events" class="col-11">
    <div class="row  m-1 justify-content-around cover-img rounded" :style="`background-image:url(${events.coverImg});`
    ">
      <div class="col-3 d-flex justify-content-between">
        <button v-if="account.id == events.creatorId && events.isCanceled == false" type="button"
          class="btn bg-dark elevation-3 text-primary m-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Edit Event
        </button>
        <EventForm />
        <button v-if="events.capacity > 0 && events.isCanceled == false && ticket" type="button"
          class="btn bg-dark elevation-3 text-primary m-2" @click="getTicket()">
          Get Ticket
        </button>
        <button v-else-if="!ticket" type="button" class="btn bg-dark elevation-3 text-primary m-2" disabled>
          Get Ticket
        </button>
        <button v-else type="button" class="btn bg-dark elevation-3 text-primary m-2" disabled>
          Get Ticket
        </button>
      </div>
      <div class="bg-tint col-10 text-grey">
        <h2>{{ events.name }}</h2>
        <h5>{{ events.description }}</h5>
        <p>This event is {{ time }}</p>
        <p>Spots Left: {{ events.capacity }}</p>
      </div>
      <div class="col-1">
        <button v-if="account.id == events.creatorId && events.isCanceled == false" type="button"
          @click="cancelEvent(events.id)" class="btn bg-light text-primary " alt="Cancel Event"><i
            class="mdi mdi-cancel"></i></button>
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
import { commentService } from "../services/CommentService.js";
import { ticketService } from "../services/TicketService.js";
import EventCard from "../components/EventCard.vue";
import EventForm from "../components/EventForm.vue";
import { format, render, cancel, register } from 'timeago.js';
export default {
  setup() {
    const route = useRoute()
    async function getEventById() {
      try {
        await eventService.getEventById(route.params.eventId);
      }
      catch (error) {
        logger.log(error);
        Pop.error(error);
      }
    }
    async function getCommentsById() {
      try {
        await commentService.getCommentsById(route.params.eventId)
      } catch (error) {
        logger.log(error)
        Pop.error(error)
      }
    }
    async function getTicketsById() {
      try {
        await ticketService.getTicketsById(route.params.eventId)
      } catch (error) {
        logger.log(error)
        Pop.error(error)
      }
    }
    watchEffect(() => AppState.activeEvent)
    onMounted(() => {
      getEventById();
      getCommentsById();
      getTicketsById();
    });

    return {
      time: computed(() => format(new Date(AppState.activeEvent.startDate))),
      events: computed(() => AppState.activeEvent),
      coverImg: computed(() => `url(${AppState.activeEvent})`),
      account: computed(() => AppState.account),
      ticket: computed(() => AppState.ticket.find(t => t.accountId == AppState.account.id)),
      async cancelEvent(eventId) {
        try {
          if (await Pop.confirm('Are you sure you want to cancel this event', "warning"))
            await eventService.cancelEvent(eventId)
        } catch (error) {
          logger.log(error)
          Pop.error(error)
        }
      },
      async getTicket() {
        try {
          await ticketService.getTicket({ eventId: AppState.activeEvent.id })
        } catch (error) {
          logger.log(error)
          Pop.error(error)
        }
      }
    };
  },
  components: { EventCard, EventForm }
};
</script>


<style lang="scss" scoped>
.cover-img {
  min-height: 45vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.bg-tint {
  background-color: #63585e83;
}
</style>