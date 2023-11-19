<template>
  <div class="weather-blocks">
    <div
      v-for="cityWeather in citiesWeather"
      :key="cityWeather.id"
      class="weather-block"
    >
      <WeatherCard :card-data="cityWeather" />
    </div>
  </div>
</template>

<script>
import WeatherCard from "@/components/WeatherCard.vue";

export default {
  name: "WeatherBlocks",
  components: {
    WeatherCard,
  },
  props: {
    citiesWeather: Array,
  },
  methods: {
    removeCity(cityId) {
      const updatedCitiesWeather = this.citiesWeather.filter(
        (cityWeather) => cityWeather.id !== cityId,
      );
      this.$emit("update-cities-weather", updatedCitiesWeather);
    },
  },
};
</script>

<style scoped>
.weather-blocks {
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: space-around;
}

.weather-block {
  width: 100%;
}

.weather-block__remove-btn {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
