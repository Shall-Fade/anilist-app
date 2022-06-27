<template>
  <NavBar />
  <div class="wrapper">
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/layout/NavBar.vue";
export default {
  components: {
    NavBar,
  },
};
</script>

<style>
@import "@/assets/base.css";
</style>
