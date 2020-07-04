<template>
	<button :class="`uk-button ${buttonColour} roundedButton ripple`"
			@click="action" :disabled="loading || isDisabled"
	>
		<span v-if="loading" uk-spinner />
		<span v-if="icon" :uk-icon="icon" />
		<span v-else v-html="title" />
	</button>
</template>

<script>
export default {
	props: {
		click: {
			type: Function,
			default: () => {}
		},

		title: {
			type: String,
			default: "SUBMIT"
		},
		icon: {
			type: String,
			default: null
		},

		color: {
			type: String,
			default: 'muted'
		},

		disabled: {}
	},

	data() {
		return {
			loading: false
		}
	},

	computed: {
		isDisabled() {
			// undefined indicates disabled isn't being used
			if (this.disabled != undefined) {
				// expect disabled to be either a function or computed property
				if (typeof this.disabled == 'function')
					return this.disabled()
				return this.disabled
			}

			return false
		},

		buttonColour() {
			if (!this.isDisabled && this.color)
				return `uk-button-${this.color}`
			return ''
		}
	},

	methods: {
		async action() {
			this.loading = true

			await this.click()

			this.loading = false
		}
	},
}
</script>

<!-- Ripple from: https://codeburst.io/create-a-material-design-ripple-effect-without-js-9d3cbee25b3e -->
<style>
	.ripple {
		position: relative;
		overflow: hidden;
		transform: translate3d(0, 0, 0);
	}

	.ripple:after {
		content: "";
		display: block;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		pointer-events: none;
		background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
		background-repeat: no-repeat;
		background-position: 50%;
		transform: scale(10, 10);
		opacity: 0;
		transition: transform .5s, opacity 1s;
	}

	.ripple:active:after {
		transform: scale(0, 0);
		opacity: .3;
		transition: 0s;
	}

</style>
<style scoped>
	button {
		-webkit-tap-highlight-color:transparent;
		color: white !important;
	}
</style>
