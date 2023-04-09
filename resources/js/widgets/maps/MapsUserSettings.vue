<template>
<div v-if="mapsSettings && remainingLocations && remainingLocations.length" class="row center-xs middle-xs fullWidth">
	<div class="col-xs-3">
		<custom-select
			:options="remainingLocations"
			title="Home Location"
			value="id"
			display="title"
			:selected.sync="mapsSettings.home_id"
			@change="updateMapSettings(mapsSettings)"
		/>
	</div>

	<div class="col-xs-3">
		<custom-select
			:options="remainingLocations"
			title="Favourite Location"
			value="id"
			display="title"
			:selected.sync="mapsSettings.fav_id"
			@change="updateMapSettings(mapsSettings)"
		/>
	</div>

	<div class="col-xs-3 start-xs">
		<custom-select
			title="Transportation Method"
			:selected.sync="mapsSettings.method"
			@change="updateMapSettings(mapsSettings)"
		>
			<template v-slot:option="{ selectOption, filterOption }">
				<option v-if="filterOption('Driving')" @click="selectOption('DRIVING', 'Driving')" value="DRIVING">
					Driving
				</option>

				<option v-if="filterOption('Bus')" @click="selectOption('TRANSIT', 'Bus')" value="TRANSIT">
					Bus
				</option>

				<option v-if="filterOption('Walking')" @click="selectOption('WALKING', 'Walking')" value="WALKING">
					Walking
				</option>
			</template>
		</custom-select>
	</div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	computed: {
		remainingLocations() {
			if (this.locations)
				return this.locations
				// return this.locations.filter(location => location.favourite == null)
		},
		...mapGetters('settings', {
			locations:      'getLocations',
			mapsSettings:   'getMapsSettings',
		})
	},

	methods: {
		...mapActions('settings', {
			updateMapSettings:  'updateMapSettings',
		})
	},
}
</script>

<style scoped>
	.uk-form-label {
		padding-left: 15px;
	}
</style>
