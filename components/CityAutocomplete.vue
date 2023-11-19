<template>
  <div class="city-autocomplete">
    <div class="input-wrapper">
      <input
        v-model="searchTerm"
        @input="searchCities"
        placeholder="Search for a city..."
        class="city-autocomplete__input"
      />
      <span v-if="searchTerm" class="clear-input-btn" @click="clearInput"
        >&times;</span
      >
    </div>

    <transition name="fade">
      <ul v-show="showResults" class="city-autocomplete__results">
        <li



          v-for="city in cities"
          :key="city.id"
          @click="selectCity(city)"
          class="city-autocomplete__result"
        >
          {{ city.name }}, {{ city.sys.country }}
        </li>
      </ul>
    </transition>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      searchTerm: "",
      cities: [],
      showResults: false,
    };
  },
  methods: {
    async searchCities() {
      if (this.searchTerm.length >= 3) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/find?q=${this.searchTerm}&appid=c9c191ce59409b831172c818e8eec152`,
          );
          this.cities = response.data.list;
          this.showResults = true;
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      } else {
        this.showResults = false;
      }
    },
    selectCity(city) {
      this.searchTerm = `${city.name}, ${city.sys.country}`;
      this.showResults = false;
    },
    clearInput() {
      this.searchTerm = "";
      this.showResults = false;
    },
  },
};
</script>

<style scoped>
.city-autocomplete {
  position: relative;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.city-autocomplete__input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.clear-input-btn {
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 18px;
  color: #888;
}

.city-autocomplete__results {
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ddd;
  border-top: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
}

.city-autocomplete__result {
  padding: 10px;
  cursor: pointer;
}

.city-autocomplete__result:hover {
  background-color: #f0f0f0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
