<template>
  <div class="anime-card">
    <router-link :to="{ path: `/anime/${anime.mal_id}` }">
      <slot name="img"></slot>
    </router-link>
    <slot name="button"></slot>
    <slot name="title"></slot>
    <div :class="{ left: isLeft, right: isRight }" class="anime-info">
      <div>
        <slot name="status"></slot>
        <p class="anime-studio"><slot name="studio"></slot></p>
        <div class="anime-group">
          <p class="anime-format"><slot name="format"></slot></p>
          -
          <p class="anime-episodes"><slot name="episodes"></slot></p>
        </div>
        <slot name="genre"></slot>
      </div>
      <div class="anime-score"><slot name="score"></slot></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  props: ["index", "anime"],
  setup(props) {
    // Переменные
    const isRight = ref(false);
    const isLeft = ref(false);
    let index = props.index + 1;

    // Вычесляем с какой стороны будет появляться инофрмация об аниме
    function findPosition() {
      if (index % 6 == 0) {
        isLeft.value = true;
      } else {
        isRight.value = true;
      }
    }

    onMounted(() => {
      findPosition();
    });

    return {
      isRight,
      isLeft,
    };
  },
};
</script>

<style>
.anime-card {
  position: relative;
  cursor: pointer;
}
.anime-card:hover .anime-info {
  opacity: 1;
  transition: 0.3s ease;
}
.anime-card:hover .anime-add-btn {
  opacity: 1;
  transition: 0.3s ease;
}
.anime-card:hover .anime-img {
  opacity: 0.4;
  transition: 0.3s ease;
}
/* Цвет заголовка зависящий от его рейтинга */
.anime-card:hover .anime-title-good {
  color: var(--c-score-good);
  transition: 0.3s ease;
}
.anime-card:hover .anime-title-neutral {
  color: var(--c-score-neutral);
  transition: 0.3s ease;
}
.anime-card:hover .anime-title-bad {
  color: var(--c-score-bad);
  transition: 0.3s ease;
}
.anime-img {
  width: 200px;
  height: 300px;
  border-radius: 8px;
  transition: 0.3s ease;
}
.anime-img-cover {
  position: absolute;
  width: 200px;
  height: 300px;
  border-radius: 8px;
  animation: 3s hide;
  opacity: 0;
}
.anime-add-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 40%;
  left: 0;
  right: 0;
  opacity: 0;
  transition: 0.3s ease;
}
.anime-title {
  position: relative;
  font-size: 18px;
  max-width: 200px;
  font-weight: 300;
  transition: 0.2s ease;
}
.anime-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: var(--c-bg-search);
  min-width: 290px;
  max-width: 700px;
  border-radius: 8px;
  pointer-events: none;
  user-select: none;
  font-size: 18px;
  z-index: 10;
  opacity: 0;
  white-space: nowrap;
  transition: 0.2s ease;
}
.left {
  position: absolute;
  top: 20px;
  right: 100%;
  margin-right: 15px;
}
.right {
  position: absolute;
  top: 20px;
  left: 100%;
  margin-left: 15px;
}
.anime-studio {
  color: var(--c-studio-blue);
}
.anime-group {
  display: flex;
  font-size: 14px;
  font-weight: 300;
}
.anime-score {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* Цвета прелоадера */
.good-preloader {
  background-color: var(--c-score-good);
}
.neutral-preloader {
  background-color: var(--c-score-neutral);
}
.bad-preloader {
  background-color: var(--c-score-bad);
}
/* Цвета статуса */
.status-finished {
  color: var(--c-status-finished);
}
.status-announcement {
  color: var(--c-status-announcement);
}
.status-ongoing {
  color: var(--c-status-ongoing);
}
/* Список жанров */
.genre-list {
  display: flex;
  margin-top: 25px;
}
.genre-item {
  list-style: none;
  color: var(--c-white);
  background-color: var(--c-bg-black);
  padding: 3px 10px;
  margin-right: 7px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
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
.score-title {
  font-weight: 500;
}
.score-icon {
  width: 30px;
}

@keyframes hide {
  0% {
    opacity: 1;
  }
  40% {
    opacity: 1;
  }
  60% {
    opacity: 0;
  }
}
</style>
