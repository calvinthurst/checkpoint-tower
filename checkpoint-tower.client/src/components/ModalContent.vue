<template>
  <!-- Modal -->
  <div class="modal fade" id="eventFormModal" tabindex="-1" aria-labelledby="eventFormModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title fs-5" id="eventFormModalLabel">Modal title</div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <EventForm />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import EventForm from "./EventForm.vue";
export default {
  setup() {
    return {};
  },
  components: { EventForm }
};
</script>


<style lang="scss" scoped>

</style>