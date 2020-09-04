<template>
<div class="row middle-xs textBody SettingsRow">
	<div class="col-xs-2">
	    {{dataObject.id}}
	</div>

	<div class="col-xs">
		<input v-if="editMode" type="text" class="uk-input fullWidth" v-model="dataObject.name">
		<div v-else>
			{{ dataObject.name }}
		</div>
	</div>

	<div class="col-xs">
		<div v-if="dataObject.id && dataObject.id !== activeUser.id">
		    Can only edit your password
		</div>
		<input v-else-if="editMode" type="text" class="col-xs uk-input" v-model="dataObject.pass">
	</div>

	<div class="col-xs-2">
		{{ util.createDisplayDate(dataObject.updated_at) }}
	</div>

	<div class="col-xs-2 center-xs uk-button-group">
		<SettingsControlButtons :dataObject="dataObject" :editMode="editMode" />
	</div>
</div>
</template>

<script>
import { mapActions } from 'vuex';
import SettingsRow from './SettingsRow'

export default {
	extends: SettingsRow,

	methods: {
        ...mapActions('settings', {
            updateAction: 'updateUser',
			createAction: 'createUser',
            deleteAction: 'deleteUser',
			fetchAction:  'fetchUsers'
        })
	}
}
</script>

<style>
</style>
