import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

/* import the  core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import specific icons */
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
/* add icons to the library */
library.add(faCircleCheck, faCircleXmark);

//To Write icons in <i></i> Tags
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();

createApp(App).use(store).use(router).mount("#app");
