<template>
  <div id="app">
    <CityAutocomplete />
    <WeatherCard />
    <template v-if="activeTab === 'currentWeather'">
      <WeatherBlocks :citiesWeather="currentCitiesWeather" />
    </template>
    <template v-else-if="activeTab === 'favorites'">
      <Favorites
        :favoriteCitiesWeather="favoriteCitiesWeather"
        @remove-favorite-city="removeFavoriteCity"
      />
    </template>
  </div>
</template>

<script>
import CityAutocomplete from "@/components/CityAutocomplete.vue";
import WeatherCard from "@/components/WeatherCard.vue";
import WeatherBlocks from "@/components/WeatherBlocks.vue";
import Favorites from "@/components/Favorites.vue";

export default {
  name: "MainPage",
  components: {
    CityAutocomplete,
    WeatherCard,
    WeatherBlocks,
    Favorites,
  },
  data() {
    return {
      activeTab: "currentWeather",
      currentCitiesWeather: [], // Дані поточної погоди
      favoriteCitiesWeather: [], // Обрані міста
    };
  },
  methods: {
    // Логіка для додавання/видалення обраних міст
    addFavoriteCity(city) {
      if (this.favoriteCitiesWeather.length < 5) {
        this.favoriteCitiesWeather.push(city);
        this.saveFavorites();
      } else {
        // Показати модальне вікно про досягнення максимуму
        alert("Максимальна кількість обраних міст - 5");
      }
    },
    removeFavoriteCity(cityId) {
      this.favoriteCitiesWeather = this.favoriteCitiesWeather.filter(
        (city) => city.id !== cityId,
      );
      this.saveFavorites();
    },
    // Збереження обраних міст у локальному сховищі
    saveFavorites() {
      localStorage.setItem(
        "favoriteCitiesWeather",
        JSON.stringify(this.favoriteCitiesWeather),
      );
    },
    // Завантаження обраних міст з локального сховища при старті
    loadFavorites() {
      const savedFavorites = localStorage.getItem("favoriteCitiesWeather");
      this.favoriteCitiesWeather = savedFavorites
        ? JSON.parse(savedFavorites)
        : [];
    },
  },
  // created() {
  //   this.loadFavorites();
  // },
};
</script>
