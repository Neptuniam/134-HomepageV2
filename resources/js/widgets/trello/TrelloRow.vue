<template>
<tr class="row middle-xs textBody SettingsRow">
	<div class="col-xs">
		<input v-if="editMode" type="text" class="col-xs uk-input" v-model="dataObject.board_id">
		<div v-else>
		    {{dataObject.board_id}}
		</div>
	</div>

	<div class="col-xs">
		<input v-if="editMode" type="text" class="col-xs uk-input" v-model="dataObject.developer_key">
		<div v-else>
		    {{dataObject.developer_key}}
		</div>
	</div>

	<div class="col-xs">
		<input v-if="editMode" type="text" class="col-xs uk-input" v-model="dataObject.token">
		<span v-else>
		    {{dataObject.token}}
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
		...mapActions('settings', {
			updateAction: 'updateTrelloCredentials',
			createAction: 'updateTrelloCredentials',
			deleteAction: 'deleteTrelloCredentials',
			fetchAction:  'fetchTrelloCredentials'
		})
	}
}
</script>
