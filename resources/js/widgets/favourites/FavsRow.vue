<template>
<tr class="row middle-xs textBody SettingsRow">
	<div class="uk-sortable-handle col-xs-1 start-xs" uk-icon="icon: grid; ratio: 1.5"></div>

	<div class="col-xs-2">
		<input v-if="editMode" type="text" class="col-xs uk-input" v-model="dataObject.title">
		<div v-else>
		    {{dataObject.title}}
		</div>
	</div>

	<div class="col-xs">
		<input v-if="editMode" type="text" class="col-xs uk-input" v-model="dataObject.url">
		<div v-else>
		    {{dataObject.url}}
		</div>
	</div>

	<div class="col-xs ">
		<span v-if="editMode" uk-form-custom="target: true" class="fullWidth">
			<input type="file" class="uk-input" @change="upload">
			<input class="uk-input" type="text" :placeholder="dataObject.src ? dataObject.src : 'Click here to upload a file'">
		</span>
		<span v-else>
		    {{dataObject.src}}
		</span>
	</div>

	<div class="col-xs-2 center-xs uk-button-group">
		<SettingsControlButtons :dataObject="dataObject" :editMode="editMode" />
	</div>
</tr>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import SettingsRow from '../../components/SettingsRow'

export default {
	extends: SettingsRow,
	methods: {
		createAction(dataObject) {
			dataObject.pos = this.$parent.$parent.getFavourites.length
			return this.createFavourite(dataObject)
		},

		...mapActions('settings', {
			updateAction: 'updateFavourite',
			createFavourite: 'updateFavourite',
			deleteAction: 'deleteFavourite',
			fetchAction:  'fetchFavourites',
			uploadFile: 'uploadFile'
		})
	}
}
</script>
