import Home from './pages/Home.vue';
import Settings from './pages/Settings.vue';

import News from './widgets/news/Newspage.vue';
import Trello from './widgets/trello/Trellopage.vue';
import Notes from './widgets/notes/NotesDisplay.vue';

const routes = [
    {
		path: '/',
		name: 'Home',
		component: Home, //'./pages/Home.vue'
	},
    {
		path: '/settings',
		name: 'Settings',
		component: Settings, //'./pages/Settings.vue'
	},
	{
		path: '/news',
		name: 'News',
		component: News, //'./widgets/news/Newspage.vue'
	},
	{
		path: '/trello',
		name: 'Trello',
		component: Trello, //'./widgets/trello/Trellopage.vue'
	},
	{
		path: '/notes',
		name: 'Notes',
		component: Notes, //'./widgets/notes/NotesDisplay.vue'
	},
];

export default routes;
