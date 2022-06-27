<template>
  <div class="pagination-container">
    <button class="pagination-btn-arrow" @click="reducePage">
      <img src="../../assets/images/icons/left-pagination.svg" alt="Previous" />
    </button>
    <button
      v-if="currentPage > 1"
      class="pagination-btn-num pagination-btn-first"
      @click="selectPage(1)"
    >
      1
    </button>
    <div class="btn-group">
      <button class="pagination-btn-num pagination-btn-active">
        {{ currentPage }}
      </button>
      <button
        v-if="currentPage !== lastVisiblePage"
        class="pagination-btn-num"
        @click="selectPage(currentPage + 1)"
      >
        {{ currentPage + 1 }}
      </button>
      <button
        v-if="currentPage !== lastVisiblePage"
        class="pagination-btn-num"
        @click="selectPage(currentPage + 2)"
      >
        {{ currentPage + 2 }}
      </button>
      <button
        v-if="currentPage !== lastVisiblePage"
        class="pagination-btn-num"
        @click="selectPage(currentPage + 3)"
      >
        {{ currentPage + 3 }}
      </button>
      <button
        v-if="currentPage !== lastVisiblePage"
        class="pagination-btn-num"
        @click="selectPage(currentPage + 4)"
      >
        {{ currentPage + 4 }}
      </button>
      <button
        v-if="currentPage !== lastVisiblePage"
        class="pagination-btn-num"
        @click="selectPage(currentPage + 5)"
      >
        {{ currentPage + 5 }}
      </button>
      <button
        v-if="currentPage !== lastVisiblePage"
        class="pagination-btn-num"
        @click="selectPage(lastVisiblePage)"
      >
        {{ lastVisiblePage }}
      </button>
    </div>
    <button class="pagination-btn-arrow" @click="increasePage">
      <img src="../../assets/images/icons/right-pagination.svg" alt="Next" />
    </button>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";
export default {
  setup() {
    // Переменные
    const store = useStore();
    const pagination = computed(() => store.state.pagination);
    const currentPage = computed(() => store.state.currentPage);
    const lastVisiblePage = computed(() => store.state.lastVisiblePage);
    const changedCurrentPage = ref();

    // После обновления или загрузки страницы, поиск начинается с первой страницы
    onMounted(() => {
      store.commit("SAVE_CURRENT_PAGE", (changedCurrentPage.value = 1));
    });

    // Предыдущая страница
    function increasePage() {
      if (pagination.value.has_next_page) {
        changedCurrentPage.value = currentPage.value + 1;
        store.commit("SAVE_CURRENT_PAGE", changedCurrentPage.value);
      }
    }

    // Следующая страница
    function reducePage() {
      if (currentPage.value > 1) {
        changedCurrentPage.value = currentPage.value - 1;
        store.commit("SAVE_CURRENT_PAGE", changedCurrentPage.value);
      }
    }

    // Выбираем страницу
    function selectPage(page) {
      changedCurrentPage.value = page;
      store.commit("SAVE_CURRENT_PAGE", changedCurrentPage.value);
    }

    return {
      currentPage,
      lastVisiblePage,
      reducePage,
      increasePage,
      selectPage,
    };
  },
};
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
.btn-group {
  min-width: 320px;
  max-width: 550px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 30px;
}
.pagination-btn-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--c-black);
  border-radius: 50px;
  padding: 3px;
  transition: 0.2s ease;
}
.pagination-btn-arrow:hover,
.pagination-btn-num:hover {
  transition: 0.2s ease;
  background-color: var(--c-bg-navbar);
}
.pagination-btn-num {
  color: var(--c-txt-white);
  background-color: var(--c-black);
  padding: 7px 14px;
}
.pagination-btn-first {
  margin-left: 30px;
  /* background-color: var(--c-bg-search); */
}
.pagination-btn-active {
  background-color: var(--c-bg-search);
}
</style>
