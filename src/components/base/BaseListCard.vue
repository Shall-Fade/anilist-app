<template>
  <div :class="addShadowColor(score)" class="list-card">
    <div class="list-card-group">
      <slot name="position"></slot>
      <slot name="image"></slot>
      <h3 class="list-card-title"><slot name="title"></slot></h3>
    </div>
    <div class="list-card-group">
      <slot name="genres"></slot>
    </div>
    <div class="list-card-group">
      <div class="list-card-info">
        <p class="list-card-type"><slot name="type"></slot></p>
        -
        <p class="list-card-episodes"><slot name="episodes"></slot></p>
      </div>
      <slot name="score"></slot>
      <button @click="deleteMyAnime(index)" class="list-card-delete-btn">
        <img src="../../assets/images/icons/delete.svg" alt="Delete" />
      </button>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  props: ["score", "index"],
  setup() {
    // Переменные
    const store = useStore();
    const myList = computed(() => store.state.myList);

    // Добавление цвета тени карточки
    function addShadowColor(score) {
      if (score <= 10 && score >= 8.5) {
        return "list-card-shadow-good";
      } else if (score < 8.5 && score >= 6) {
        return "list-card-shadow-neutral";
      } else if (score < 6 && score >= 0) {
        return "list-card-shadow-bad";
      }
    }

    // Удаление выбранного аниме из списка
    function deleteMyAnime(index) {
      myList.value.splice(index, 1);
      store.commit("ADD_ANIME_IN_LIST", myList.value);
      store.commit("TOGGLE_MODAL", (store.state.modalIsActive = true));
    }

    return {
      addShadowColor,
      deleteMyAnime,
      myList,
    };
  },
};
</script>

<style>
.list-card {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 35px;
  cursor: pointer;
  background-color: var(--c-bg-search);
  border-radius: 8px;
  padding: 20px;
  transition: 0.3s ease;
  box-shadow: 0 3px var(--c-text-white);
}
.list-card:hover .list-card-title-good {
  color: var(--c-score-good);
  transition: 0.3s ease;
}
.list-card:hover .list-card-title-neutral {
  color: var(--c-score-neutral);
  transition: 0.3s ease;
}
.list-card:hover .list-card-title-bad {
  color: var(--c-score-bad);
  transition: 0.3s ease;
}
.list-card:hover .list-card-delete-btn {
  opacity: 1;
  transition: 0.3s ease;
}
.list-card-position {
  font-size: 27px;
  padding-right: 20px;
  font-weight: 700;
}
.list-card-image {
  width: 55px;
  height: 75px;
  border-radius: 8px;
}
.list-card-title {
  max-width: 500px;
  padding-left: 10px;
  transition: 0.3s ease;
}
.list-card-genres {
  display: flex;
}
.list-card-genres-item {
  list-style: none;
  color: var(--c-white);
  background-color: var(--c-bg-black);
  padding: 4px 13px;
  margin-right: 10px;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 500;
}
.list-card-score-title {
  font-weight: 500;
  padding-right: 10px;
}
.list-card-score-icon {
  width: 35px;
}
.list-card-group,
.list-card-info {
  display: flex;
  align-items: center;
}
.list-card-info {
  padding-right: 50px;
}
.list-card-info p {
  padding: 0 5px;
}
.list-card-shadow-good:hover {
  box-shadow: 0 6px var(--c-score-good);
  transition: 0.4s ease;
}
.list-card-shadow-neutral:hover {
  box-shadow: 0 6px var(--c-score-neutral);
  transition: 0.4s ease;
}
.list-card-shadow-bad:hover {
  box-shadow: 0 6px var(--c-score-bad);
  transition: 0.4s ease;
}
.list-card-delete-btn {
  width: 48px;
  height: 48px;
  margin-left: 40px;
  opacity: 0.25;
  transition: 0.3s ease;
}
</style>
