<template>
<tr class="row middle-xs textBody SettingsRow">
	<div class="uk-sortable-handle col-xs-1 start-xs" uk-icon="icon: grid; ratio: 1.5"></div>

	<div class="col-xs-2">
		<input v-if="editMode" type="text" class="col-xs uk-input" v-model="favourite.title">
		<div v-else>
		    {{favourite.title}}
		</div>
	</div>

	<div class="col-xs">
		<input v-if="editMode" type="text" class="col-xs uk-input" v-model="favourite.url">
		<div v-else>
		    {{favourite.url}}
		</div>
	</div>

	<div class="col-xs ">
		<span v-if="editMode" uk-form-custom="target: true" class="fullWidth">
			<input type="file" class="uk-input" @change="upload">
			<input class="uk-input" type="text" :placeholder="favourite.src ? favourite.src : 'Click here to upload a file'">
		</span>
		<span v-else>
		    {{favourite.src}}
		</span>
	</div>

	<div class="col-xs-2 center-xs uk-button-group">
		<div v-if="!favourite.id">
		    <a class="uk-icon-button uk-button-success roundedButton uk-box-shadow-hover-xlarge"
			   @click="addFav(favourite)" uk-icon="plus" uk-tooltip="Create Favourite" />
		</div>
		<div v-else-if="!editMode">
			<button class="uk-icon-button uk-button-primary roundedButton"
					@click="editMode = true"
					uk-icon="file-edit" uk-tooltip="Edit row" />

			<button class="uk-icon-button uk-button-danger roundedButton"
					@click="delFavourite(favourite)"
					uk-icon="trash" uk-tooltip="Delete Row" />
		</div>
		<div v-else>
			<button class="uk-icon-button uk-button-primary roundedButton"
					@click="saveChanges(favourite)" :disabled="isChanged"
					uk-icon="file-text" uk-tooltip="Save Changes" />

			<button class="uk-icon-button uk-button-danger roundedButton"
					@click="restore"
					uk-icon="close" uk-tooltip="Discard changes" />
		</div>

		<button v-if="favourite.src" class="uk-icon-button uk-button-secondary roundedButton" uk-tooltip="Download Icon">
			<a :href="favourite.src" class="modal-field-body" download uk-icon="download"></a>
		</button>
	</div>
</tr>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	props: ['favourite'],

	data() {
		return {
			og: null,
			editMode: false
		}
	},
	computed: {
		isChanged() {
			return JSON.stringify(this.og) === JSON.stringify(this.favourite)
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
				url: true,
				src: true
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

		saveChanges(favourite) {
			// Early escape if the form fails validation
			if (!this.validateForm(favourite))
				return

			this.updateFavourite(favourite).then(() => {
				UIkit.notification({
					message: `<span uk-icon=\'icon: check\'></span> Favourite ${favourite.id ? 'updated' : 'added'} successfully!`,
					status: 'success'
				})

				// If it's a new favourite, clear the new object so another can be created
				if (!this.og.id) {
					this.favourite = this.$parent.blankObject
				} else {
					this.editMode = false
				}
			}).catch(error => {
				console.log('Error:', error);

				UIkit.notification({
					message: '<span uk-icon=\'icon: check\'></span> Error: '+error,
					status: 'danger'
				})
			})
		},

		addFav(favourite) {
			// Only create a favourite if we know the user
			if (this.activeUser) {
				// Add the user id
				favourite.user_id = this.activeUser.id
				favourite.pos = this.$parent.favourites.length

				// Add the fav to the db
				this.saveChanges(favourite)
			} else {
				UIkit.notification({
					message: `<span uk-icon=\'icon: close\'></span> Could not find current user details`,
					status: 'danger'
				})
			}
		},

		async delFavourite(favourite) {
			let swalResult = await Swal.fire({
				position: 'top',

				title: 'Are you sure you want to delete this favourite?',
				text: 'This can\'t be undone!',
				icon: 'warning',

				showCancelButton: true,
				confirmButtonColor: '#f0506e',
				confirmButtonText: 'Yes, delete it!',
				cancelButtonColor: '#222',
				cancelButtonText: 'No, cancel'
			})

			if (swalResult.value) {
				this.deleteFavourite(favourite).then(() => {
					UIkit.notification({
						message: `<span uk-icon="icon: warning"></span> Deleted Favourite!`,
						status: 'danger'
					})
				})
			}
		},

		upload(event) {
			this.uploadFile({
				route: '/favourites/upload',
				object: this.favourite,
				file: event.target.files[0]
			}).then(upload => {
				console.log('upload', upload);
				UIkit.notification({
					message: "File Uploaded",
					status: 'success'
				})

				console.log('event', event.target.files[0].name);
				this.favourite.src = event.target.files[0].name
			}).catch(error => {
				UIkit.notification({
					message: "Error: " + error.response,
					status: 'danger'
				})
			})
		},

		restore() {
			this.favourite = {...this.og}
			this.editMode = false
		},

		...mapActions('settings', {
			updateFavourite: 'updateFavourite',
			deleteFavourite: 'deleteFavourite',
			uploadFile: 'uploadFile'
		})
	},

	mounted() {
		this.og = {...this.favourite}

		if (!this.favourite.id)
			this.editMode = true
	},
}
</script>

<style>
	.SettingsRow {
		/* margin: 10px 0px; */
	}
	.SettingsRow input, .SettingsRow div {
		/* margin: 10px 5px; */
	}

	.FavsSettings .col-xs-1 {
		max-width: 60px;
	}
	.FavsSettings .col-xs-2 {
		min-width: 200px;
		max-width: 200px;
	}

	.FavsSettings .uk-icon-button {
		height: 40px;
		width:  40px;
	}
</style>
