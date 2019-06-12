import Vue from 'vue';
import Vuex from 'vuex';
import settings from './settings';

Vue.use(Vuex);
let modules = Object.assign({
    settings,
})

export default new Vuex.Store({
    modules: modules
});
