import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

// Draggable vue //
import draggable from "vuedraggable";
Vue.component("draggable", draggable);

// Moment.js //
import moment from "moment";
Vue.prototype.moment = moment;

// Axios.js //
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_BASEURL

Vue.prototype.$axios = axios

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
