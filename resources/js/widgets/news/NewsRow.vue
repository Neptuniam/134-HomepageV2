<template>
<tr class="row middle-xs textBody SettingsRow">
	<div class="uk-sortable-handle col-xs-1 start-xs" uk-icon="icon: grid; ratio: 1.5"></div>

	<div class="col-xs">
		<input v-if="editMode" type="text" class="col-xs uk-input" v-model="category.title">
		<div v-else>
		    {{category.title}}
		</div>
	</div>

	<div class="col-xs-2 center-xs uk-button-group">
		<div v-if="!category.id">
		    <a class="uk-icon-button uk-button-success roundedButton uk-box-shadow-hover-xlarge"
			   @click="addCategory(category)" uk-icon="plus" uk-tooltip="Create Category" />
		</div>
		<div v-else-if="!editMode">
			<button class="uk-icon-button uk-button-primary roundedButton"
					@click="editMode = true"
					uk-icon="file-edit" uk-tooltip="Edit row" />

			<button class="uk-icon-button uk-button-danger roundedButton"
					@click="delCategory(category)"
					uk-icon="trash" uk-tooltip="Delete Row" />
		</div>
		<div v-else>
			<button class="uk-icon-button uk-button-primary roundedButton"
					@click="saveChanges(category)" :disabled="isChanged"
					uk-icon="file-text" uk-tooltip="Save Changes" />

			<button class="uk-icon-button uk-button-danger roundedButton"
					@click="restore"
					uk-icon="close" uk-tooltip="Discard changes" />
		</div>
	</div>
</tr>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	props: ['category'],

	data() {
		return {
			og: null,
			editMode: false
		}
	},
	computed: {
		isChanged() {
			return JSON.stringify(this.og) === JSON.stringify(this.category)
		},
		...mapGetters('settings', {
			activeUser:     'getUser',
		})
	},

	methods: {
		validateForm(form) {
			// Hardcoded rules. Maybe should fetch table definition to have this autofilled out
			let isRequired = {
				title: true
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

		saveChanges(category) {
			// Early escape if the form fails validation
			if (!this.validateForm(category))
				return

			this.updateCategory(category).then(() => {
				UIkit.notification({
					message: `<span uk-icon=\'icon: check\'></span> Category ${category.id ? 'updated' : 'added'} successfully!`,
					status: 'success'
				})

				// If it's a new category, clear the new object so another can be created
				if (!this.og.id) {
					this.category = this.$parent.blankObject
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

		addCategory(category) {
			// Only create a category if we know the user
			if (this.activeUser) {
				// Add the user id
				category.user_id = this.activeUser.id
				category.pos = this.$parent.categorys.length

				// Add the fav to the db
				this.saveChanges(category)
			} else {
				UIkit.notification({
					message: `<span uk-icon=\'icon: close\'></span> Could not find current user details`,
					status: 'danger'
				})
			}
		},

		async delCategory(category) {
			let swalResult = await Swal.fire({
				position: 'top',

				title: 'Are you sure you want to delete this category?',
				text: 'This can\'t be undone!',
				icon: 'warning',

				showCancelButton: true,
				confirmButtonColor: '#f0506e',
				confirmButtonText: 'Yes, delete it!',
				cancelButtonColor: '#222',
				cancelButtonText: 'No, cancel'
			})

			if (swalResult.value) {
				this.deleteCategory(category).then(() => {
					UIkit.notification({
						message: `<span uk-icon="icon: warning"></span> Deleted Category!`,
						status: 'danger'
					})
				})
			}
		},

		restore() {
			this.category = {...this.og}
			this.editMode = false
		},

		...mapActions('settings', {
			updateCategory: 'updateCategory',
			deleteCategory: 'deleteCategory'
		})
	},

	mounted() {
		this.og = {...this.category}

		if (!this.category.id)
			this.editMode = true
	},
}
</script>

<style>
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
