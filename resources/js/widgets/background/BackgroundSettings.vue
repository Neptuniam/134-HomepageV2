<template>
<div class="BackgroundSettings start-xs">
	<span uk-form-custom="target: true">
        <input type="file" class="uk-input" @change="upload" multiple>
        <input class="uk-button uk-button-muted uk-text-capitalize roundedButton" type="text" placeholder="Upload +">
    </span>

	<div class="row fullWidth">
		<BackgroundCard v-for="background in backgrounds" :key="background" :background="background" class="col-xs-3 CardContainer" />
	</div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	data() {
	    return {
	        file: null
	    }
	},

	computed: {
		...mapGetters('settings', {
		    backgrounds: 'getBackgrounds',
		})
	},

	methods: {
		upload(event) {
			for (const file of event.target.files) {
				this.uploadFile({
					route: '/background/upload',
					file: file
				}).then(upload => {
					UIkit.notification({
						message: "File Uploaded",
						status: 'success'
					})

					this.file = null
					this.fetchBackgrounds()
				}).catch(error => {
					UIkit.notification({
						message: "Error: " + error.response,
						status: 'danger'
					})
				})
			}

        },

		...mapActions('settings', {
		    fetchBackgrounds: 'fetchBackgrounds',
			uploadFile: 'uploadFile'
		})
	},

	mounted() {
	    this.fetchBackgrounds()
	},
}
</script>

<style scoped>
	.BackgroundSettings {
		/* position: relative; */
	}

	span {
		position: fixed;
		top: 60px;
		left: 10px;

		color: black;
	}

	.col-xs-3 {
		height: 30vh;
		margin: 10px 0px;
	}
</style>
