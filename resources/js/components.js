Vue.component('maindisplay', require('./components/maindisplay.vue').default);

Vue.component('weather', require('./components/weatherdisplay.vue').default);
Vue.component('widgets', require('./components/widgetsdisplay.vue').default);


// Location services
import VueGeolocation from 'vue-browser-geolocation';
Vue.use(VueGeolocation);
