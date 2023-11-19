<template>
  <div class="weather-card" v-if="Object.keys(cardData).length">
    <div class="weather-card__header">
      <h3 class="weather-card__title">
        {{ cardData.name }}, {{ cardData.sys.country }}
      </h3>
      <button
        @click="toggleFavorite"
        class="weather-card__favorite-btn"
        :class="{ 'weather-card__favorite-btn--active': getIsFavorites }"
      >
        &#9733;
      </button>
    </div>
    <div class="weather-card__content">
      <p class="weather-card__temperature" v-if="cardData.main.temp">
        {{ $t("temperature", { temp: kelvinToCelsius(cardData.main.temp) }) }}
      </p>
      <p class="weather-card__humidity" v-if="cardData.main.humidity">
        {{ $t("humidity", { humidity: cardData.main.humidity }) }}
      </p>
      <p class="weather-card__wind-speed" v-if="cardData.wind.speed">
        {{ $t("windSpeed", { speed: cardData.wind.speed }) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherCard",
  props: {
    cardData: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    getIsFavorites() {
      return this.cardData?.isFavorite;
    },
  },
  methods: {
    toggleFavorite() {
      this.$emit(
        this.getIsFavorites ? "remove-from-favorites" : "add-to-favorites",
      );
    },
  },
};
</script>

<style scoped>
.weather-card {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 16px;
  background: #fff;
}

.weather-card__header {
  display: flex;
  justify-content: space-between;
}

.weather-card__title {
  margin: 0;
}

.weather-card__favorite-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
}

.weather-card__favorite-btn--active {
  background-color: #f8d300;
}

.weather-card__content {
  margin-top: 16px;
}

.weather-card__temperature,
.weather-card__humidity,
.weather-card__wind-speed {
  margin: 0;
}
</style>
