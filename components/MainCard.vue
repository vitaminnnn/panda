<template>
  <div class="main-card">
    <WeatherCard
      :card-data="cardData"
      @add-to-favorites="addToFavorites"
      @remove-from-favorites="removeFromFavorites"
    />
    <WeatherChart :card-data="cardData" />
    <CustomButton
      class="main-card__button"
      type="red"
      @click="showConfirmationModal"
    >
      {{ $t("remove") }}</CustomButton
    >
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
import CustomButton from "~/components/ui/CustomButton.vue";

export default {
  name: "MainCard",
  props: {
    cardData: {
      type: Object,
      default: () => {},
    },
  },
  components: { CustomButton, WeatherChart, WeatherCard, ConfirmationModal },
  data() {
    return {
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
.main-card__button {
  width: 100%;
}
</style>
