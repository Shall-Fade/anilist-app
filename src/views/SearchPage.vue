<template>
  <div class="search-container">
    <SearchPageFilter />
    <SearchPageResult />
    <base-modal>
      <template v-slot:image>
        <img
          class="base-modal-image"
          src="../assets/images/icons/cloud.svg"
          alt="Cloud"
        />
      </template>
      <template v-slot:title>You have added anime to the list</template>
    </base-modal>
  </div>
</template>

<script>
import SearchPageFilter from "../components/search/SearchPageFilter.vue";
import SearchPageResult from "../components/search/SearchPageResult.vue";
export default {
  components: {
    SearchPageFilter,
    SearchPageResult,
  },
};
</script>

<style scoped>
.search-container {
  margin: 70px 0;
}
</style>
