<template>
  <div class="container">
    <Transition>
      <Notification />
    </Transition>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script>
import { useWeatherStore } from "@/store/index.js";
import Notification from "@/components/ui/Notification.vue";
import axios from "axios";

export default {
  name: "MainApp",
  components: {
    Notification,
  },
  mounted() {
    useWeatherStore().getUserLocation();
    useWeatherStore().loadFromLocalStorage();
  },
};
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
}

#__nuxt {
  min-height: 100vh;
  color: #333;
  margin: 0;
  padding: 0;
}

.container {
  width: 100%;
  margin: 0 auto;
  max-width: 1200px;
  box-sizing: border-box;
  padding: 0 8px;
}

@media (min-width: 768px) {
  .container {
    padding: 0 16px;
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
