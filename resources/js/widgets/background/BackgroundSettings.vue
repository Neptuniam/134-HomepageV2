<template>
<div class="BackgroundSettings start-xs">
	<button class="uk-button uk-button-muted uk-text-capitalize roundedButton" @click="action">
		Upload +
	</button>

	<div class="row fullWidth">
		<BackgroundCard v-for="background in backgrounds" :key="background" :background="background" class="col-xs-3 CardContainer" />
	</div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters('settings', {
		    backgrounds: 'getBackgrounds',
		})
	},

	methods: {
		action() {
			UIkit.notification({message: "Coming Soon -Mark Sansome", status:'primary'})
		},
		...mapActions('settings', {
		    fetchBackgrounds: 'fetchBackgrounds',
		})
	},

	mounted() {
	    this.fetchBackgrounds()
	},
}
</script>

<style scoped>
	.BackgroundSettings {
		/* position: relative; */
	}

	button {
		position: fixed;
		top: 60px;
		left: 10px;

		color: black;
	}

	.col-xs-3 {
		height: 30vh;
		margin: 10px 0px;
	}
</style>
