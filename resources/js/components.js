// Pages
Vue.component('maindisplay',        require('./pages/MainDisplay.vue').default);
Vue.component('Idle',        require('./pages/Idle.vue').default);


// Widgets
Vue.component('Weather',            require('./widgets/weather/WeatherDisplay.vue').default);

Vue.component('BackgroundSettings',	require('./widgets/background/BackgroundSettings.vue').default);
Vue.component('BackgroundCard',		require('./widgets/background/BackgroundCard.vue').default);

Vue.component('News',               require('./widgets/news/NewsDisplay.vue').default);
Vue.component('NewsSettings',       require('./widgets/news/NewsSettings.vue').default);
Vue.component('NewsRow',            require('./widgets/news/NewsRow.vue').default);

Vue.component('Maps',               require('./widgets/maps/MapsDisplay.vue').default);
Vue.component('MapsSettings',       require('./widgets/maps/MapsSettings.vue').default);
Vue.component('MapsUserSettings', 	require('./widgets/maps/MapsUserSettings.vue').default);
Vue.component('MapsRow',       		require('./widgets/maps/MapsRow.vue').default);

Vue.component('Favourites',         require('./widgets/favourites/FavsDisplay.vue').default);
Vue.component('FavSettings',        require('./widgets/favourites/FavsSettings.vue').default);
Vue.component('FavsRow',        	require('./widgets/favourites/FavsRow.vue').default);

Vue.component('QOTD',               require('./widgets/QOTD/QotdDisplay.vue').default);

Vue.component('TrelloDisplay',      require('./widgets/trello/TrelloDisplay.vue').default);
Vue.component('TrelloSettings',    	require('./widgets/trello/TrelloSettings.vue').default);
Vue.component('TrelloRow',    		require('./widgets/trello/TrelloRow.vue').default);
Vue.component('CardBuilder',      	require('./widgets/trello/CardBuilder.vue').default);
Vue.component('Card',      			require('./widgets/trello/Card.vue').default);

Vue.component('DistinctApi',        require('./widgets/analytics/DistinctApi.vue').default);
Vue.component('Timeline',           require('./widgets/analytics/Timeline.vue').default);
Vue.component('AverageUsage',       require('./widgets/analytics/AverageUsage.vue').default);
Vue.component('Details',            require('./widgets/analytics/Details.vue').default);
Vue.component('HourUsage',          require('./widgets/analytics/HourUsage.vue').default);
Vue.component('DayUsage',           require('./widgets/analytics/DayUsage.vue').default);
Vue.component('ApiUsage',           require('./widgets/analytics/ApiUsage.vue').default);
Vue.component('SourceType',         require('./widgets/analytics/SourceType.vue').default);
Vue.component('UserUsage',          require('./widgets/analytics/UserUsage.vue').default);


// Vue.component('Calendar',           require('./widgets/calendar/CalendarDisplay.vue').default);

Vue.component('WidgetsSettings',    require('./components/WidgetsSettings.vue').default);
Vue.component('LoginSettings',      require('./components/LoginSettings.vue').default);


Vue.component('DateTime',           require('./components/DateTime.vue').default);
Vue.component('ControlBar',         require('./components/ControlBar.vue').default);
Vue.component('FilePreviewer',      require('./components/FilePreviewer.vue').default);

Vue.component('CustomInput',        require('./components/CustomInput.vue').default);
Vue.component('CustomButton',       require('./components/CustomButton.vue').default);


// Packages
Vue.component('vueCustomScrollbar', require('vue-custom-scrollbar'));
