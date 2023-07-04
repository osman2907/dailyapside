import createPersistedState from "vuex-persistedstate";
import Vuex from 'vuex'
import Vue from "vue";

Vue.use(Vuex);

const store = new Vuex.Store({
    state () {
      return {
        loggedIn: false,
        tokenExpired: false,
      }
    },
    getters: {
      isLoggedIn: state => {
        return state.loggedIn;
      },
      tokenExpired: state => {
        return state.tokenExpired;
      }
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
      },
      tokenExpired (state) {
        state.tokenExpired = true;
      },
      confirmTokenExpired (state) {
        state.tokenExpired = false;
      }
    },
    actions: {
      login ({ commit }, data) {
        commit('login', data)
      },
      logout ({ commit }) {
        commit('logout')
      },
      tokenExpired ({ commit }) {
        commit('tokenExpired')
      }
    },
    plugins: [createPersistedState()]
  });

export default store;