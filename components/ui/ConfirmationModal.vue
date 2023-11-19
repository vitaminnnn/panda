<template>
  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <p class="confirmation-message">
        {{ $t("modal.description") }}
      </p>
      <div class="button-container">
        <CustomButton @click="cancelDelete"> {{ $t("yes") }}</CustomButton>
        <CustomButton type="red" @click="cancelDelete">
          {{ $t("no") }}</CustomButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from "~/components/ui/CustomButton.vue";

export default {
  name: "ConfirmationModal",
  components: { CustomButton },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },
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
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.confirmation-message {
  margin-bottom: 20px;
  font-size: 16px;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 8px;
}
</style>
