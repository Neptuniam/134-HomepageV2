Vue.component('maindisplay', require('./components/MainDisplay.vue').default);

Vue.component('weather', require('./components/WeatherDisplay.vue').default);
Vue.component('WidgetsDisplay', require('./components/WidgetsDisplay.vue').default);


// Location services
import VueGeolocation from 'vue-browser-geolocation';
Vue.use(VueGeolocation);
