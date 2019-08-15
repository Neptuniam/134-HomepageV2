// Pages
Vue.component('maindisplay',        require('./pages/MainDisplay.vue').default);
Vue.component('Home',               require('./pages/Home.vue').default);
Vue.component('Settings',           require('./pages/Settings.vue').default);


// Widgets
Vue.component('Weather',            require('./widgets/weather/weatherdisplay.vue').default);

Vue.component('News',               require('./widgets/news/newsdisplay.vue').default);

Vue.component('Notes',               require('./widgets/notes/NotesDisplay.vue').default);
Vue.component('editable',               require('./widgets/notes/editable.vue').default);

Vue.component('Maps',               require('./widgets/maps/MapsDisplay.vue').default);
Vue.component('MapsSettings',       require('./widgets/maps/MapsSettings.vue').default);

Vue.component('Favourites',         require('./widgets/favourites/FavsDisplay.vue').default);
Vue.component('FavSettings',        require('./widgets/favourites/FavsSettings.vue').default);

Vue.component('Calendar',           require('./widgets/calendar/CalendarDisplay.vue').default);

Vue.component('WidgetsSettings',    require('./widgets/WidgetsSettings.vue').default);
Vue.component('LoginSettings',      require('./widgets/LoginSettings.vue').default);


Vue.component('DateTime',           require('./widgets/DateTime.vue').default);


// Packages
Vue.component('vueCustomScrollbar', require('vue-custom-scrollbar'));
