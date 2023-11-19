<template>
  <button class="button" :class="buttonClasses" @click="onClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "CustomButton",
  props: {
    type: { type: String, default: "primary" },
    disabled: { type: Boolean, default: false },
  },
  computed: {
    buttonClasses() {
      return {
        [this.type]: this.type,
        disabled: this.disabled,
      };
    },
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped>
.button {
  border-radius: 5px;
  border: none;
  cursor: pointer;
  height: 32px;
  padding: 0 24px;
  display: inline-block;
  width: fit-content;
  font-weight: 600;
  transition:
    color,
    background-color 0.26s;
}

.button.disabled {
  pointer-events: none;
  opacity: 0.6;
}

.primary {
  background-color: #007bff;
  color: #fff;
}

.primary:hover {
  background-color: darkblue;
}

.secondary {
  background-color: transparent;
  color: #007bff;
  padding: 0 8px;
}

.secondary:hover {
  color: darkblue;
}

.red {
  background-color: #ff0000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.red:hover {
  background-color: #cc0000;
}
</style>
