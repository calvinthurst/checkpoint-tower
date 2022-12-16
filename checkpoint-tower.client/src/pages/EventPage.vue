<template>
  <div v-if="events" class="col-11">
    <div class="row  m-1 justify-content-around cover-img rounded" :style="`background-image:url(${events.coverImg});`
    ">
      <div class="col-12">
        <div class="row   justify-content-between">

          <button v-if="account.id == events.creatorId && events.isCanceled == false" type="button"
            class="btn col-2 bg-dark elevation-3 text-primary m-2 opacity-75" data-bs-toggle="modal"
            data-bs-target="#exampleModal">
            Edit Event
          </button>
          <EventForm />
          <div v-if="events.isCanceled == true"
            class="col-2 rounded bg-dark elevation-3 text-primary m-2 text-center  opacity-75">
            EVENT CANCELED OR SOLD OUT
          </div>
          <button v-else-if="account.id && !myTicket" type="button"
            class="btn col-2 bg-dark elevation-3 text-primary m-2  opacity-75" v-on:click="createTicket()">
            Get Ticket
          </button>
          <button v-else-if="account.id" type="button"
            class="btn col-2 bg-dark elevation-3 text-primary m-2  opacity-75" @click="deleteTicket(myTicket)">
            Get Rid of Ticket
          </button>

        </div>
      </div>
      <div class="bg-tint col-10 text-grey">
        <h2>{{ events.name }}</h2>
        <h5>{{ events.description }}</h5>
        <p>This event is {{ time }}</p>
        <p>Spots Left: {{ events.capacity }}</p>
        <img v-for="t in ticket" :src="t.profile.picture" :alt="t.profile.name" class="ticket-pic rounded-circle">
      </div>
      <div class="col-2">

        <div class="btn bg-light text-primary  opacity-90" @click="cancelEvent(events.id)">
          <button v-if="account.id == events.creatorId && events.isCanceled == false" type="button"
            class="btn bg-light text-primary " alt="Cancel Event">Cancel your event here
            <i class="mdi mdi-cancel "></i>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="col-11">
    <div class="row  justify-content-around">
      <CommentForm />
      <div v-if="!comments" class="row  justify-content-around">
        <div class="col-11 card rounded bg-light text-body-bg fs-3 m-1">
          No comments on this event yet
        </div>
      </div>
      <div v-else>
        <CommentCard v-for="c in comments" :comment="c" />
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
import CommentForm from "../components/CommentForm.vue";
import { Account } from "../models/Account.js";
import CommentCard from "../components/CommentCard.vue";
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
    watchEffect(() => {
      AppState.ticket,
        AppState.activeEvent,
        AppState.account
    })
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
      ticket: computed(() => AppState.ticket),
      comments: computed(() => AppState.comment),
      myTicket: computed(() => AppState.ticket.find(t => t.accountId == AppState.account.id)),
      async cancelEvent(eventId) {
        try {
          if (await Pop.confirm('Are you sure you want to cancel this event', "warning"))
            await eventService.cancelEvent(eventId)
        } catch (error) {
          logger.log(error)
          Pop.error(error)
        }
      },
      async createTicket() {
        try {
          await ticketService.createTicket({ eventId: AppState.activeEvent.id })
          AppState.activeEvent.capacity--
        } catch (error) {
          logger.log(error)
          Pop.error(error)
        }
      },
      async deleteTicket(ticketId) {
        try {
          await ticketService.deleteTicket(ticketId)
          AppState.activeEvent.capacity++
        } catch (error) {
          logger.log(error)
          Pop.error(error)
        }
      }
    };
  },
  components: { EventCard, EventForm, CommentForm, CommentCard }
};
</script>


<style lang="scss" scoped>
.ticket-pic {
  height: 5vh;
  object-fit: cover;
}

.cover-img {
  min-height: 30vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.bg-tint {
  background-color: #63585e83;
}
</style>