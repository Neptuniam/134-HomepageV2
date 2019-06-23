// Pages
Vue.component('maindisplay', require('./pages/maindisplay.vue').default);
Vue.component('Home', require('./pages/Home.vue').default);
Vue.component('Settings', require('./pages/Settings.vue').default);


// Widgets
Vue.component('weather', require('./widgets/weatherdisplay.vue').default);
Vue.component('maps', require('./widgets/mapsdisplay.vue').default);
Vue.component('favourites', require('./widgets/favouritesBar.vue').default);
Vue.component('Calendar', require('./widgets/Calendar.vue').default);
Vue.component('DateTime', require('./widgets/DateTime.vue').default);
