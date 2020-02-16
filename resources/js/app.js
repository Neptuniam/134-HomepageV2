// Import the vuex store with its modules for managing state
import store from './store/store'

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
window._   = require('lodash');
window.marked = require("marked");

// Import Vue
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

// Use Uikit icons and make UIkit globally accessible for stuff like notifications
UIkit.use(Icons);
// hack to make uikit (notifications) usable
window.UIkit = UIkit;

Vue.use(VueAxios, axios)
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.MIX_MAPS_KEY,
    // libraries: 'places', // This is required if you use the Autocomplete plugin
  },
})


const app = new Vue({
    store,
    el: '#app',
});
