<template>
  <div id="myDiv" class="container">
    <h1>Reservation page</h1>

    <table id="myTable" class="table table-hover table-sm mt-5">
      <thead>
        <tr>
          <th>#</th>
          <th>Event</th>
          <th>Start</th>
          <th>End</th>
          <th>Duration</th>
          <th>Reservation</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in availibilities" :key="item[0]">
          <td>{{ item[0] }}</td>
          <td>{{ item[1] }}</td>
          <td>{{ item[2].slice(0, 10) }} at {{ item[2].slice(11, 16) }}</td>
          <td>{{ item[3].slice(0, 10) }} at {{ item[3].slice(11, 16) }}</td>
          <td>{{ item[4] }}</td>

          <td>
            <div>
              <Modal @close="toggleModal" :modalActive="modalActive">
                <div class="modal-content">
                  <form @submit="submitForm()">
                    <div class="fields-container">
                      <label for="start">Start *</label>

                      <input
                        v-show="showStart"
                        type="text"
                        id="start"
                        disabled
                        v-model="formValues.start"
                      />

                      <input
                        v-show="!showStart"
                        type="datetime-local"
                        id="start"
                        v-model="formValues.start"
                      />
                      <img
                        @click="handleStart"
                        v-show="!showStart"
                        src="/icons/redo_icon.png"
                      />
                      <img
                        @click="handleStart"
                        v-show="showStart"
                        class="edit-icon"
                        src="/icons/edit_iconn.png"
                      />
                    </div>

                    <div class="fields-container">
                      <label for="end">End *</label>
                      <input
                        v-show="showEnd"
                        type="text"
                        id="end"
                        disabled
                        v-model="formValues.end"
                      />

                      <input
                        v-show="!showEnd"
                        type="datetime-local"
                        class="datepicker"
                        id="end"
                        v-model="formValues.end"
                      />
                      <img
                        @click="handleEnd"
                        v-show="!showEnd"
                        src="/icons/redo_icon.png"
                      />
                      <img
                        @click="handleEnd"
                        v-show="showEnd"
                        class="edit-icon"
                        src="/icons/edit_iconn.png"
                      />
                    </div>

                    <div class="fields-container">
                      <label for="email">Email *</label>
                      <input
                        type="text"
                        id="email"
                        required
                        v-model="formValues.email"
                      />
                    </div>

                    <div>
                      <button>Submit</button>
                    </div>
                  </form>
                </div>
              </Modal>
              <div @click="changeFormId(item[0], item[2], item[3])">
                <button @click="toggleModal" type="button">Reservation</button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="return-container">
      <router-link to="/events" class="btn btn-info btn-sm"
        >Other Events</router-link
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Modal from "../components/reservation/reserv-Modall-component.vue";
import { ref } from "vue";

export default {
  name: "reservation-page",
  components: {
    Modal,
  },
  data() {
    const modalActive = ref(false);
    const showStart = ref(true);
    const showEnd = ref(true);
    let formId;
    const toggleModal = () => {
      console.log("toggle modal", modalActive.value);
      modalActive.value = !modalActive.value;
      console.log("toggle modal end:", modalActive.value);
    };

    const handleStart = () => {
      showStart.value = !showStart.value;
      console.log(showStart);
    };

    const handleEnd = () => {
      showEnd.value = !showEnd.value;
      console.log(showEnd);
    };

    return {
      availibilities: [],
      modalActive,
      toggleModal,
      showStart,
      handleStart,
      handleEnd,
      showEnd,
      formId,
      formValues: {
        start: "",
        end: "",
        duration: "",
        email: "",
      },
    };
  },

  async mounted() {
    let result = await axios.get(
      `http://localhost:8081/giskard/event/availableSlots/${this.$route.params.id}`
    );
    console.log("result.data:", result.data);
    this.availibilities = result.data;
  },
  methods: {
    async submitForm() {
      console.log("formValues", this.formValues);
      const result = await axios.post(
        `http://localhost:8081/giskard/reservation/addToAvailibility/${this.formId}`,
        this.formValues
      );
      console.log("result.status:", result.status);
    },

    async changeFormId(id, start, end) {
      this.formId = id;
      console.log("formId: ", this.formId);
      this.formValues.start = start;
      this.formValues.end = end;

      console.log("formValues: ", this.formValues);
    },
  },
};
</script>
<style lang="scss" scoped>
.return-container {
  display: flex;
  justify-content: flex-end;
}
.modal-container {
  display: flex;
  justify-content: center;
  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.fields-container {
  display: flex;
  flex-direction: row;
  height: 35px;
  label {
    color: black;
    font-weight: bold;
    line-height: 24px;
    font-size: 15px;
    display: block;
    width: 100px;
  }
  p {
    color: black;
    line-height: 24px;
    float: right;
    padding-left: 20px;
  }
  input {
    width: 280px;
    border: 1px solid rgb(225, 222, 222, 1.7);
  }
  img {
    align-self: center;
    width: 18px;
    height: 18px;
  }
}
.edit-icon {
  margin-left: -22px;
}
</style>
