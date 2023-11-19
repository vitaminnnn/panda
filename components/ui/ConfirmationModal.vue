<template>
  <div class="modal">
    <div class="modal-content">
      <p>Are you sure you want to delete this block?</p>
      <button @click="confirmDelete">Yes</button>
      <button @click="cancelDelete">No</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    confirmDelete() {
      this.$emit("confirm-delete");
    },
    cancelDelete() {
      this.$emit("cancel-delete");
    },
  },
};
</script>

<style scoped>
/* Add your modal styles here */
</style>
