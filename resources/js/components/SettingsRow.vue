<template>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    props: ['dataObject'],

	data() {
		return {
			og: null,
			editMode: false
		}
	},
	computed: {
		...mapGetters('settings', {
			activeUser: 'getUser',
		})
	},

    methods: {
        upload(event) {
            this.uploadFile({
                route: '/favourites/upload',
                object: this.dataObject,
                file: event.target.files[0]
            }).then(upload => {
                UIkit.notification({
                    message: "File Uploaded",
                    status: 'success'
                })

                this.dataObject.src = event.target.files[0].name
            }).catch(error => {
                UIkit.notification({
                    message: "Error: " + error.response,
                    status: 'danger'
                })
            })
        },
    },

    mounted() {
		this.og = {...this.dataObject}

		if (!this.dataObject.id)
			this.editMode = true
	},
}
</script>

<style scoped>

</style>
