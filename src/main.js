import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BaseAnimeCard from "./components/base/BaseAnimeCard.vue";
import BaseListCard from "./components/base/BaseListCard.vue";
import BasePaginationButtons from "./components/base/BasePaginationButtons.vue";
import BaseAddBtn from "./components/base/BaseAddBtn.vue";
import BaseModal from "./components/base/BaseModal.vue";

const app = createApp(App);

app.component("BaseAnimeCard", BaseAnimeCard);
app.component("BaseListCard", BaseListCard);
app.component("BasePaginationButtons", BasePaginationButtons);
app.component("BaseAddBtn", BaseAddBtn);
app.component("BaseModal", BaseModal);

app.use(router);
app.use(store);

app.mount("#app");
