/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
// Import the vuex store with its modules for managing state
import store from './store/store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueGeolocation from 'vue-browser-geolocation';
import * as VueGoogleMaps from 'vue2-google-maps'


window.Vue = require('vue');
Vue.config.productionTip = false

// Register all Vue components in a components file for global access and cleaner code
require('./components.js');

const EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
    $bus: {
        get: function() {
            return EventBus;
        }
    }
});

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
Vue.use(VueAxios, axios)
Vue.use(VueGeolocation);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAnTaE5aRbrHcbnzpKErFm7l2lrlUAzRHM',
    libraries: 'places', // This is required if you use the Autocomplete plugin
  },
})


const app = new Vue({
    store,
    el: '#app',
});
