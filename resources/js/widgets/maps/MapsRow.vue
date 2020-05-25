<template>
	<tr>
		<td>
			<input v-if="editMode" type="text" class="uk-input fullWidth" v-model="location.title">
			<div v-else>
				{{ location.title }}
			</div>
		</td>

		<td>
			<input v-if="editMode" type="text" class="uk-input fullWidth" v-model="location.address">
			<div v-else>
				{{ location.address }}
			</div>
		</td>

		<td>
			<input v-if="editMode" type="text" class="uk-input fullWidth" v-model="location.lat">
			<div v-else>
				{{ location.lat }}
			</div>
		</td>

		<td>
			<input v-if="editMode" type="text" class="uk-input fullWidth" v-model="location.lng">
			<div v-else>
				{{ location.lng }}
			</div>
		</td>

		<td class="uk-button-group">
			<div v-if="!location.id">
				<a class="uk-icon-button uk-button-success roundedButton"
					@click="addLoc(location)" uk-icon="plus" uk-tooltip="Create Location" />
			</div>
			<div v-else-if="!editMode">
				<button class="uk-icon-button uk-button-primary roundedButton"
						@click="editMode = true"
						uk-icon="file-edit" uk-tooltip="Edit row" />

				<button class="uk-icon-button uk-button-danger roundedButton"
						@click="delLocation(location)"
						uk-icon="trash" uk-tooltip="Delete Row" />
			</div>
			<div v-else>
				<button class="uk-icon-button uk-button-primary roundedButton"
						@click="saveChanges(location)" :disabled="isChanged"
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
	props: ['location',],

	data() {
	    return {
			og: null,
	        editMode: false
	    }
	},
	computed: {
	    isChanged() {
	        return JSON.stringify(this.og) === JSON.stringify(this.location)
	    },
		...mapGetters('settings', {
			activeUser:     'getUser',
		})
	},

	methods: {
		validateForm(form) {
			// Hardcoded rules. Maybe should fetch table definition to have this autofilled out
			let isRequired = {
				title: true,
				address: true,
				lng: true,
				lat: true
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

		saveChanges(location) {
			// Early escape if the form fails validation
			if (!this.validateForm(location))
				return

			this.updateLocation(location).then(() => {
				UIkit.notification({
					message: `<span uk-icon=\'icon: check\'></span> Location ${location.id ? 'updated' : 'added'} successfully!`,
					status: 'success'
				})

				// If it's a new location, clear the new object so another can be created
				if (!this.og.id) {
					this.location = this.$parent.blankObject
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

		addLoc(location) {
			// Only create a location if we know the user
			if (this.activeUser) {
				// Add the user id
				location.user_id = this.activeUser.id

				// Add the loc to the db
				this.saveChanges(location)
			} else {
				UIkit.notification({
					message: `<span uk-icon=\'icon: close\'></span> Could not find current user details`,
					status: 'danger'
				})
			}
		},

		async delLocation(location) {
			let swalResult = await Swal.fire({
				position: 'top',

				title: 'Are you sure you want to delete this location?',
				text: 'This can\'t be undone!',
				icon: 'warning',

				showCancelButton: true,
				confirmButtonColor: '#f0506e',
				confirmButtonText: 'Yes, delete it!',
				cancelButtonColor: '#222',
				cancelButtonText: 'No, cancel'
			})

			if (swalResult.value) {
				this.deleteLocation(location).then(() => {
					UIkit.notification({
						message: `<span uk-icon="icon: warning"></span> Deleted Location!`,
						status: 'danger'
					})
				})
			}
		},

		restore() {
			this.location = {...this.og}
			this.editMode = false
		},

		...mapActions('settings', {
			updateLocation: 'updateLocation',
			deleteLocation: 'deleteLocation',
		})
	},

	mounted() {
	    this.og = {...this.location}

		if (!this.location.id)
			this.editMode = true
	},
}
</script>

<style scoped>
	.uk-icon-button {
		height: 40px;
		width:  40px;
	}
</style>
