<template>
  <button class="button" :class="buttonClasses" @click="onClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
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
  height: 40px;
  padding: 0 16px;
  display: inline-block;
  width: fit-content;
}

.button.disabled {
  pointer-events: none;
  opacity: 0.6;
}

.primary {
  background-color: #007bff;
  color: #fff;
  transition: background-color 0.26s;
}

.primary:hover {
  background-color: darkblue;
}

.secondary {
  background-color: transparent;
  color: #007bff;
  padding: 0 8px;
  transition: color 0.26s;
}

.secondary:hover {
  color: darkblue;
}
</style>
