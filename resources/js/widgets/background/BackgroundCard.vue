<template>
<div class="BackgroundCard" :class="{'blur': hover}"
		 @mouseover="hover = true" @mouseleave="hover = false">
	<img uk-img class="card" :data-src="`images/backgrounds/${background}`" alt="Background Image Option">

	<div v-if="hover" class="hoverAffect row fullWidth center-xs">
			<div class="col-xs-3" />

		  <div class="col-xs">
		  		<span class="uk-icon-button clickable" uk-icon="download" @click="action" />
		  </div>

			<div class="col-xs">
	    		<span class="uk-icon-button clickable" uk-icon="trash" @click="action" />
	    </div>

			<div class="col-xs-3" />
	</div>
</div>
</template>

<script>
export default {
	props: ['background',],

	data() {
	    return {
	        hover: false
	    }
	},

	methods: {
	    action() {
				UIkit.notification({message: "Coming Soon -Mark Sansome", status:'primary'})
	    }
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
</style>
