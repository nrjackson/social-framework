import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default class Store extends Vuex.Store {
  public static state = {
    postsVersion: 0
  }

  public static mutations = {
    increment (postsVersion) {
      postsVersion.count++
    }
  }
}
