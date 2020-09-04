<template>
<div>
    <span v-if="!dataObject.id">
        <a class="uk-icon-button uk-button-success roundedButton uk-box-shadow-hover-xlarge"
           @click="createNew(dataObject)" uk-icon="plus" uk-tooltip="Add Row" />
    </span>
    <span v-else-if="!editMode">
        <button class="uk-icon-button uk-button-primary roundedButton"
                @click="$parent.editMode = true"
                uk-icon="file-edit" uk-tooltip="Edit Row" />

        <button class="uk-icon-button uk-button-danger roundedButton"
                @click="deleteRow(dataObject)"
                uk-icon="trash" uk-tooltip="Delete Row" />
    </span>
    <span v-else>
        <button class="uk-icon-button uk-button-primary roundedButton"
                @click="saveChanges(dataObject)" :disabled="isChanged"
                uk-icon="file-text" uk-tooltip="Save Changes" />

        <button class="uk-icon-button uk-button-danger roundedButton"
                @click="restore"
                uk-icon="close" uk-tooltip="Discard changes" />
    </span>

    <button v-if="dataObject.src" class="uk-icon-button uk-button-secondary roundedButton" uk-tooltip="Download Image">
        <a :href="dataObject.src" class="modal-field-body" download uk-icon="download"></a>
    </button>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    props: {
        dataObject: Object,
        editMode: Boolean,
        sortable: Boolean
    },

    computed: {
        isChanged() {
            return JSON.stringify(this.$parent.og) === JSON.stringify(this.$parent.dataObject)
        },

        ...mapGetters('settings', {
            activeUser: 'getUser'
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

        saveChanges(dataObject) {
            // Early escape if the form fails validation
            // if (!this.validateForm(dataObject))
            //     return

            this.$parent.updateAction(dataObject).then(() => {
                UIkit.notification({
                    message: `<span uk-icon=\'icon: check\'></span> ${this.$parent.og.id ? 'updated' : 'added'} successfully!`,
                    status: 'success'
                })

                // If it's a new dataObject, clear the new object so another can be created
                if (!this.$parent.og.id) {
                    this.dataObject = this.$parent.blankObject
                } else {
                    this.$parent.editMode = false
                }
            }).catch(error => {
                console.log('Error:', error);

                UIkit.notification({
                    message: '<span uk-icon=\'icon: check\'></span> Error: '+ error.response.data.message,
                    status: 'danger'
                })
            })
        },

        createNew(dataObject) {
            // Only create a dataObject if we know the user
            if (this.activeUser) {
                // Add the user id
                dataObject.user_id = this.activeUser.id

                // Add the fav to the db
                this.$parent.createAction(dataObject).catch(error => {
                    console.log(error, error.response, error.response.data);
                    UIkit.notification({
                        message: `<span uk-icon="icon: warning"></span> ` + error.response.data.message,
                        status: 'danger'
                    })
                })
            } else {
                UIkit.notification({
                    message: `<span uk-icon=\'icon: close\'></span> Could not find current user details`,
                    status: 'danger'
                })
            }
        },

        async deleteRow(dataObject) {
            let swalResult = await Swal.fire({
                position: 'top',

                title: 'Are you sure you<br>want to delete this?',
                text: 'This can\'t be undone!',
                icon: 'warning',

                showCancelButton: true,
                confirmButtonColor: '#f0506e',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonColor: '#222',
                cancelButtonText: 'No, cancel'
            })

            if (swalResult.value) {
                this.$parent.deleteAction(dataObject).then(() => {
                    this.$parent.fetchAction()

                    UIkit.notification({
                        message: `<span uk-icon="icon: warning"></span> Deleted!`,
                        status: 'danger'
                    })
                }).catch(error => {
                    UIkit.notification({
                        message: `<span uk-icon="icon: warning"></span> ` + error.response.data.message,
                        status: 'danger'
                    })
                })
            }
        },

        restore() {
            this.$parent.dataObject = {...this.$parent.og}
            this.$parent.editMode = false
        },

        ...mapActions('settings', ['uploadFile'])
    },
}
</script>

<style scoped>

</style>
