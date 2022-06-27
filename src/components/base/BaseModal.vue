<template>
  <div v-show="modalIsActive" class="modal-container">
    <slot name="image"></slot>
    <h2 class="modal-title"><slot name="title"></slot></h2>
  </div>
</template>

<script>
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    // Переменные
    const store = useStore();
    const modalIsActive = computed(() => store.state.modalIsActive);

    // Начальное значение модального окна
    onMounted(() => {
      store.commit("TOGGLE_MODAL", (store.state.modalIsActive = false));
    });

    // Исчезновение сообщения после 6 секунд
    watch(modalIsActive, (value) => {
      if (value == true) {
        setTimeout(() => {
          store.commit("TOGGLE_MODAL", (store.state.modalIsActive = false));
        }, 6000);
      }
    });

    return {
      modalIsActive,
    };
  },
};
</script>

<style scoped>
.modal-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  bottom: -25px;
  width: 450px;
  left: 0;
  bottom: 15px;
  padding: 15px 0;
  background-color: var(--c-bg-navbar);
  border: 1px dashed var(--c-text-white);
  border-radius: 20px;
  animation: hide 6s;
}
.modal-title {
  font-size: 18px;
  padding-left: 10px;
}
@keyframes hide {
  from {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
