<template>
  <div class="lang-switcher">
    <button @click="toggleDropdown">
      {{ $i18n.locale.toUpperCase() }}
    </button>
    <div v-show="showDropdown" class="dropdown-content">
      <button @click="setLocale('uk')">UK</button>
      <button @click="setLocale('en')">EN</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDropdown: false,
    };
  },
  mounted() {
    window.addEventListener("click", this.closeDropdown);
  },
  beforeDestroy() {
    window.removeEventListener("click", this.closeDropdown);
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    setLocale(locale) {
      this.$i18n.locale = locale;
      this.showDropdown = false;
    },
    closeDropdown(event) {
      if (!event.target.closest(".lang-switcher")) {
        this.showDropdown = false;
      }
    },
  },
  watch: {
    $route() {
      this.showDropdown = false;
    },
  },
};
</script>

<style scoped>
.lang-switcher {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 60px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content button {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  background-color: #fff;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.dropdown-content button:hover {
  background-color: #f1f1f1;
}

.lang-switcher button {
  background-color: #2c3e50;
  color: white;
  padding: 10px;
  cursor: pointer;
  border: none;
}

/* Add or modify styles as needed */
</style>
