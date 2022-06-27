<template>
  <div v-if="animeInfo" class="anime-info-container">
    <div class="anime-info-card">
      <div class="anime-info-block">
        <div class="anime-info-group">
          <!-- Картинка -->
          <img class="anime-info-img" :src="animeInfo.images.jpg.image_url" />
          <!-- Основной заголовок -->
          <h2 class="anime-info-title">{{ animeInfo.title }}</h2>
        </div>
        <div class="anime-info-group">
          <div class="anime-info-score-block">
            <!-- Изображения рейтинга -->
            <img
              v-if="animeInfo.score <= 10 && animeInfo.score >= 8.5"
              class="anime-info-score-icon"
              src="../assets/images/icons/good-review.png"
              alt="Good"
            />
            <img
              v-else-if="animeInfo.score < 8.5 && animeInfo.score >= 6"
              class="anime-info-score-icon"
              src="../assets/images/icons/neutral-review.png"
              alt="Good"
            />
            <img
              v-else-if="animeInfo.score < 6 && animeInfo.score >= 0"
              class="anime-info-score-icon"
              src="../assets/images/icons/bad-review.png"
              alt="Good"
            />
            <div>
              <!-- Рейтинг -->
              <h4
                v-if="animeInfo.score <= 10 && animeInfo.score >= 8.5"
                class="anime-info-score-title score-good"
              >
                {{ animeInfo.score }}/10
              </h4>
              <h4
                v-else-if="animeInfo.score < 8.5 && animeInfo.score >= 6"
                class="anime-info-score-title score-neutral"
              >
                {{ animeInfo.score }}/10
              </h4>
              <h4
                v-else-if="animeInfo.score < 6 && animeInfo.score >= 0"
                class="anime-info-score-title score-bad"
              >
                {{ animeInfo.score }}/10
              </h4>
              <!-- Количество проголосовавших -->
              <p class="anime-info-score-description">
                {{ animeInfo.scored_by }}
              </p>
            </div>
          </div>
          <!-- Дополнительное название (на японском) -->
          <h4 class="anime-info-subtitle">{{ animeInfo.title_japanese }}</h4>
          <!-- Дополнительное название (на английском) -->
          <h4 class="anime-info-subtitle">{{ animeInfo.title_english }}</h4>
          <hr class="anime-info-hr" />
          <!-- Описание -->
          <p class="anime-info-synopsis">{{ animeInfo.synopsis }}</p>
        </div>
        <div class="anime-info-group">
          <!-- Тип -->
          <div class="anime-info-type">
            <h5 class="anime-info-type-title">Type</h5>
            <p class="anime-info-type-description">{{ animeInfo.type }}</p>
          </div>
          <!-- Эпизоды -->
          <div class="anime-info-type">
            <h5 class="anime-info-type-title">Episodes</h5>
            <p class="anime-info-type-description">
              {{ animeInfo.episodes }} episodes
            </p>
          </div>
          <!-- Статус -->
          <div class="anime-info-type">
            <h5 class="anime-info-type-title">Status</h5>
            <p class="anime-info-type-description">{{ animeInfo.status }}</p>
          </div>
          <!-- Жанры -->
          <div class="anime-info-type">
            <h5 class="anime-info-type-title">Genres</h5>
            <ul>
              <li
                v-for="genre in animeInfo.genres"
                :key="genre.mal_id"
                class="anime-info-type-description"
              >
                {{ genre.name }}
              </li>
            </ul>
          </div>
          <!-- Источник -->
          <div class="anime-info-type">
            <h5 class="anime-info-type-title">Source</h5>
            <p class="anime-info-type-description">{{ animeInfo.source }}</p>
          </div>
          <!-- Сезон -->
          <div class="anime-info-type">
            <h5 class="anime-info-type-title">Season</h5>
            <p class="anime-info-type-description">
              {{ animeSeason(animeInfo.season) }} {{ animeInfo.year }}
            </p>
          </div>
          <!-- Эфир -->
          <div class="anime-info-type">
            <h5 class="anime-info-type-title">Aired</h5>
            <p class="anime-info-type-description">
              {{ animeInfo.aired.string }}
            </p>
          </div>
          <!-- Студии -->
          <div class="anime-info-type">
            <h5 class="anime-info-type-title">Studios</h5>
            <ul>
              <li
                v-for="studio in animeInfo.studios"
                :key="studio.mal_id"
                class="anime-info-type-description"
              >
                {{ studio.name }}
              </li>
            </ul>
          </div>
          <!-- Длительность -->
          <div class="anime-info-type">
            <h5 class="anime-info-type-title">Duration</h5>
            <p class="anime-info-type-description">{{ animeInfo.duration }}</p>
          </div>
        </div>
      </div>
      <div class="anime-trailer-block">
        <!-- Трейлер -->
        <iframe
          v-if="animeInfo.trailer.embed_url"
          width="540px"
          height="305px"
          frameborder="no"
          :src="animeInfo.trailer.embed_url"
        ></iframe>
        <!-- Добавить рекомендации!!!! -->
        <div class="anime-trailer-score">
          <!-- Избранные -->
          <div>
            <h5 class="anime-trailer-score-title">Favorites</h5>
            <p class="anime-trailer-score-description">
              {{ animeInfo.favorites }}
            </p>
          </div>
          <!-- Участники -->
          <div>
            <h5 class="anime-trailer-score-title">Members</h5>
            <p class="anime-trailer-score-description">
              {{ animeInfo.members }}
            </p>
          </div>
          <!-- Популярность -->
          <div>
            <h5 class="anime-trailer-score-title">Popularity</h5>
            <p class="anime-trailer-score-description">
              {{ animeInfo.popularity }}
            </p>
          </div>
          <!-- Ранг -->
          <div>
            <h5 class="anime-trailer-score-title">Rank</h5>
            <p class="anime-trailer-score-description">
              {{ animeInfo.rank }}
            </p>
          </div>
          <!-- Рейтинг -->
          <div>
            <h5 class="anime-trailer-score-title">Rating</h5>
            <p class="anime-trailer-score-description">
              {{ animeInfo.rating }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
export default {
  setup() {
    // Переменные
    const route = useRoute();
    const animeQuery = route.params.id;
    const animeInfo = ref("");

    onMounted(() => {
      sendQuery();
    });

    // Сезон с большой буквы
    function animeSeason(season) {
      return season[0].toUpperCase() + season.slice(1);
    }

    // Отправка запроса для получения полной информации для аниме
    function sendQuery() {
      axios
        .get(`https://api.jikan.moe/v4/anime/${animeQuery}/full`)
        .then((responce) => {
          animeInfo.value = responce.data.data;
        });
    }

    return {
      animeInfo,
      animeSeason,
    };
  },
};
</script>

<style scoped>
.anime-info-container {
  margin: 70px 0;
}
.anime-info-block {
  display: flex;
  justify-content: space-between;
}
.anime-info-title {
  font-size: 18px;
  max-width: 225px;
}
.anime-info-subtitle {
  font-weight: 300;
  font-size: 14px;
}
.anime-info-group {
  /* padding: 0 20px; */
  background-color: var(--c-bg-search);
  border-radius: 8px;
  padding: 15px;
}
.anime-info-score-block {
  display: flex;
  padding-bottom: 15px;
}
.anime-info-score-block div {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.anime-info-score-icon {
  width: 50px;
  margin-right: 15px;
}
.anime-info-score-title {
  font-size: 14px;
}
.anime-info-score-description {
  font-size: 13px;
}
/* Цвета рейтинга */
.score-good {
  color: var(--c-score-good);
}
.score-neutral {
  color: var(--c-score-neutral);
}
.score-bad {
  color: var(--c-score-bad);
}
.anime-info-hr {
  margin: 5px 0 20px 0;
  border-radius: 8px;
  color: var(--c-text-white);
}
.anime-info-synopsis {
  font-size: 16px;
  font-weight: 300;
  line-height: 1.3;
  width: 700px;
}
.anime-info-type {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 350px;
  padding-bottom: 2px;
}
.anime-info-type-title {
  font-weight: 500;
}
.anime-info-type-description {
  color: var(--c-white);
}
.anime-info-type ul {
  list-style: none;
  text-align: right;
}
.anime-trailer-block {
  padding-top: 40px;
  display: flex;
  justify-content: space-between;
}
.anime-trailer-score,
iframe {
  background-color: var(--c-bg-search);
  border-radius: 8px;
  padding: 20px;
}
.anime-trailer-score-title {
  font-size: 16px;
  font-weight: 500;
}
.anime-trailer-score-description {
  color: var(--c-white);
  font-weight: 500;
}
</style>
