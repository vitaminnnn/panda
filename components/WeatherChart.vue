<template>
  <div>
    <div class="toggle-buttons">
      <button
        @click="debouncedSwitchView('day')"
        :class="{ active: view === 'day' }"
        :disabled="isDisabled"
      >
        {{ $t("day") }}
      </button>
      <button
        @click="debouncedSwitchView('5days')"
        :class="{ active: view === '5days' }"
        :disabled="isDisabled"
      >
        {{ $t("5days") }}
      </button>
    </div>
    <h2>{{ title }}</h2>
    <canvas ref="temperatureChart" width="400" height="200"></canvas>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js/auto";
import { useWeatherStore } from "@/store/index.js";
import kelvinToCelsius from "@/utils/kelvinToCelsius.js";
import debounce from "@/utils/debounce.js";

export default {
  name: "WeatherChart",
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
      averageTemp: 0,
      isDisabled: false,
    };
  },
  computed: {
    title() {
      return this.view === "day" ? this.$t("titleDay") : this.$t("title5Day");
    },
  },
  mounted() {
    this.fetchData();
  },
  beforeDestroy() {
    if (this.weatherChart) {
      this.weatherChart.destroy();
    }
  },
  methods: {
    debouncedSwitchView: function (viewType) {
      this.isDisabled = true;
      debounce(() => {
        this.switchView(viewType);
        this.isDisabled = false;
      }, 1000)();
    },
    processTodayData(hourlyData) {
      const todayData = hourlyData.filter((hourData) => {
        const today = new Date().toISOString().split("T")[0];
        const dataDate = new Date(hourData.dt * 1000)
          .toISOString()
          .split("T")[0];
        return today === dataDate;
      });

      return todayData;
    },
    async fetchData() {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${this.cardData.name}&appid=c9c191ce59409b831172c818e8eec152`,
        );
        this.dailyWeather = this.processDailyData(response.data.list);
        this.todayWeather = this.processTodayData(response.data.list);

        const firstFiveDays = this.dailyWeather.slice(0, 5);
        this.dailyWeather = firstFiveDays;

        this.switchView(this.view);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },
    processDailyData(hourlyData) {
      const dailyData = {};
      hourlyData.forEach((hourData) => {
        const date = new Date(hourData.dt * 1000).toISOString().split("T")[0];
        if (!dailyData[date]) {
          dailyData[date] = { temperatures: [], count: 0 };
        }
        dailyData[date].temperatures.push(hourData.main.temp);
        dailyData[date].count += 1;
      });

      const dailyWeather = Object.entries(dailyData).map(([date, data]) => ({
        dt: new Date(date).getTime(),
        main: {
          temp:
            data.temperatures.reduce((acc, temp) => acc + temp, 0) / data.count,
        },
      }));

      return dailyWeather;
    },
    switchView(viewType) {
      this.view = viewType;

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

      if (this.weatherChart) {
        this.weatherChart.destroy();
      }

      if (viewType === "day") {
        this.showDayView(ctx);
      } else if (viewType === "5days") {
        this.show5DaysView(ctx);
      }
    },
    showDayView(ctx) {
      const labels = this.todayWeather.map((entry) =>
        this.formatTime(entry.dt),
      );
      const data = this.todayWeather.map((entry) =>
        kelvinToCelsius(entry.main.temp),
      );

      const averageTemp =
        this.todayWeather.reduce((acc, entry) => acc + entry.main.temp, 0) /
        this.todayWeather.length;

      useWeatherStore().updateAverageTemp(averageTemp, this.cardData.id);

      if (this.weatherChart) {
        this.weatherChart.destroy();
      }

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
            x: {
              type: "linear",
              position: "bottom",
              ticks: {
                stepSize: 1,
              },
            },
            y: {
              beginAtZero: false,
            },
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

      if (this.weatherChart) {
        this.weatherChart.destroy();
      }

      const averageTemp =
        this.dailyWeather.reduce((acc, entry) => acc + entry.main.temp, 0) /
        this.dailyWeather.length;

      useWeatherStore().updateAverageTemp(averageTemp, this.cardData.id);

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
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
    formatTime(timestamp) {
      const date = new Date(timestamp * 1000);
      const hours = date.getHours();
      const minutes = date.getMinutes();

      const formattedHours = hours < 10 ? `0${hours}` : hours;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      return `${formattedHours}`;
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    },
  },
};
</script>

<style scoped>
.toggle-buttons {
  display: flex;
  gap: 12px;
}

.toggle-buttons button {
  padding: 10px 32px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  outline: none;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
}

.toggle-buttons button.active {
  background-color: darkgreen;
}
</style>
