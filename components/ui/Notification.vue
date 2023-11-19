<template>
  <div class="notification-container" v-if="notificationStore.toasts.length">
    <p>{{ notificationStore.toasts[0].message }}</p>
  </div>
</template>

<style>
.notification-container {
  max-width: 320px;
  width: 100%;
  position: fixed;
  font-weight: 600;
  z-index: 50;
  right: 5px;
  top: 5px;
  background-color: lavender;
  border-radius: 5px;
  padding: 0 12px;
}
</style>

<script setup>
import { useNotificationStore } from "@/store/notification.js";
const notificationStore = useNotificationStore();
</script>
