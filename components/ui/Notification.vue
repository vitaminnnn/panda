<template>
  <div
    class="max-w-[320px] w-full h-16 fixed z-50 right-5 top-5 bg-green-200 rounded-[16px] flex items-center justify-between p-4"
    v-if="notificationStore.toasts.length"
  >
    <div class="flex items-center gap-2 text-green-700">
      <el-icon :size="24" color="green"><Select /></el-icon>
      <p>{{ notificationStore.toasts[0].message }}</p>
    </div>
  </div>
</template>

<script setup>
import { useNotificationStore } from "@/store/notification.js";
const notificationStore = useNotificationStore();

const closeNotification = () => {
  notificationStore.clearToast(notificationStore.toasts[0].id);
};
</script>
