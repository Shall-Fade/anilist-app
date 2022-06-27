<template>
  <form class="search-filter-container" @submit.prevent="sendQuery">
    <div class="select-group">
      <label for="search">Search</label>
      <input
        v-model="animeQuery"
        id="search"
        placeholder="Enter something"
        type="text"
      />
    </div>
    <div class="select-group">
      <label for="genres">Genres</label>
      <select v-model="selectGenre" id="genres">
        <option value="">Any</option>
        <option
          v-for="genre in genres"
          :key="genre.mal_id"
          :value="genre.mal_id"
        >
          {{ genre.name }}
        </option>
      </select>
    </div>
    <div class="select-group">
      <label for="year">Year</label>
      <select v-model="selectYear" id="year">
        <option value="">Any</option>
        <option>2022</option>
        <option>2021</option>
        <option>2020</option>
        <option>2019</option>
      </select>
    </div>
    <div class="select-group">
      <label for="rating">Rating</label>
      <select v-model="selectRating" id="rating">
        <option value="">Any</option>
        <option value="g">G - All Ages</option>
        <option value="pg">PG - Children</option>
        <option value="pg13">PG-13 - Teens 13 or older</option>
        <option value="r17">R - 17+ (violence & profanity)</option>
        <option value="r">R+ - Mild Nudity</option>
        <option value="rx">Rx - Hentai</option>
      </select>
    </div>
    <div class="select-group">
      <label for="format">Format</label>
      <select v-model="selectFormat" id="format">
        <option value="">Any</option>
        <option>TV Show</option>
        <option>Movie</option>
        <option>Special</option>
        <option>OVA</option>
        <option>ONA</option>
        <option>Music</option>
      </select>
    </div>
    <div class="select-group">
      <label for="status">Airing Status</label>
      <select v-model="selectStatus" id="status">
        <option value="">Any</option>
        <option>Airing</option>
        <option>Complete</option>
        <option>Upcoming</option>
      </select>
    </div>
  </form>
  <div class="sort-filter">
    <div>
      <h3 v-if="animeQuery !== ''">{{ searchAnimeTitle() }}</h3>
    </div>
    <select v-model="selectSort">
      <option value="">Any</option>
      <option value="title">Title</option>
      <option value="rating">Rating</option>
      <option value="score">Score</option>
      <option value="favorites">Favorites</option>
      <option value="episodes">Episodes</option>
      <option value="popularity">Popularity</option>
    </select>
  </div>
</template>

<script>
import axios from "axios";
import { useStore } from "vuex";
import { ref, onMounted, watch, watchEffect, computed } from "vue";
export default {
  setup() {
    // Переменные
    const store = useStore();
    const currentPage = computed(() => store.state.currentPage);
    const animeQuery = ref("");
    const animes = ref();
    const genres = ref();
    // Фильтры
    const selectGenre = ref("");
    const selectYear = ref("");
    const selectRating = ref("");
    const selectFormat = ref("");
    const selectStatus = ref("");
    const selectSort = ref("");

    // Получить аниме жанры
    onMounted(() => {
      axios.get("https://api.jikan.moe/v4/genres/anime").then((responce) => {
        genres.value = responce.data.data;
      });
    });

    // Показать какое аниме мы сейчас ищем
    function searchAnimeTitle() {
      return animeQuery.value[0].toUpperCase() + animeQuery.value.slice(1);
    }

    watchEffect(() => {
      sendQuery();
    });

    //  Отслеживание изменений текущей страницы
    watch(currentPage, (value) => {
      if (value) {
        sendQuery();
      }
    });

    // Отправить запрос с фильтрацией
    function sendQuery() {
      axios
        .get(
          `https://api.jikan.moe/v4/anime?q=${animeQuery.value}&genres=${selectGenre.value}&type=${selectFormat.value}&status=${selectStatus.value}&rating=${selectRating.value}&order_by=${selectSort.value}&sort=desc&limit=24&page=${currentPage.value}`
        )
        .then((responce) => {
          animes.value = responce.data.data;
          store.commit("SAVE_ANIME_DATA", animes.value);
          store.commit("SAVE_PAGINATION_DATA", responce.data.pagination);
          store.commit(
            "SAVE_LAST_PAGE",
            responce.data.pagination.last_visible_page
          );
        });
    }

    return {
      animeQuery,
      genres,
      selectGenre,
      selectYear,
      selectRating,
      selectFormat,
      selectStatus,
      selectSort,
      searchAnimeTitle,
      sendQuery,
    };
  },
};
</script>

<style scoped>
.search-filter-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
input,
select {
  border: none;
  background: none;
  outline: none;
}
.select-group {
  display: flex;
  flex-direction: column;
}
.select-group label {
  font-size: 15px;
  color: var(--c-white);
  padding-bottom: 5px;
}
.select-group input,
.select-group select,
.sort-filter select {
  background-color: var(--c-bg-search);
  font-size: 15px;
  padding: 8px 15px;
  border-radius: 5px;
  width: 180px;
  font-weight: 300;
}
.select-group input {
  color: var(--c-white);
}
.select-group input::placeholder {
  color: var(--c-text-white);
}
.select-group select {
  color: var(--c-text-white);
  background-image: url("../../assets/images/icons/down-arrow.svg");
  background-repeat: no-repeat;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
  cursor: pointer;
}
.sort-filter {
  display: grid;
  grid-template-columns: auto min-content;
  align-items: end;
  margin-top: 20px;
}
.sort-filter select {
  color: var(--c-text-white);
  background-color: transparent;
  background-image: url("../../assets/images/icons/double-arrow.svg");
  background-repeat: no-repeat;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background-position: left 0 top 50%;
  background-size: 0.8em;
  cursor: pointer;
}
.sort-filter option {
  background-color: var(--c-bg-search);
}
</style>
