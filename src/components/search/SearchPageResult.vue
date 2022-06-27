<template>
  <div class="search-result-container">
    <!-- Список аниме карточек -->
    <base-anime-card
      :index="index"
      :anime="anime"
      v-for="(anime, index) in animes"
      :key="anime.mal_id"
    >
      <!-- Изображение -->
      <template v-slot:img>
        <div>
          <div
            v-if="anime.score <= 10 && anime.score >= 8.5"
            class="anime-img-cover good-preloader"
          ></div>
          <div
            v-else-if="anime.score < 8.5 && anime.score >= 6"
            class="anime-img-cover neutral-preloader"
          ></div>
          <div
            v-else-if="anime.score < 6 && anime.score >= 0"
            class="anime-img-cover bad-preloader"
          ></div>
        </div>
        <img
          class="anime-img"
          :src="anime.images.jpg.image_url"
          :alt="anime.title"
        />
      </template>
      <!-- Кнопка -->
      <template v-slot:button>
        <BaseAddBtn :anime="anime" class="anime-add-btn" />
      </template>
      <!-- Заголовок -->
      <template v-if="anime.score <= 10 && anime.score >= 8.5" v-slot:title>
        <h2 class="anime-title anime-title-good">
          {{ anime.title }}
        </h2>
      </template>
      <template v-else-if="anime.score < 8.5 && anime.score >= 6" v-slot:title>
        <h2 class="anime-title anime-title-neutral">
          {{ anime.title }}
        </h2>
      </template>
      <template v-else-if="anime.score < 6 && anime.score >= 0" v-slot:title>
        <h2 class="anime-title anime-title-bad">
          {{ anime.title }}
        </h2>
      </template>
      <!-- Статус -->
      <template v-slot:status>
        <p
          :class="{
            'status-finished': anime.status == 'Finished Airing',
            'status-announcement': anime.status == 'Not yet aired',
            'status-ongoing': anime.status == 'Currently Airing',
          }"
        >
          {{ anime.status }}
        </p>
      </template>
      <!-- Студия -->
      <template v-if="anime.studios[0]" v-slot:studio>{{
        anime.studios[0].name
      }}</template>
      <!-- Тип -->
      <template v-slot:format>{{ anime.type }}</template>
      <!-- Эпизоды -->
      <template v-slot:episodes>{{ anime.episodes }} episodes</template>
      <!-- Список жанров -->
      <template v-slot:genre>
        <ul class="genre-list">
          <li
            class="genre-item"
            v-for="genre in anime.genres"
            :key="genre.mal_id"
          >
            {{ genre.name }}
          </li>
        </ul>
      </template>
      <!-- Рейтинг -->
      <template v-if="anime.score <= 10 && anime.score >= 8.5" v-slot:score>
        <p class="score-title score-good">
          {{ Math.round(anime.score * 10) }} %
        </p>
        <img
          class="score-icon"
          src="../../assets/images/icons/good-review.png"
          alt="Good"
        />
      </template>
      <template v-else-if="anime.score < 8.5 && anime.score >= 6" v-slot:score>
        <p class="score-title score-neutral">
          {{ Math.round(anime.score * 10) }} %
        </p>
        <img
          class="score-icon"
          src="../../assets/images/icons/neutral-review.png"
          alt="Neutral"
        />
      </template>
      <template v-else-if="anime.score < 6 && anime.score >= 0" v-slot:score>
        <p class="score-title score-bad">
          {{ Math.round(anime.score * 10) }} %
        </p>
        <img
          class="score-icon"
          src="../../assets/images/icons/bad-review.png"
          alt="Bad"
        />
      </template>
    </base-anime-card>
  </div>
  <BasePaginationButtons />
</template>

<script>
import axios from "axios";
import { useStore } from "vuex";
import { onMounted, computed, watch } from "vue";
export default {
  setup() {
    // Переменные
    const store = useStore();
    const animes = computed(() => store.state.animes);
    const currentPage = computed(() => store.state.currentPage);

    onMounted(() => {
      sendQuery();
    });

    //  Отслеживание изменений текущей страницы
    watch(currentPage, (value) => {
      if (value) {
        sendQuery();
      }
    });

    // Отправка запроса
    function sendQuery() {
      axios
        .get(
          `https://api.jikan.moe/v4/anime?q=&order_by=score&sort=desc&limit=24&page=${currentPage.value}`
        )
        .then((responce) => {
          store.commit("SAVE_ANIME_DATA", responce.data.data);
          store.commit("SAVE_PAGINATION_DATA", responce.data.pagination);
          store.commit(
            "SAVE_LAST_PAGE",
            responce.data.pagination.last_visible_page
          );
        });
    }

    return {
      animes,
    };
  },
};
</script>

<style scoped>
.search-result-container {
  margin-top: 70px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  justify-items: center;
  gap: 50px;
}
</style>
