import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notificationStore", {
  state: () => ({
    toasts: [],
  }),
  actions: {
    addToast(data) {
      this.toasts.push(data);

      setTimeout(() => {
        this.clearToast(data.id);
      }, data.duration);
    },
    clearToast(id, interval) {
      const index = this.toasts.findIndex((toast) => toast.id === id);
      this.toasts.splice(index, 1);
    },
  },
});
