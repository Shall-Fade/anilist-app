<template>
  <div class="list-block-container">
    <div class="list-block-settings">
      <h2 class="list-item-amount">Items: {{ myList.length }}</h2>
      <button @click="removeList" class="list-remove-btn">
        Remove All List
      </button>
    </div>
    <!-- Карточка из списка -->
    <base-list-card
      :score="myAnime.score"
      :index="index"
      v-for="(myAnime, index) in myList"
      :key="myAnime.mal_id"
    >
      <!-- Номер аниме -->
      <template v-slot:position>
        <p class="list-card-position">{{ index + 1 }}.</p>
      </template>
      <!-- Изображение аниме -->
      <template v-slot:image
        ><img class="list-card-image" :src="myAnime.image" :alt="myAnime.title"
      /></template>
      <!-- Название аниме -->
      <template v-if="myAnime.score <= 10 && myAnime.score >= 8.5" v-slot:title>
        <h3 class="list-card-title list-card-title-good">
          {{ myAnime.title }}
        </h3>
      </template>
      <template
        v-else-if="myAnime.score < 8.5 && myAnime.score >= 6"
        v-slot:title
      >
        <h3 class="list-card-title list-card-title-neutral">
          {{ myAnime.title }}
        </h3>
      </template>
      <template
        v-else-if="myAnime.score < 6 && myAnime.score >= 0"
        v-slot:title
      >
        <h3 class="list-card-title list-card-title-bad">
          {{ myAnime.title }}
        </h3>
      </template>
      <!-- Жанры аниме -->
      <template v-slot:genres>
        <ul
          v-for="genre in myAnime.genres"
          :key="genre"
          class="list-card-genres"
        >
          <li class="list-card-genres-item">{{ genre.name }}</li>
        </ul>
      </template>
      <!-- Тип аниме -->
      <template v-slot:type>{{ myAnime.type }}</template>
      <!-- Эпизоды аниме -->
      <template v-slot:episodes>{{ myAnime.episodes }} episodes</template>
      <!-- Рейтинг аниме -->
      <template v-if="myAnime.score <= 10 && myAnime.score >= 8.5" v-slot:score>
        <p class="list-card-score-title score-good">
          {{ Math.round(myAnime.score * 10) }} %
        </p>
        <img
          class="list-card-score-icon"
          src="../../assets/images/icons/good-review.png"
          alt="Good"
        />
      </template>
      <template
        v-else-if="myAnime.score < 8.5 && myAnime.score >= 6"
        v-slot:score
      >
        <p class="list-card-score-title score-neutral">
          {{ Math.round(myAnime.score * 10) }} %
        </p>
        <img
          class="list-card-score-icon"
          src="../../assets/images/icons/neutral-review.png"
          alt="Neutral"
        />
      </template>
      <template
        v-else-if="myAnime.score < 6 && myAnime.score >= 0"
        v-slot:score
      >
        <p class="list-card-score-title score-bad">
          {{ Math.round(myAnime.score * 10) }} %
        </p>
        <img
          class="list-card-score-icon"
          src="../../assets/images/icons/bad-review.png"
          alt="Bad"
        />
      </template>
    </base-list-card>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    // Переменные
    const store = useStore();
    let myList = computed(() => store.state.myList);

    // Очистка всего аниме списка
    function removeList() {
      store.commit("ADD_ANIME_IN_LIST", myList.value.splice(0, -1));
    }

    return {
      myList,
      removeList,
    };
  },
};
</script>

<style scoped>
.list-block-container {
  margin: 40px 0 70px 0;
}
.list-block-settings {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 15px;
}
.list-item-amount {
  font-size: 22px;
}
.list-remove-btn {
  font-size: 20px;
  font-weight: 500;
  color: var(--c-text-white);
  transition: 0.3s ease;
}
.list-remove-btn:hover {
  color: var(--c-btn-red-hover);
  transition: 0.3s ease;
}
</style>
