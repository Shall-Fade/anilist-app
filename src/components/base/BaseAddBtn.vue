<template>
  <div class="add-btn-container">
    <button @click="addAnimeInList(anime)" class="add-btn"></button>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  props: ["anime"],
  setup() {
    // Переменные
    const store = useStore();
    const myList = computed(() => store.state.myList);

    // Добавление аниме в список
    function addAnimeInList(anime) {
      myList.value.push({
        id: anime.mal_id,
        title: anime.title,
        image: anime.images.jpg.image_url,
        type: anime.type,
        episodes: anime.episodes,
        score: anime.score,
        genres: anime.genres,
      });
      store.commit("ADD_ANIME_IN_LIST", myList.value);
      store.commit("TOGGLE_MODAL", (store.state.modalIsActive = true));
    }

    return {
      addAnimeInList,
    };
  },
};
</script>

<style scoped>
.add-btn {
  background-image: url("../../assets/images/icons/add.svg");
  background-position: center center;
  background-repeat: no-repeat;
  padding: 20px;

  transition: 0.3s ease;
}
.add-btn:hover {
  transform: scale(1.3);
  transition: 0.3s ease;
}
/* .add-btn-hover-good:hover {
  transform: scale(1.3);
  background-color: var(--c-score-good);
  border-radius: 5px;
  transition: 0.3s ease;
}
.add-btn-hover-neutral:hover {
  transform: scale(1.3);
  background-color: var(--c-score-neutral);
  border-radius: 5px;
  transition: 0.3s ease;
}
.add-btn-hover-bad:hover {
  transform: scale(1.3);
  background-color: var(--c-score-bad);
  border-radius: 5px;
  transition: 0.3s ease;
} */
</style>
