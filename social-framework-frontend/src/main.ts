// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import VueRx from 'vue-rx';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription'; // Disposable if using RxJS4
import { Subject } from 'rxjs/Subject'; // required for domStreams option
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import VueAxios from 'vue-axios';
import VueAuthenticate from 'vue-authenticate';
import axios from 'axios';
import App from './App.vue';
import router from './router';
// import Store from './store';

Vue.config.productionTip = false;

Vue.use(Vuex);

Vue.use(VueAxios, axios);

Vue.use(VueRx, {
  Observable,
  Subscription,
  Subject,
  BehaviorSubject,
  ReplaySubject
});

Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:3000', // Your API domain

  providers: {
    facebook: {
      clientId: '1927971220769787',
      // redirectUri: 'http://localhost:8080/auth/callback' // Your client app URL
    }
  },

  bindRequestInterceptor: function () {
    this.$http.interceptors.request.use((config) => {
      if (this.isAuthenticated()) {
        config.headers['Authorization'] = [
          this.options.tokenType, this.getToken()
        ].join(' ')
      } else {
        delete config.headers['Authorization']
      }
      return config
    })
  },

  bindResponseInterceptor: function () {
    this.$http.interceptors.response.use((response) => {
      this.setToken(response)
      return response
    })
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: (h) => h(App)
  // components: { App },
  // template: '<App/>',
});
