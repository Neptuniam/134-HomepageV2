<template>
<tr class="row middle-xs textBody SettingsRow">
	<div class="uk-sortable-handle col-xs-1 start-xs" uk-icon="icon: grid; ratio: 1.5"></div>

	<div class="col-xs">
		<input v-if="editMode" type="text" class="col-xs uk-input" v-model="dataObject.title">
		<div v-else>
		    {{dataObject.title}}
		</div>
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
			dataObject.pos = this.$parent.$parent.getCategorys.length
			return this.createCategory(dataObject)
		},

		...mapActions('settings', {
			updateAction: 'updateCategory',
			createCategory: 'updateCategory',
			deleteAction: 'deleteCategory',
			fetchAction:  'fetchCategorys',

		})
	}
}
</script>
