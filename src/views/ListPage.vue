<template>
  <ListPageFilter />
  <ListPageBlock />
  <base-modal>
    <template v-slot:image>
      <img
        class="base-modal-image"
        src="../assets/images/icons/trash.svg"
        alt="Trash"
      />
    </template>
    <template v-slot:title>You removed the anime from the list</template>
  </base-modal>
</template>

<script>
import ListPageFilter from "../components/list/ListPageFilter.vue";
import ListPageBlock from "../components/list/ListPageBlock.vue";
export default {
  components: {
    ListPageFilter,
    ListPageBlock,
  },
};
</script>

<style scoped></style>
