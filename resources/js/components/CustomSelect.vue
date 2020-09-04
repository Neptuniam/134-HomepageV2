<template>
<div class="NobalSelect" :class="{'required': required, 'error': !!error}">
    <custom-input
        :placeholder="title"
        :inputData.sync="searchKey"
        :required="required"

        @focus="showOptions = true"
        @blur="hideOptions"
        @keyup="handleKey"


        highlight
    />
    <!-- :prepend-icon="searchKey ? 'close' : 'search'"
    @prepend-icon-click="clearOption"

    :append-icon="showOptions ? 'ArrowUpDropCircle' : 'ArrowDownDropCircle'"
    append-icon-colour="#3994D6" -->

    <div v-show="showOptions" class="optionsContainer" :style="scrollStyle" ref="resultScroll">
        <template v-if="filteredOptions && filteredOptions.length">
            <slot name="option" v-for="(option, index) in filteredOptions"
                v-bind:option="option"
                :filteredOptions="filteredOptions"
                :selectOption="selectOption"
                :filterOption="filterOption"
            >
                <option :class="{'focusClass': focus === index}"
                    :key="index+''+getValue(option)"
                    @click="selectOption(getValue(option), getDisplay(option))"
                >
                    {{ getDisplay(option) }}
                </option>
            </slot>
        </template>
        <template v-else>
            <slot name="option"
                :filteredOptions="filteredOptions"
                :selectOption="selectOption"
                :filterOption="filterOption"
            >
                <option>
                    No Results
                </option>
            </slot>
        </template>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    props: {
        title: {
            type: String,
            default: null
        },

        required: {
            type: Boolean,
            default: false
        },
        clearOnSelect: {
            type: Boolean,
            default: false
        },

        selected: {},

        options: Array,
        display: String | Number | Function,
        value: String | Number | Function,

        settings: {
            type: Object,
            default () {
                return {
                    fontSize: 16,
                    resultsCount: 5,
                }
            }
        },
    },

    data() {
        return {
            selectedLocal: this.selected,
            searchKey: null,
            showOptions: false,

            focus: -1,

            uniqueID: `name${this.title}${(new Date()).getTime()}`,
            error: null
        }
    },

    computed: {
        filteredOptions() {
            if (this.options)
                return this.options.filter(option => this.filterOption(this.getDisplay(option)))
        },

        scrollStyle() {
            let fontSize = this.settings.fontSize || 16
            let lineHeight = fontSize * 1.3
            let resultsCount = this.settings.resultsCount || 5

            let style = ''
            style += `font-size: ${fontSize}px;`
            style += `line-height: ${lineHeight}px;`

            // The max height is the height of each option, plus the 10 top
            // padding and 10 bottom padding * the amount of options showing
            style += `max-height: ${(lineHeight + 20) * resultsCount}px;`

            return style
        },
    },


    methods: {
        validate() {
            if (this.required && !(this.selectedLocal || this.selectedLocal == 0)) {
                this.error = `${this.title} is required!`
            } else {
                this.error = null
            }

			// If error has an eror by the end of the validation, it's safe to assume it failed validation
			return this.error == null
        },

        handleKey($event) {
            if ($event.key == "ArrowUp") {
                // If the up arrow was entered check the lower bound
                if (this.focus >= 0)
                    this.focus--

                // scroll with the key movement
                if (this.focus > 1)
                    this.$refs.resultScroll.scroll(0, (this.focus-2) * 40)
            } else if ($event.key == "ArrowDown") {
                // If the down arrow was entered check the higher bound
                if (this.focus < this.filteredOptions.length-1)
                    this.focus++

                // scroll with the key movement
                if (this.focus > 2)
                    this.$refs.resultScroll.scroll(0, (this.focus-2) * 40)
            } else if ($event.key == "Enter") {
                if (this.focus != -1) {
                    let option = this.filteredOptions[this.focus]

                    // If the enter key was entered check if we are focusing a result
                    this.selectOption(this.getValue(option), this.getDisplay(option))
                } else if (this.filteredOptions.length == 1) {
                    let option = this.filteredOptions[0]

                    // If there is no focus but only one result allow to easily select that
                    this.selectOption(this.getValue(option), this.getDisplay(option))
                }
            }
        },

        filterOption(option) {
            if (!option)
                return false

            if (this.searchKey === this.selectedLocal)
                return true

            return !this.searchKey || option.search(new RegExp(this.searchKey, "i")) !== -1
        },

        getValue(option) {
            if (this.value == 'index')
                return this.filteredOptions.findIndex(fo => this.getDisplay(fo) == this.getDisplay(option))

            return typeof option == 'object' && this.value && `${this.value}` in option ? option[this.value] : option
        },
        getDisplay(option) {
            if (typeof this.display == 'function')
                return this.display(option)

            return typeof option == 'object' && this.display && `${this.display}` in option ? option[this.display] : option
        },
        selectOption(value, display) {
            this.$emit('update:selected', value)
            this.$emit('change', value)

            this.searchKey = display
            this.selectedLocal = display

            if (this.clearOnSelect) {
                this.searchKey = null
            }

            this.setInput(true)
        },

        clearOption() {
            this.setInput(true);
            this.searchKey = null
            this.$emit('update:selected', null)
            this.$emit('change', null)
        },

        hideOptions() {
            setTimeout(() => this.showOptions = false, 150)
        },

        getDirection() {
            this.$nextTick(() => {
                let lineHeight = (this.settings.fontSize || 16) * 1.3
                let resultsCount = Math.min(this.settings.resultsCount || 5, this.options.length)
                const requiredHeight = (lineHeight + 20) * resultsCount

                // Direct the options upwards if they're too close to the bottom
                if (requiredHeight > window.innerHeight) {
                    this.$refs.resultScroll.style['top'] = `-${requiredHeight}px`
                }
            })
        },

        ...mapActions({
            setInput: 'display/setModalInput'
        })
    },

    mounted() {
        if (this.selected) {
            var matchValue
            if (this.options && this.options.length) {
                matchValue = this.options.find(option => this.getValue(option) === this.selected)

                if (matchValue) {
                    this.searchKey = this.getDisplay(matchValue)
                    this.selectedLocal = this.getDisplay(matchValue)
                }
            } else {
                this.$nextTick(() => {
                    for (let option of this.$refs.resultScroll.children) {
                        if (option.value === this.selected)
                            matchValue = option
                    }

                    if (matchValue) {
                        this.searchKey = matchValue.textContent.trim()
                        this.selectedLocal = matchValue.textContent.trim()
                    }
                })
            }
        }
    },
}
</script>

<style scoped>
    .NobalSelect {
        margin: auto;
        position: relative;
    }

    .optionsContainer {
        position: absolute;
        top: 35px;
        left: 0px;

        background-color: white;

        width: calc(100% - 2px);
        max-width: 100%;

        border: 1px solid #3994D6;
        border-radius: 0px 0px 15px 15px;
        border-top: none !important;

        margin: 0.5px auto;
        background-color: white;

        overflow-y: auto;
        z-index: 1;
    }

    .optionsContainer>option {
        font-weight: 400;
        text-align: left;
        text-transform: none;
        color: var(--sub);

        padding: 10px 5px 10px 15px;
        position: relative;
        z-index: 1;

        cursor: pointer;
    }

    .optionsContainer>option {
        background-color: rgb(255,255,255);
    }
    .optionsContainer>option:last-of-type {
        border-radius: 0px 0px 10px 10px;
    }

    .optionsContainer>option:hover {
        background-color: rgb(235, 235, 235);
    }
    .focusClass {
        background-color: rgb(245, 245, 245) !important;
    }
</style>
<style>
    .NobalSelect .NobalInput .uk-input {
        padding-top: 22px !important;
        padding-bottom: 22px !important;
    }
    .NobalSelect .NobalInput input:focus {
        border-radius: 10px 10px 0px 0px !important;
        border-bottom: none !important;
    }
</style>
