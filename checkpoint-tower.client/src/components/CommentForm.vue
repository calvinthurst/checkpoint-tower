<template>
  <button class="btn col-2 bg-light elevation-3 text-primary m-2" type="button" data-bs-toggle="collapse"
    data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    Create a Comment
  </button>
  <div class="collapse" id="collapseExample">
    <div class="card bg-secondary m-3  col-11">
      <div class="mb-3 row justify-content-center">
        <form @submit.prevent="createComment()" action="" class="col-11 align-items-center">
          <label for="body" class="form-label">Comments</label>
          <textarea name="" id="" class="form-control " v-model="state.body" rows="2"></textarea>
          <div class="m-2 d-flex align-items-center">
            <input class="form-check-input mx-1" type="checkbox" v-model="state.isAttending"
              id="flexSwitchCheckDefault">
            <label class="form-check-label mar" for="flexSwitchCheckDefault">Are you going?</label>
            <button type="submit" class="btn outline-btn-success col-3 offset-6 fw-bold ">Comment <i
                class="mdi mdi-pencil-outline"></i></button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { commentService } from "../services/CommentService.js";
import { useRoute } from "vue-router";
export default {
  setup() {
    const state = ref({})
    const route = useRoute()

    return {
      state,
      route,
      myTicket: computed(() => { if (AppState.ticket.filter(t => t.accountId == AppState.account.id)) { true } }),
      async createComment() {
        try {
          state.value.eventId = route.params.eventId
          await commentService.createComment(state.value)
          state.value = {}
        } catch (error) {
          logger.log(error)
          Pop.error(error)
        }
      },
    }
  }
};
</script>


<style lang="scss" scoped>
.mar {
  margin: auto;
}
</style>