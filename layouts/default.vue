<template>
  <header>
    <h1>Weather App</h1>
    <nav>
      <div class="wrapper">
        <NuxtLink to="/" class="nav-link" :title="$t('header.home')">{{
          $t("header.home")
        }}</NuxtLink>
        <NuxtLink
          to="/favorites"
          class="nav-link"
          :title="$t('header.favorites')"
          >{{ $t("header.favorites") }}</NuxtLink
        >
      </div>
      <SwitchLang />
    </nav>
  </header>
  <slot />
</template>

<script>
import SwitchLang from "~/components/SwitchLang.vue";

export default {
  components: {
    SwitchLang,
  },
};
</script>

<style scoped>
header {
  background-color: black;
  color: white;
  padding: 16px;
  text-align: center;
  border-radius: 0 0 5px 5px;
  margin-bottom: 16px;
}

h1 {
  margin: 0;
  font-size: 2em;
}

.wrapper {
  display: flex;
  align-items: center;
  gap: 16px;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  font-weight: 600;
  font-size: 1.2em;
  margin-top: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: black;
}
</style>
