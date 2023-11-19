<template>
  <button class="button" :class="buttonClasses" @click="onClick">
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  type: { type: String, default: "primary" },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(["click"]);

const buttonClasses = computed(() => {
  const { type, disabled } = props;
  return {
    [type]: type,
    disabled: disabled,
  };
});

const onClick = () => {
  emit("click");
};
</script>

<style scoped>
.button {
  border-radius: 5px;
  cursor: pointer;
  height: 40px;
  padding: 0 16px;
  display: inline-block;
  width: fit-content;

  &.disabled {
    pointer-events: none;
    opacity: 0.6;
  }
}
.primary {
  background-color: #007bff;
  color: #fff;
  transition: background-color 0.26s;

  &:hover {
    background-color: darkblue;
  }
}

.secondary {
  background-color: transparent;
  color: #007bff;
  padding: 0 8px;
  transition: color 0.26s;

  &:hover {
    color: darkblue;
  }
}
</style>
