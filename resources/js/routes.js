import Home from './pages/Home.vue';
import Settings from './pages/Settings.vue';

import News from './widgets/news/Newspage.vue';
import Trello from './widgets/trello/Trellopage.vue';
import Notes from './widgets/notes/NotesDisplay.vue';

const routes = [
    {
		path: '/',
		name: 'Home',
		component: Home,
	},
    {
		path: '/settings',
		name: 'Settings',
		component: Settings,
	},
	{
		path: '/news',
		name: 'News',
		component: News,
	},
	{
		path: '/trello',
		name: 'Trello',
		component: Trello,
	},
	{
		path: '/notes',
		name: 'Notes',
		component: Notes,
	},
];

export default routes;
