<template>
<tr>
	<td>
		<input v-if="editMode" type="text" class="uk-input fullWidth" v-model="trello.board">
		<div v-else>
			{{ trello.board }}
		</div>
	</td>

	<td class="uk-button-group">
		<div v-if="!trello.id">
			<a class="uk-icon-button uk-button-success roundedButton"
				@click="addRow(trello)" uk-icon="plus" uk-tooltip="Create Location" />
		</div>
		<div v-else-if="!editMode">
			<button class="uk-icon-button uk-button-primary roundedButton"
					@click="editMode = true"
					uk-icon="file-edit" uk-tooltip="Edit row" />

			<button class="uk-icon-button uk-button-danger roundedButton"
					@click="delRow(trello)"
					uk-icon="trash" uk-tooltip="Delete Row" />
		</div>
		<div v-else>
			<button class="uk-icon-button uk-button-primary roundedButton"
					@click="saveChanges(trello)" :disabled="isChanged"
					uk-icon="file-text" uk-tooltip="Save Changes" />

			<button class="uk-icon-button uk-button-danger roundedButton"
					@click="restore"
					uk-icon="close" uk-tooltip="Discard changes" />
		</div>
	</td>
</tr>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	props: ['trello',],

	data() {
	    return {
			og: null,
	        editMode: false
	    }
	},
	computed: {
	    isChanged() {
	        return JSON.stringify(this.og) === JSON.stringify(this.trello)
	    },
		...mapGetters('settings', {
			activeUser:     'getUser',
		})
	},

	methods: {
		validateForm(form) {
			// Hardcoded rules. Maybe should fetch table definition to have this autofilled out
			let isRequired = {
				board: true,
			}

			for (let field in form) {
				if (isRequired[field] == true && !form[field]) {
					UIkit.notification({
						message: `<span uk-icon=\'icon: close\'></span> ${field} is required!`,
						status: 'danger'
					})

					// Return that form failed validation
					return false
				}
			}

			return true
		},

		saveChanges(trello) {
			// Early escape if the form fails validation
			if (!this.validateForm(trello))
				return

			this.updateLocation(trello).then(() => {
				UIkit.notification({
					message: `<span uk-icon=\'icon: check\'></span> Location ${trello.id ? 'updated' : 'added'} successfully!`,
					status: 'success'
				})

				// If it's a new trello, clear the new object so another can be created
				if (!this.og.id) {
					this.trello = this.$parent.blankObject
				} else {
					this.editMode = false
				}
			}).catch(error => {
				console.error(error);
				UIkit.notification({
					message: `<span uk-icon=\'icon: close\'></span> ${error}`,
					status: 'danger'
				})
			})
		},

		addRow(trello) {
			// Only create a trello if we know the user
			if (this.activeUser) {
				// Add the user id
				trello.user_id = this.activeUser.id

				// Add the loc to the db
				this.saveChanges(trello)
			} else {
				UIkit.notification({
					message: `<span uk-icon=\'icon: close\'></span> Could not find current user details`,
					status: 'danger'
				})
			}
		},

		async delRow(trello) {
			let swalResult = await Swal.fire({
				position: 'top',

				title: 'Are you sure you want to delete this trello?',
				text: 'This can\'t be undone!',
				icon: 'warning',

				showCancelButton: true,
				confirmButtonColor: '#f0506e',
				confirmButtonText: 'Yes, delete it!',
				cancelButtonColor: '#222',
				cancelButtonText: 'No, cancel'
			})

			if (swalResult.value) {
				this.deleteLocation(trello).then(() => {
					UIkit.notification({
						message: `<span uk-icon="icon: warning"></span> Deleted Location!`,
						status: 'danger'
					})
				})
			}
		},

		restore() {
			this.trello = {...this.og}
			this.editMode = false
		},

		...mapActions('settings', {
			updateLocation: 'updateLocation',
			deleteLocation: 'deleteLocation',
		})
	},

	mounted() {
	    this.og = {...this.trello}

		if (!this.trello.id)
			this.editMode = true
	},
}
</script>

<style scoped>

</style>
