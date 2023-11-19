<template>
  <div class="weather-chart">
    <div class="weather-chart__toggle-buttons">
      <CustomButton
        @click="debouncedSwitchView(DAY_TABS.day)"
        :class="{ active: view === DAY_TABS.day }"
        :disabled="isDisabled"
      >
        {{ $t("day") }}</CustomButton
      >
      <CustomButton
        @click="debouncedSwitchView(DAY_TABS.days)"
        :class="{ active: view === DAY_TABS.days }"
        :disabled="isDisabled"
      >
        {{ $t("5days") }}</CustomButton
      >
    </div>
    <h2>{{ title }}</h2>
    <canvas ref="temperatureChart" width="400" height="200"></canvas>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js/auto";
import { DAY_TABS } from "@/constants/index.js";
import { useWeatherStore } from "@/store/index.js";
import kelvinToCelsius from "@/utils/kelvinToCelsius.js";
import debounce from "@/utils/debounce.js";
import CustomButton from "~/components/ui/CustomButton.vue";

export default {
  name: "WeatherChart",
  components: { CustomButton },
  props: {
    cardData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      view: "day",
      dailyWeather: [],
      todayWeather: [],
      weatherChart: null,
      isDisabled: false,
    };
  },
  computed: {
    DAY_TABS() {
      return DAY_TABS;
    },
    title() {
      return this.view === this.DAY_TABS.day
        ? this.$t("titleDay")
        : this.$t("title5Day");
    },
  },
  mounted() {
    this.fetchData();
  },
  beforeDestroy() {
    this.destroyWeatherChart();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${this.cardData.name}&appid=c9c191ce59409b831172c818e8eec152`,
        );
        if (response.status === 200) {
          this.processWeatherData(response.data.list);
        } else {
          console.error(
            "Error fetching weather data. Status:",
            response.status,
          );
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },
    processWeatherData(data) {
      this.dailyWeather = this.processDailyData(data);
      this.todayWeather = this.processTodayData(data);

      const firstFiveDays = this.dailyWeather.slice(0, 5);
      this.dailyWeather = firstFiveDays;

      this.switchView(this.view);
    },
    processDailyData(hourlyData) {
      const dailyData = {};

      hourlyData.forEach((hourData) => {
        const date = this.getDateFromTimestamp(hourData.dt);
        dailyData[date] = dailyData[date] || { temperatures: [], count: 0 };

        dailyData[date].temperatures.push(hourData.main.temp);
        dailyData[date].count += 1;
      });

      return Object.entries(dailyData).map(([date, data]) => ({
        dt: this.getTimestampFromDate(date),
        main: {
          temp:
            data.temperatures.reduce((acc, temp) => acc + temp, 0) / data.count,
        },
      }));
    },
    processTodayData(hourlyData) {
      const today = this.getTodayISOString();
      return hourlyData
        .filter((hourData) => this.getDateFromTimestamp(hourData.dt) === today)
        .map((hourData) => ({
          dt: hourData.dt,
          main: { temp: hourData.main.temp },
        }));
    },
    debouncedSwitchView: function (viewType) {
      this.isDisabled = true;
      debounce(() => {
        this.switchView(viewType);
        this.isDisabled = false;
      }, 1000)();
    },
    switchView(viewType) {
      this.view = viewType;

      this.$nextTick(async () => {
        const canvas = this.$refs.temperatureChart;
        if (!canvas) {
          console.error("Canvas element not found.");
          return;
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          console.error("Canvas context not found.");
          return;
        }

        await this.destroyWeatherChart();

        if (viewType === DAY_TABS.day) {
          this.showDayView(ctx);
        } else if (viewType === DAY_TABS.days) {
          this.show5DaysView(ctx);
        }
      });
    },
    showDayView(ctx) {
      const labels = this.todayWeather.map((entry) =>
        this.formatTime(entry.dt),
      );
      const data = this.todayWeather.map((entry) =>
        kelvinToCelsius(entry.main.temp),
      );
      const averageTemp = this.calculateAverageTemp(this.todayWeather);

      this.updateAverageTemp(averageTemp);

      this.weatherChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "°C",
              data: data,
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: { type: "linear", position: "bottom", ticks: { stepSize: 1 } },
            y: { beginAtZero: false },
          },
        },
      });
    },
    show5DaysView(ctx) {
      const labels = this.dailyWeather.map((entry) =>
        this.formatDate(entry.dt),
      );
      const data = this.dailyWeather.map((entry) =>
        kelvinToCelsius(entry.main.temp),
      );
      const averageTemp = this.calculateAverageTemp(this.dailyWeather);

      this.updateAverageTemp(averageTemp);

      this.weatherChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "°C",
              data: data,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    },
    formatTime(timestamp) {
      const date = new Date(timestamp * 1000);
      const hours = date.getHours();
      const formattedHours = this.formatNumber(hours);

      return `${formattedHours}`;
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    },
    formatNumber(number) {
      return number < 10 ? `0${number}` : `${number}`;
    },
    getTodayISOString() {
      return new Date().toISOString().split("T")[0];
    },
    getDateFromTimestamp(timestamp) {
      return new Date(timestamp * 1000).toISOString().split("T")[0];
    },
    getTimestampFromDate(date) {
      return new Date(date).getTime();
    },
    destroyWeatherChart() {
      return new Promise((resolve) => {
        if (this.weatherChart) {
          this.weatherChart.destroy();
          this.weatherChart = null;
          setTimeout(resolve, 300);
        } else {
          resolve();
        }
      });
    },
    calculateAverageTemp(data) {
      return (
        data.reduce((acc, entry) => acc + entry.main.temp, 0) / data.length
      );
    },
    updateAverageTemp(averageTemp) {
      useWeatherStore().updateAverageTemp(averageTemp, this.cardData.id);
    },
  },
};
</script>

<style scoped>
.weather-chart__toggle-buttons {
  display: flex;
  gap: 8px;
}
</style>
