import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueApexCharts from 'vue-apexcharts'
import VCalendar from 'v-calendar';
import store from './store'

Vue.config.productionTip = false;

// Draggable vue //
import draggable from "vuedraggable";
Vue.component("draggable", draggable);

// Moment.js //
import moment from "moment";
Vue.prototype.moment = moment;

// Axios.js //
import axios from 'axios'

import router from './router';
axios.defaults.baseURL = process.env.VUE_APP_BASEURL;

Vue.prototype.$axios = axios;

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.use(VCalendar, {
  componentPrefix: 'vc', // Use <vc-calendar /> instead of <v-calendar />
});

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
