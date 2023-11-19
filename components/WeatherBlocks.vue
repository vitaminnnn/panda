<template>
  <div class="weather-blocks">
    <div
      v-for="cityWeather in citiesWeather"
      :key="cityWeather.id"
      class="weather-block"
    >
      <WeatherCard
        :city="cityWeather.city"
        :country="cityWeather.country"
        :temperature="cityWeather.temperature"
        :humidity="cityWeather.humidity"
        :wind-speed="cityWeather.windSpeed"
      />
    </div>
  </div>
</template>

<script>
import WeatherCard from "@/components/WeatherCard.vue";

export default {
  components: {
    WeatherCard,
  },
  // props: {
  //   citiesWeather: Array,
  // },
  data() {
    return {
      citiesWeather: [
        {
          id: 1,
          city: "Kyiv",
          country: "UA",
          temperature: 22,
          humidity: 60,
          windSpeed: 3,
        },
        {
          id: 2,
          city: "Paris",
          country: "FR",
          temperature: 18,
          humidity: 75,
          windSpeed: 5,
        },
        {
          id: 3,
          city: "New York",
          country: "US",
          temperature: 25,
          humidity: 55,
          windSpeed: 7,
        },
      ],
    };
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
