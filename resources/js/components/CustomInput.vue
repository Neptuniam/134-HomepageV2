<!-- Credit: https://codepen.io/sivan/pen/alKwf -->
<template>
<div class="NobalInput">
	<div class="fieldRow" :class="{ 'transitioned': !!input, 'custom-file-input': inputType == 'file' && !input }">
		<input ref="NobalInput"
			class="col-xs uk-input roundedEdge bigForm"
			:class="{'error': !!error, 'padding-left': !!prependIcon, 'padding-right': !!appendIcon }"
			:type="inputType"
			:id="uniqueID"
			:value="input"
			:pattern="pattern"
			v-on:keyup.enter="$emit('enter', removeMask(input))"
			@input="handleInput"
			@change="handleChange"
			@keypress="checkAllowed"
			@blur="validate"
			@focus="$emit('focus', $event)"
			readonly="readonly" onfocus="javascript: this.removeAttribute('readonly')"
		>

		<label :for="uniqueID" :style="{'padding-left': !!prependIcon ? '20px' : ''}">
			{{placeholder}} {{required ? "*" : ""}}
		</label>

		<component v-if="prependIcon"
			class="icon clickable left-align"
			:fillColor="prependIconColour"
			:is="prependIcon" :size="20"
			:uk-tooltip="prependIconTooltip"
			@click="$emit('prependIconClick', $event)"
		/>
		<component v-if="appendIcon"
			class="icon clickable right-align"
			:fillColor="appendIconColour"
			:is="appendIcon" :size="20"
			:uk-tooltip="appendIconTooltip"
			@click="$emit('appendIconClick', $event)"
		/>
	</div>

	<div class="row start-xs error-message-display">
		<span v-if="error"> {{error}} </span>
	</div>
</div>
</template>

<script>
import Eye from 'vue-material-design-icons/EyeOutline.vue'
import EyeOff from 'vue-material-design-icons/EyeOffOutline.vue'
import close from 'vue-material-design-icons/Close.vue'

export default {
	components: {
		Eye,
		EyeOff,
		close,
	},

	props: {
		inputType: {
			type: String,
			default: 'text'
		},
		type: {
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

		prependIcon: {
			type: String,
			default: null
		},
		prependIconColour: {
			type: String,
			default: null
		},
		prependIconTooltip: {
			type: String,
			default: null
		},
		appendIcon: {
			type: String,
			default: null
		},
		appendIconColour: {
			type: String,
			default: null
		},
		appendIconTooltip: {
			type: String,
			default: null
		},

		required: {
			type: Boolean,
			default: false
		},
		validation: {
			type: [Function, String],
			default: () => true
		},

		errorMessage: {
			type: String,
			default: null
		},

		inputData: {}
	},

	data() {
		return {
			input: this.addMask(this.inputData),
			uniqueID: `name${this.placeholder}${(new Date()).getTime()*Math.random()}`,
			error: null
		}
	},

	watch: {
		inputData() {
			// Listen to changes coming from the parent. This scares me though
			// (Could cause infinite update loops? Probably not though)
			if (this.inputData != this.input) {
				this.input = this.inputData
			}
		}
	},

	methods: {
		handleInput($event) {
			const input = this.removeMask($event.target.value)
			this.$emit('update:inputData', input)
			this.$emit('input', $event)

			this.input = this.addMask(input)

			if (this.error) {
				this.validate($event)
			}
		},
		handleChange($event) {
			if (this.inputType == 'file' && $event) {
				const file = $event.target.files[0]

				var fileReader = new FileReader();
				var name = file['name'];
				var type = file['type'];
				var size = file['size'];

				fileReader.readAsDataURL(file);

				fileReader.onload = (e) => {
					let data = {
						'src':  e.target.result,
						'name': name,
						'type': type,
						'size': size
					}

					this.$emit('fileUpload', data)
				}
			}
		},
		checkAllowed(e) {
			// Don't allow the input of any characters that wouldn't survive the de-masking or it exceeds a provided limit length
			if (!this.removeMask(e.key))
				event.preventDefault()
		},

		async validate($event) {
			const raw = this.removeMask(this.input)

			if (this.required && (!!raw || raw === 0)) {
				this.error = this.errorMessage || 'Must not be empty!'
			} else if (this.validation) {
				// Allow validation to be a function provided from parent, or a string to reference re-usable functions within input
				const callValidator = typeof this.validation == 'function' ? this.validation : this[this.validation]

				if (callValidator)
					this.error = !await callValidator(raw) ? this.errorMessage || "Failed Validation" : null
			} else {
				console.log("somehow there's no validation method");
				this.error = null
			}

			if ($event)
				this.$emit('blur', $event)

			// If error has an eror by the end of the validation, it's safe to assume it failed validation
			return this.error == null
		},

		addMask(value) {
			return this.mask ? this.mask(value) : value
		},
		removeMask(value) {
			/*
				So far our only mask is phone number.
				So we can get away with demasking the input but stripping all non number digits
				We do this so that the actual value is easier to use then the pretty masked value
			*/
			return this.mask ? value.replace(/\D/g,'') : value
		},


		validateEmail(email) {
			const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		},
		nonEmpty(str) {
			return !!str
		}
	},
}
</script>

<style scoped>
	.custom-file-input span, .custom-file-input label {
		width: calc(100% - 50px);
	}

	.NobalInput {
		margin: auto;
	}

	.fieldRow {
		position: relative;
		margin: 10px 0px 0px !important;

		width: 100%;
		z-index: 0;
	}

	input {
		display: block;

		margin: auto !important;

		position: relative;
	}

	label {
		position: absolute;
		top: 50%;
		left: 20px;

		font-weight: 600;
		color: #747474;
		line-height: 30px;
		text-align: left;

		transform: translateY(-50%);
		-ms-transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		cursor: text;
		user-select: none;
		transition: 0.25s ease-in-out;

		/* margin: 0px 0px; */

		padding: 0px 0px;
		background-color: white;
	}

	.uk-input, .uk-select {
		padding: 5px 10px !important;
		height: 40px !important;

		text-align: left;
		padding-left: 20px !important;
	}

	.transitioned label, input:focus + label {
		top: -1px;
		font-size: 10px;
		line-height: 10px;

		color: #3994D6 !important;
		margin: 0px 0px;
		padding: 0px 5px !important;
	}

	.transitioned input, input:focus {
		border: 1px solid #3994D6;
	}

	.icon {
		position: absolute;
		top: calc(50% - 12px);

		color: #747474 !important;
		/* left: 20px; */
	}

	.left-align {
		left: 15px;
	}
	.right-align {
		right: 15px;
	}
	.padding-left {
		padding-left: 40px !important;
	}
	.padding-right {
		padding-right: 40px !important;
	}

	.required label {
		/* border-color: #3994D6; */
		color: #3994D6 !important;
	}

	.error {
		border-color: #f0506e;
	}

	.error-message-display {
		height: 20px;
		font-size: 12px;
		color: #f0506e;

		padding-left: 30px;
	}
</style>
