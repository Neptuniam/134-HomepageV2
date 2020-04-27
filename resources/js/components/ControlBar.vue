<template>
<div v-if="widgets && widgets.length" class="ControlBar">
	<div v-if="$route.name == 'Home'" class="row start-xs middle-xs pageControl">
        <router-link to="/settings" class="col-xs-3">
            <span class="uk-icon" uk-icon="icon: cog; ratio:2;" uk-tooltip="Settings" />
        </router-link>

        <router-link v-if="isActive('News')" to="/news" class="col-xs-3">
            <span class="uk-icon" uk-icon="icon: world; ratio: 2" uk-tooltip="News"/>
        </router-link>

        <router-link v-if="isActive('Trello')" to="/trello" class="col-xs-3" style="position: relative;">
            <span class="uk-icon" uk-icon="icon: gitter; ratio: 2;" uk-tooltip="View Trello Cards" />

			<TrelloDisplay />
        </router-link>

        <router-link v-if="isActive('Notes')" to="/notes" class="col-xs-3">
            <span class="uk-icon" uk-icon="icon: pencil; ratio: 2;" uk-tooltip="Personal Notes" />
        </router-link>
    </div>
    <div v-else class="row start-xs middle-xs pageControl">
        <router-link to="/" class="col-xs-3">
            <span class="uk-icon" uk-icon="icon: home; ratio:2;" uk-tooltip="Back Home" />
        </router-link>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
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
		width: 220px;
	}

	.pageControl .uk-icon {
		color: black;
	}
	.pageControl .uk-icon:hover {
		color: white;
	}
</style>
