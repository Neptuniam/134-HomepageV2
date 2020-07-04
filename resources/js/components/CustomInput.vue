<!-- Credit: https://codepen.io/sivan/pen/alKwf -->
<template>
<div class="fieldRow" :class="{ 'transitioned': !!inputData }">
	<input class="uk-input roundedEdge bigForm"
		:type="inputType"
		:id="uniqueID"
		:value="input"
		:pattern="pattern"
		@input="handleInput"
		@keypress="checkAllowed"
	>

	<span class="row center-xs">
		<label :for="uniqueID" :name="uniqueID"> {{placeholder}} </label>
	</span>
</div>
</template>

<script>
export default {
	props: {
		inputType: {
			type: String,
			default: 'text'
		},
		placeholder: {
			type: String
		},
		pattern: {
			type: String
		},
		mask: {
			type: Function,
			default: null
		},
		inputData: {}
	},

	data() {
		return {
			input: this.addMask(this.inputData),
			uniqueID: `name${this.placeholder}${(new Date()).getTime()}`
		}
	},

	methods: {
		handleInput($event) {
			/*
				So far our only mask is phone number.
				So we can get away with demasking the input but stripping all non number digits
				We do this so that the actual value is easier to use then the pretty masked value
			*/
			const input = this.removeMask($event.target.value)
			this.$emit('update:inputData', input)

			this.input = this.addMask(input)
		},
		checkAllowed(e) {
			// Don't allow the input of any characters that wouldn't survive the de-masking or it exceeds a provided limit length
			if (!this.removeMask(e.key))
				event.preventDefault()
		},

		addMask(value) {
			return this.mask ? this.mask(value) : value
		},
		removeMask(value) {
			return this.mask ? value.replace(/\D/g,'') : value
		}
	},
}
</script>

<style scoped>
	.fieldRow {
		position: relative;
		margin: 30px 0px !important;

		width: 100%;
	}

	input {
		display: block;
		z-index: 0;

		margin: auto !important;
	}

	label {
		position: absolute;
		top: 50%;

		font-weight: 600;
		color: #777777;

		transform: translateY(-50%);
		-ms-transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		cursor: text;
		user-select: none;
		transition: 0.15s ease-in-out;

		margin: 0px auto;

		z-index: 10;
	}
	.uk-input {
		padding: 5px 10px !important;
		height: 40px !important;
	}

	.transitioned label, input:focus + span label {
		top: -10px;
		/* font-size: 14px;
		font-weight: 500 !important; */
		color: black;

		/* height: 12px !important; */
		padding: 0px 3px;
		/* background-color: white; */
	}

	.transitioned>input, input:focus {
		border:1px solid blue !important;
	}
</style>
