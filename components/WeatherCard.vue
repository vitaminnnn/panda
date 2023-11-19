<template>
  <div class="weather-card">
    <div class="weather-card__header">
      <h3>{{ city }}, {{ country }}</h3>
      <button @click="toggleFavorite" :class="{ 'favorite-btn': isFavorite }">&#9733;</button>
    </div>
    <div class="weather-card__content">
      <p>Temperature: {{ temperature }}°C</p>
      <p>Humidity: {{ humidity }}%</p>
      <p>Wind Speed: {{ windSpeed }} m/s</p>
      <!-- Додайте інші властивості погоди, якщо потрібно -->
    </div>
    <div class="weather-card__actions" v-if="isFavorite">
      <button @click="removeСard">Remove from Favorites</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    city: String,
    country: String,
    temperature: Number,
    humidity: Number,
    windSpeed: Number,
    // Додайте інші властивості погоди, якщо потрібно
  },
  data() {
    return {
      isFavorite: false,
    };
  },
  methods: {
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
      if (this.isFavorite) {
        this.$emit('add-to-favorites', {
          city: this.city,
          country: this.country,
          temperature: this.temperature,
          humidity: this.humidity,
          windSpeed: this.windSpeed,
          // Додайте інші властивості погоди, якщо потрібно
        });
      } else {
        this.$emit('remove-from-favorites');
      }
    },
    removeСard() {
      this.$emit('remove-card');
    },
  },
};
</script>

<style scoped>
.weather-card {
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
}

.weather-card__header {
  display: flex;
  justify-content: space-between;
}

.weather-card__header h3 {
  margin: 0;
}

.favorite-btn {
  background-color: #f8d300;
  border: none;
  padding: 5px;
  cursor: pointer;
}

.weather-card__actions {
  margin-top: 10px;
}

.weather-card__actions button {
  background: none;
  border: none;
  cursor: pointer;
  color: #f8d300;
  text-decoration: underline;
}
</style>
