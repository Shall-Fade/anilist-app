<template>
  <div class="list-filter-container">
    <p class="list-filter-title list-filter-title-active">My Watched Anime</p>
    <p class="list-filter-title">My Planned Anime</p>
    <p class="list-filter-title">My Favorite Anime</p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.list-filter-container {
  margin: 70px 0 40px 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.list-filter-title {
  font-size: 26px;
  font-weight: 500;
}
.list-filter-title-active {
  color: var(--c-white);
}
</style>
