<template>
  <div class="city-autocomplete">
    <input
      v-model="searchTerm"
      @input="searchCitiesDebounced"
      :placeholder="$t('autocomplete.placeholder')"
      class="city-autocomplete__input"
    />
    <span v-if="searchTerm" class="clear-input-btn" @click="clearInput"
      >&times;</span
    >
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
import { useWeatherStore } from "@/store/index.js";
import debounce from "@/utils/debounce.js";

export default {
  name: "CityAutocomplete",
  data() {
    return {
      searchTerm: "",
      showResults: false,
    };
  },
  computed: {
    cities() {
      return useWeatherStore().cities;
    },
  },
  methods: {
    searchCitiesDebounced: function (searchTerm) {
      debounce(() => {
        this.searchCities(searchTerm.target.value);
      }, 300)();
    },
    searchCities(searchTerm) {
      if (searchTerm.length >= 3) {
        useWeatherStore().searchCities(searchTerm, this.$i18n.locale);
        this.showResults = true;
      } else {
        this.showResults = false;
      }
    },
    selectCity(city) {
      this.searchTerm = `${city.name}, ${city.sys.country}`;
      this.$emit("city-selected", city);
      this.clearInput();
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
  width: 100%;
  position: relative;
}

.city-autocomplete__input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.clear-input-btn {
  position: absolute;
  top: 50%;
  right: 16px;
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
