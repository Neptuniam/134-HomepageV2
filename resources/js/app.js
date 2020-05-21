import Vue from 'vue'

// Import Vue
window.Vue = require('vue');
Vue.config.productionTip = false

// Register all Vue components in a components file for global access and cleaner code
require('./components.js');


// Import the Vue router and vuex store with its modules for managing state
import VueRouter from 'vue-router'
import store from './store/store'
import routes from './routes'

// Third party dependencies
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as VueGoogleMaps from 'vue2-google-maps'

// Import UIkit (CSS framework) css and Js
import css from 'uikit/dist/css/uikit.min.css';
import Icons from 'uikit/dist/js/uikit-icons.min.js';
import UIkit from 'uikit/dist/js/uikit.min.js'

// Import Flexbox (grid system)
import flexbox from 'flexboxgrid/dist/flexboxgrid.min.css'

// Standard libraries
// window._   = require('lodash');
window.marked = require("marked");

// Initiaize the $bus
const EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
    $bus: {
        get: function() {
            return EventBus;
        }
    }
});

Vue.use(VueRouter);

// Use Uikit icons and make UIkit globally accessible for stuff like notifications
UIkit.use(Icons);
// hack to make uikit (notifications) usable
window.UIkit = UIkit;

Vue.use(VueAxios, axios)
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.MIX_GOOGLE_KEY,
    // libraries: 'places', // This is required if you use the Autocomplete plugin
  },
})


const router = new VueRouter({routes});

const app = new Vue({
    store,
    router,
    el: '#app',
});

// Include our utility function file
require('./utilFunctions.js')
Vue.prototype.util = window.util;

Vue.config.ignoredElements = ['off-canvas-container', 'off-canvas', 'builder-title', 'builder-container']
