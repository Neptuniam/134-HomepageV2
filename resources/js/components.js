// Pages
Vue.component('maindisplay',        require('./pages/MainDisplay.vue').default);


// Widgets
Vue.component('Weather',            require('./widgets/weather/WeatherDisplay.vue').default);

Vue.component('News',               require('./widgets/news/NewsDisplay.vue').default);

Vue.component('Maps',               require('./widgets/maps/MapsDisplay.vue').default);
Vue.component('MapsSettings',       require('./widgets/maps/MapsSettings.vue').default);

Vue.component('Favourites',         require('./widgets/favourites/FavsDisplay.vue').default);
Vue.component('FavSettings',        require('./widgets/favourites/FavsSettings.vue').default);

Vue.component('QOTD',               require('./widgets/QOTD/QotdDisplay.vue').default);

Vue.component('TrelloDisplay',      require('./widgets/trello/TrelloDisplay.vue').default);
Vue.component('TrelloSettings',    	require('./widgets/trello/TrelloSettings.vue').default);
Vue.component('CardBuilder',      	require('./widgets/trello/CardBuilder.vue').default);
Vue.component('Card',      			require('./widgets/trello/Card.vue').default);


// Vue.component('Calendar',           require('./widgets/calendar/CalendarDisplay.vue').default);

Vue.component('WidgetsSettings',    require('./components/WidgetsSettings.vue').default);
Vue.component('LoginSettings',      require('./components/LoginSettings.vue').default);


Vue.component('DateTime',           require('./components/DateTime.vue').default);
Vue.component('ControlBar',         require('./components/ControlBar.vue').default);
Vue.component('FilePreviewer',      require('./components/FilePreviewer.vue').default);


// Packages
Vue.component('vueCustomScrollbar', require('vue-custom-scrollbar'));
