<template>
<div v-if="mapsSettings && remainingLocations && remainingLocations.length" class="row center-xs middle-xs fullWidth">
	<div class="col-xs-3">
		<!-- <span class="row uk-form-label fullWidth textColor textBody">
			Home Location
		</span>

		<div class="uk-form-controls fullWidth">
			<select class="uk-select" @change="updateMapSettings(mapsSettings)" v-model="mapsSettings.home_id">
				<option value=""></option>
				<option v-for="location in remainingLocations" :value="location.id">
					{{location.title}}
				</option>
			</select>
		</div> -->

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
		<!-- <span class="row uk-form-label fullWidth textColor textBody">
			Favourite Location
		</span>

		<div class="uk-form-controls fullWidth">
			<select class="uk-select" @change="updateMapSettings(mapsSettings)" v-model="mapsSettings.fav_id">
				<option value=""></option>
				<option v-for="location in remainingLocations" :value="location.id">
					{{location.title}}
				</option>
			</select>
		</div> -->

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
		<!-- <span class="row uk-form-label fullWidth textColor textBody">
			Transportation Method
		</span>

		<div class="uk-form-controls fullWidth">
			<select class="uk-select" @change="updateMapSettings(mapsSettings)" v-model="mapsSettings.method">
				<option value=""></option>
				<option value="DRIVING">Driving</option>
				<option value="TRANSIT">Bus</option>
				<option value="WALKING">Walking</option>
			</select>
		</div> -->

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
