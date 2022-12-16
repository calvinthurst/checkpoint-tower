<template>
  <div class="col-11 card rounded bg-light text-body-bg fs-3 m-1">
    <div class="row align-items-center">
      <div class="col-3">
        <img :src="comment.creator.picture" class="creator-img rounded-circle m-1 p-0"
          :alt="`${comment.creator.name}'s Profile'`">
      </div>
      <div class="col-8">
        <h4>{{ comment.creator.name }}</h4>
      </div>
      <div v-if="account" class="col-1 justify-content-end d-flex selectable">
        <i class="mdi mdi-trash-can p-1" @click="removeComment(comment.id)"></i>
      </div>
    </div>
    <div class="col-12">
      <h3>{{ comment.body }}</h3>
    </div>
    <div v-if="comment.isAttending" class="col-12">
      <small>is going to this event</small>
    </div>
    <div v-else class="col-12">
      <small>is not going to this event</small>
    </div>

  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { commentService } from "../services/CommentService.js";
export default {
  props: {
    comment: {
      type: Object
    }
  },
  setup(props) {

    return {
      account: computed(() => AppState.account),
      async removeComment(commentId) {
        try {
          await commentService.removeComment(commentId)
        } catch (error) {
          logger.log(error)
          Pop.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.creator-img {
  height: 5vh;
  width: 5vh;
  object-fit: cover;
  object-position: center;
}
</style>