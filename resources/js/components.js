Vue.component('maindisplay', require('./components/main.vue'));

Vue.component('weather', require('./components/weather.vue'));
Vue.component('widgets', require('./components/widgets.vue'));


// Location services
import VueGeolocation from 'vue-browser-geolocation';
Vue.use(VueGeolocation);
