<template>
  <div class="main-card">
    <WeatherCard
      :card-data="cardData"
      @add-to-favorites="addToFavorites"
      @remove-from-favorites="removeFromFavorites"
    />
    <WeatherChart :card-data="cardData" />
    <button @click="showConfirmationModal" class="remove-button">
      {{ $t("remove") }}
    </button>
    <ConfirmationModal
      :showModal="showModal"
      @confirm-delete="confirmDelete"
      @cancel-delete="cancelDelete"
    />
  </div>
</template>

<script>
import WeatherChart from "@/components/WeatherChart.vue";
import WeatherCard from "@/components/WeatherCard.vue";
import ConfirmationModal from "@/components/ui/ConfirmationModal.vue";

export default {
  name: "MainCard",
  props: {
    cardData: {
      type: Object,
      default: () => {},
    },
  },
  components: { WeatherChart, WeatherCard, ConfirmationModal },
  data() {
    return {
      activeTab: "day",
      showModal: false,
    };
  },
  methods: {
    showConfirmationModal() {
      this.showModal = true;
    },
    confirmDelete() {
      this.$emit("remove-card", this.cardData);
      this.hideModal();
    },
    cancelDelete() {
      this.hideModal();
    },
    hideModal() {
      this.showModal = false;
    },
    addToFavorites() {
      this.$emit("add-to-favorites");
    },
    removeFromFavorites() {
      this.$emit("remove-from-favorites");
    },
  },
};
</script>

<style scoped>
.main-card {
  max-width: 1200px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 16px;
  background-color: #fff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.remove-button {
  margin-top: 10px;
  padding: 10px;
  background-color: #ff0000; /* Red background color, you can change it */
  color: #fff; /* White text color */
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #cc0000; /* Darker red background color on hover */
}
</style>
