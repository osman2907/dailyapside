import Vue from "vue";
import Vuex from 'vuex'
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueApexCharts from 'vue-apexcharts'
import VCalendar from 'v-calendar';
import createPersistedState from "vuex-persistedstate";


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

Vue.use(Vuex)
const store = new Vuex.Store({
  state () {
    return {
      loggedIn: false,
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.loggedIn;
    },
  },
  mutations: {
    login (state, data) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('type', data.type);
      localStorage.setItem('access_token',
        data.type + " " + data.token);
      localStorage.setItem('expires_in', data.expiration);
      state.loggedIn = true;
    },
    logout (state) {
      localStorage.removeItem('token');
      localStorage.removeItem('type');
      localStorage.removeItem('access_token');
      localStorage.removeItem('expires_in');
      state.loggedIn = false;
    }
  },
  actions: {
    login ({ commit }, data) {
      commit('login', data)
    },
    logout ({ commit }) {
      commit('logout')
    }
  },
  plugins: [createPersistedState()]
});

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.use(VCalendar, {
  componentPrefix: 'vc',  // Use <vc-calendar /> instead of <v-calendar />
});

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
