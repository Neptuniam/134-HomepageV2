<template>
<div class="BackgroundCard" :class="{'blur': hover}" @mouseover="hover = true" @mouseleave="hover = false">
	<img uk-img class="card" :data-src="`images/backgrounds/${background}`" alt="Background Image Option">

	<div v-if="hover" class="hoverAffect row fullWidth center-xs">
		<div class="col-xs-3" />

		<div class="col-xs">
			<span class="uk-icon-button clickable setBackground" @click="setBackground"
				uk-icon="image" uk-tooltip="Set as background" />
		</div>

		<div class="col-xs">
			<a class="uk-icon-button clickable downloadBackground"
				uk-icon="download" uk-tooltip="Download"
				:href="'images/backgrounds/'+this.background" download/>
		</div>

		<div class="col-xs">
    		<span class="uk-icon-button clickable deleteBackground" @click="deleteBackground"
				uk-icon="trash" uk-tooltip="Delete" />
	    </div>

		<div class="col-xs-3" />
	</div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	props: ['background'],

	data() {
	    return {
	        hover: false
	    }
	},

	methods: {
		setBackground() {
			document.body.style.background = "url('images/backgrounds/"+this.background+"')"
			document.body.style.backgroundSize = "cover";
		},

		deleteBackground() {
			this.axios.post('/background/delete', {name: this.background}).then(() => {
				UIkit.notification({
					message: "File Deleted",
					status: 'success'
				})

				this.fetchBackgrounds()
			})
		},

	    action() {
			UIkit.notification({message: "Coming Soon -Mark Sansome", status:'primary'})
	    },

		...mapActions('settings', {
		    fetchBackgrounds: 'fetchBackgrounds',
		})
	},
}
</script>

<style scoped>
	.card {
		height: 100%;
		width: 100%;

		object-fit: cover;
	}
	.blur .card {
		opacity: 50%;
	}


	.BackgroundCard {
		position: relative;
	}

	.hoverAffect {
		position: absolute;
		top: 50%;
		/* left: 50%; */
		margin: auto;
	}

	.setBackground {
		color: blue;
	}
	.downloadBackground {
		color: blue;
	}
	.deleteBackground {
		color: red;
	}
</style>
