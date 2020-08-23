<template>
	<button :class="`uk-button ${buttonColour} roundedButton bigForm noSelect ripple`"
			@click="action" :disabled="loading || isDisabled"
	>
		<span v-if="loading" uk-spinner />
		<span v-else>
			{{title}}
		</span>
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
<style scoped>
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

	button {
		-webkit-tap-highlight-color:transparent;
	}

	.extraSpacing {
		margin-top: 50px !important
	}
</style>

<style>
	.uk-button {
		margin: 15px auto !important;
		line-height: 42px !important;
	}

	.uk-button:disabled {
		color: #2c3e50 !important;
		cursor: not-allowed !important;
	}

	.uk-button-primary {
		/* background: var(--main-gradient) !important; */
		color: white !important;
	}
	.uk-button-secondary {
		/* background-color: white !important; */
		/* border: 1.5px var(--primary-blue) solid !important; */
		/* color: var(--primary-blue) !important; */
	}
	.uk-button-danger {
		/* background: var(--danger-gradient) !important; */
		color: white !important;
	}
	.uk-button-accent {
		/* background: var(--accent-gradient); */
		color: white !important;
	}
	.uk-button-default, .uk-button-muted {
		color: #333 !important;
	}
	.uk-button-text {
		color: #333 !important;
	}

	button {
		-webkit-tap-highlight-color:transparent;
	}

	.uk-icon.uk-spinner {
		color: white !important;
	}
</style>
