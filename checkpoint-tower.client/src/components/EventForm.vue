<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="eventForm()" class=" row justify-content-around">
            <div class="mb-2">
              <label for="eventName" class="form-label">Event Name</label>
              <input type="text" class="form-control" id="eventName" v-model="state.name" aria-describedby="eventName">
              <div id="eventName" class="form-text">Event: {{ state.name }}</div>
            </div>
            <div class="mb-2">
              <label for="eventDisc" class="form-label">Describe your event</label>
              <input type="text" class="form-control" id="eventDisc" v-model="state.description"
                aria-describedby="eventDisc">
              <div id="eventDisc" class="form-text">Tell us what you are going to do </div>
            </div>
            <div class="mb-2">
              <label for="eventCoverImg" class="form-label">Event Picture</label>
              <input type="url" class="form-control" id="eventCoverImg" v-model="state.coverImg"
                aria-describedby="eventCoverImg">
              <img :src="state.coverImg" alt="" class="preview-img">
            </div>
            <div class="mb-2">
              <label for="eventCapacity" class="form-label">How Many people can go</label>
              <input type="number" class="form-control" id="eventCapacity" v-model="state.capacity"
                aria-describedby="eventCapacity">
              <div id="eventCapacity" class="form-text"></div>
            </div>
            <div class="mb-2 col-5">
              <label for="eventDate" class="form-label">When does this event start</label>
              <input type="date" class="form-control" id="eventDate" v-model="state.startDate"
                aria-describedby="eventDate">
              <div id="eventDate" class="form-text"></div>
            </div>
            <div class="col-5">
              <label for="eventType" class="form-label">What type of Event is this</label>
              <select v-model="state.type" id="eventType" class="form-select" aria-label="Default select example">
                <option selected value="sport">Sport</option>
                <option value="concert">Concert</option>
                <option value="convention">Convention</option>
                <option value="digital">Digital</option>
              </select>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn rounded-pill bg-dark text-secondary elevation-3"
                data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn rounded-pill bg-secondary text-dark elevation-3">Create Event</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref, watchEffect } from 'vue';
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { eventService } from "../services/EventService.js";
import { Modal } from 'bootstrap';
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    const state = ref({})
    const router = useRouter()
    const route = useRoute()
    watchEffect(() => {
      if (route.name == 'Events') {
        state.value = { ...AppState.activeEvent }
      } else { state.value = {} }
    })
    onMounted(() => logger.log(AppState.activeEvent))
    return {
      state,
      route,
      account: computed(() => AppState.account),

      async eventForm() {
        try {
          if (route.name == 'Events') {
            await eventService.editEvent(state.value)
            Modal.getOrCreateInstance('#exampleModal').hide()
          } else {
            const event = await eventService.createEvent(state.value)
            state.value = {}
            Modal.getOrCreateInstance('#exampleModal').hide()
            router.push({ name: 'Events', params: { eventId: event.id } })
          }
        }
        catch (error) {
          logger.log(error)
          Pop.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.preview-img {
  height: 20vh;
  object-fit: cover;
  object-position: center;
}
</style>