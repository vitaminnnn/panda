import { defineStore } from "pinia";
import axios from "axios";
import { API_KEYS } from "~/constants/index.js";

export const useWeatherStore = defineStore("weatherStore", {
  state: () => ({
    cities: [],
    selectedCities: [],
    weatherList: [],
    isLoading: false,
    averageTemp: 0,
  }),
  actions: {
    async getUserLocation() {
      this.isLoading = true;
      try {
        const locationResponse = await axios.get(
          `https://ipinfo.io?token=${API_KEYS.token}`,
        );
        const { city, country } = locationResponse.data;
        await this.setCityFromIp(city, country);
      } catch (error) {
        console.error("Error fetching user location:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async searchCities(searchTerm, lang) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${searchTerm}&lang=${lang}&appid=${API_KEYS.weather}`,
        );
        this.cities = response.data.list;
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    },
    async setCityFromIp(city, country) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${city},${country}&appid=${API_KEYS.weather}`,
        );

        const cityData = response.data.list[0];
        this.updateSelectedCities(cityData);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    },
    addToSelectedCities(cityData) {
      this.selectedCities.push(cityData);
      this.saveToLocalStorage();
    },
    updateAverageTemp(temp, id) {
      if (!this.selectedCities.length) return;
      const cityIndex = this.selectedCities.findIndex((city) => city.id === id);
      if (cityIndex !== -1) {
        this.selectedCities[cityIndex] = {
          ...this.selectedCities[cityIndex],
          main: {
            ...this.selectedCities[cityIndex].main,
            temp: temp,
          },
        };
      }
    },
    removeFromSelectedCities(cityData) {
      const index = this.selectedCities.findIndex(
        (city) => city.id === cityData.id,
      );

      if (index !== -1) {
        this.selectedCities.splice(index, 1);
        this.saveToLocalStorage();
      }
    },
    addCity(city) {
      const existingCity = this.selectedCities.find(
        (selectedCity) => selectedCity.id === city.id,
      );

      if (!existingCity) {
        this.addToSelectedCities(city);
      }
    },
    updateSelectedCities(cityData) {
      const existingIndex = this.selectedCities.findIndex(
        (item) => item.id === cityData.id,
      );

      if (existingIndex !== -1) {
        this.selectedCities[existingIndex] = {
          ...cityData,
          ...this.selectedCities[existingIndex],
        };
      } else {
        this.addToSelectedCities(cityData);
      }
    },
    removeCity(index) {
      this.removeFromSelectedCities(this.selectedCities[index]);
    },
    saveToLocalStorage() {
      localStorage.setItem(
        "selectedCities",
        JSON.stringify(this.selectedCities),
      );
    },
    loadFromLocalStorage() {
      const storedCities = localStorage.getItem("selectedCities");
      this.selectedCities = storedCities ? JSON.parse(storedCities) : [];
    },
    addToFavorites(cityData) {
      const existingCity = this.selectedCities.find(
        (selectedCity) => selectedCity.id === cityData.id,
      );

      if (!existingCity) {
        this.addToSelectedCities(cityData);
      } else {
        existingCity.isFavorite = true;
        this.saveToLocalStorage();
      }
    },
    removeFromFavorites(cityData) {
      const existingCity = this.selectedCities.find(
        (selectedCity) => selectedCity.id === cityData.id,
      );

      if (existingCity) {
        existingCity.isFavorite = false;
        this.saveToLocalStorage();
      }
    },
  },
});
