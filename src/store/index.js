import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  plugins: [createPersistedState()],
  state: {
    animes: null,
    myList: [],
    modalIsActive: false,
    pagination: null,
    currentPage: 1,
    lastVisiblePage: null,
    preloaderIsShown: false,
  },
  getters: {},
  mutations: {
    SAVE_ANIME_DATA(state, animes) {
      state.animes = animes;
    },
    ADD_ANIME_IN_LIST(state, myList) {
      state.myList = myList;
    },
    TOGGLE_MODAL(state, modalIsActive) {
      state.modalIsActive = modalIsActive;
    },
    SAVE_PAGINATION_DATA(state, pagination) {
      state.pagination = pagination;
    },
    SAVE_CURRENT_PAGE(state, changedCurrentPage) {
      state.currentPage = changedCurrentPage;
    },
    SAVE_LAST_PAGE(state, lastVisiblePage) {
      state.lastVisiblePage = lastVisiblePage;
    },
    TOGGLE_PRELOADER(state, preloaderIsShown) {
      state.preloaderIsShown = preloaderIsShown;
    },
  },
});

export default store;
