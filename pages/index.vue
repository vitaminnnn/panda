<template>
  <div class="main-wrapper">
    <CityAutocomplete @city-selected="addCityBlock" />
    <Loader v-if="isLoading" />
    <div v-for="(cityBlock, index) in weatherBlocks" :key="index">
      <MainCard
        :card-data="cityBlock"
        @remove-card="removeCityBlock(index)"
        @add-to-favorites="addToFavorites(cityBlock)"
        @remove-from-favorites="removeFromFavorites(cityBlock)"
      />
    </div>
  </div>
</template>

<script>
import MainCard from "@/components/MainCard.vue";
import CityAutocomplete from "~/components/CityAutocomplete.vue";
import { useWeatherStore } from "@/store/index.js";
import { useNotificationStore } from "@/store/notification.js";
import Loader from "~/components/ui/Loader.vue";

export default {
  name: "MainPage",
  components: {
    Loader,
    MainCard,
    CityAutocomplete,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    weatherBlocks() {
      return useWeatherStore().selectedCities;
    },
  },
  methods: {
    addCityBlock(city) {
      useWeatherStore().addCity(city);
    },
    removeCityBlock(index) {
      useWeatherStore().removeCity(index);
    },
    addToFavorites(cityBlock) {
      const favorites = useWeatherStore().selectedCities.filter(
        (city) => city.isFavorite,
      );
      if (favorites.length < 5) {
        useWeatherStore().addToFavorites({ ...cityBlock, isFavorite: true });
      } else {
        useNotificationStore().addToast({
          id: new Date().getTime(),
          message: this.$t("notification"),
          duration: 3000,
        });
      }
    },
    removeFromFavorites(cityBlock) {
      useWeatherStore().removeFromFavorites(cityBlock);
    },
  },
};
</script>

<style scoped>
.main-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
}
</style>
