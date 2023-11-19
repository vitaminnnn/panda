import { defineStore } from "pinia";

export const useWeatherStore = defineStore("weather", {
  // store.js
  import { defineStore } from 'pinia';
  import axios from 'axios';

  export const useWeatherStore = defineStore({
    state: () => ({
      searchTerm: '',
      cities: [],
      showResults: false,
    }),
    getters: {
      hasSearchTerm: (state) => state.searchTerm.length >= 3,
    },
    actions: {
      async searchCities() {
        if (this.hasSearchTerm) {
          try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/find?q=${this.searchTerm}&appid=c9c191ce59409b831172c818e8eec152`,
            );
            this.cities = response.data.list;
            this.showResults = true;
          } catch (error) {
            console.error('Error fetching cities:', error);
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
        this.searchTerm = '';
        this.showResults = false;

      },
    },
  });

});
