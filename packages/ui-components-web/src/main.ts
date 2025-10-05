import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// 모든 전역 CSS를 포함하는 main.css를 import 합니다.
import "./styles/main.css";
import router from "./router";

const app = createApp(App);
app.use(router);
app.mount("#app");
