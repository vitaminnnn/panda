<template>
  <div v-for="cityData in favoriteCities" :key="cityData.id" class="favorites">
    <WeatherCard
      :card-data="cityData"
      @remove-from-favorites="removeFromFavorites(cityData)"
    />
  </div>
</template>

<script>
import WeatherCard from "@/components/WeatherCard.vue";
import { useWeatherStore } from "@/store/index.js";

export default {
  components: {
    WeatherCard,
  },
  computed: {
    favoriteCities() {
      return useWeatherStore().selectedCities.filter((city) => city.isFavorite);
    },
  },
  methods: {
    removeFromFavorites(cityData) {
      useWeatherStore().removeFromFavorites(cityData);
    },
  },
};
</script>

<style scoped>
.favorites {
  margin-bottom: 12px;
}
</style>
