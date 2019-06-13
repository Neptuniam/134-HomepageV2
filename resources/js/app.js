/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
// Import the vuex store with its modules for managing state
import store from './store/store'
import axios from 'axios'
import VueAxios from 'vue-axios'


window.Vue = require('vue');
Vue.config.productionTip = false

// Register all Vue components in    the components file for global access and cleaner code
require('./components.js');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
Vue.use(VueAxios, axios)
const app = new Vue({
    store,
    el: '#app',
});
