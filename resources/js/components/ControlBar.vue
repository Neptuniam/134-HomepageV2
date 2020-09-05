<template>
<div v-if="widgets && widgets.length" class="ControlBar">
	<div v-if="$route.name == 'Home'" class="row start-xs middle-xs pageControl">
        <router-link to="/settings" class="col-xs-3">
            <!-- <span class="uk-icon" uk-icon="icon: cog; ratio:2;" uk-tooltip="Settings" /> -->
			<Settings fillColor="#000000" :size="40"  uk-tooltip="Settings" />
        </router-link>

		<router-link v-if="isActive('Analytics')" to="/analytics" class="col-xs-3">
			<!-- <span class="uk-icon" uk-icon="icon: database; ratio: 2;" uk-tooltip="Analytics" /> -->
			<Chart fillColor="#000000" :size="40"  uk-tooltip="Analytics" />
		</router-link>

		<router-link v-if="isActive('Notes')" to="/notes" class="col-xs-3">
			<!-- <span class="uk-icon" uk-icon="icon: pencil; ratio: 2;" uk-tooltip="Personal Notes" /> -->
			<Note fillColor="#000000" :size="40"  uk-tooltip="Personal Notes" />
		</router-link>

        <router-link v-if="isActive('Trello')" to="/trello" class="col-xs-3" style="position: relative;">
            <!-- <span class="uk-icon" uk-icon="icon: gitter; ratio: 2;" uk-tooltip="Trello Cards" /> -->
			<Trello fillColor="#000000" :size="40"  uk-tooltip="Trello Cards" />

			<TrelloDisplay />
        </router-link>
    </div>
    <div v-else class="row start-xs middle-xs pageControl">
        <router-link to="/" class="col-xs-3">
            <!-- <span class="uk-icon" uk-icon="icon: home; ratio:2;" uk-tooltip="Back Home" /> -->
			<Home fillColor="#000000" :size="40"  uk-tooltip="Back Home" />
        </router-link>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Home from 'vue-material-design-icons/HomeOutline.vue';
import Settings from 'vue-material-design-icons/CogOutline.vue';
import Trello from 'vue-material-design-icons/Trello.vue';
import Note from 'vue-material-design-icons/NoteTextOutline.vue';
import Chart from 'vue-material-design-icons/finance.vue';

export default {
	components: {
		Home,
		Settings,
		Trello,
		Note,
		Chart
	},

	computed: {
		...mapGetters('settings', {
            widgets:    'getWidgets',
        })
	},

	methods: {
		isActive(widgetTitle) {
			if (this.widgets) {
				let foundWidget = this.widgets.find(widget => widget.title == widgetTitle)
				return foundWidget && foundWidget.status == 1
			}

			return false
        },
	},
}
</script>

<style scoped>
	.pageControl {
		position: fixed;
		top: 10px;
		left: 10px;
		min-width: 220px;

		z-index: 0;
	}

	.pageControl .uk-icon {
		color: black;
	}
	.pageControl .uk-icon:hover {
		color: white;
	}
</style>
