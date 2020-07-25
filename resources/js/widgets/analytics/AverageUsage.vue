<template>
<div v-if="distinct && distinct.length" class="card">
    <h2>
        Average Usage
    </h2>

    <div class="row">
        <div class="col-xs-6 row top-xs">
            <div class="col-xs-3">
                <span class="uk-icon" :uk-icon="`icon: ${daily.symbol}; ratio: 3`"
                        :uk-tooltip="`You're currently ${daily.message} your daily average`">
                </span>
            </div>

            <div class="col-xs start-xs">
                <div class="mainAverage">
                    {{Math.round(daily.todaysAverage)}}
                </div>

                <div class="subAverage">
                    {{Math.round(daily.dailyAverage)}}
                </div>
            </div>
        </div>

        <div class="col-xs-6 row top-xs">
            <div class="col-xs-3">
                <span class="uk-icon" :uk-icon="`icon: ${daily.symbol}; ratio: 3`"
                        :uk-tooltip="`You're currently ${daily.message} your weekly average`">
                </span>
            </div>

            <div class="col-xs start-xs">
                <div class="mainAverage">
                    {{Math.round(daily.todaysAverage)}}
                </div>

                <div class="subAverage">
                    {{Math.round(daily.dailyAverage)}}
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            distinct: null,

            daily: {
                todaysAverage: null,
                dailyAverage: null,
                symbol: null,
                message: null
            },

            weekly: {
                todaysAverage: null,
                dailyAverage: null,
                symbol: null,
                message: null
            }
        }
    },
    computed: {
        ...mapGetters('settings', {
            events: 'getEvents',
        })
    },

    methods: {
        processEvents() {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
            let days = []

            const createLabel = (event) => {
                const dt = new Date(event.created_at+' UTC')

                return `${months[dt.getMonth()]} - ${dt.getDate()}`
            }


            for (const event of this.events) {
                const label = createLabel(event)
                let obj = days.find(day => day.label == label)

                if (obj) {
                    obj.events++
                } else {
                    days.push({label: label, events: 1})
                }
            }

            return days
        },
    },

    mounted() {
        this.distinct = this.processEvents()

        // We need at least two days to compare against old averages
        if (this.distinct.length > 1) {
            const today = this.distinct.pop()

            let sum = 0
            for (const day of this.distinct) {
                sum += day.events
            }

            this.daily.todaysAverage = today.events
            this.daily.dailyAverage = sum / this.distinct.length

            if (this.daily.todaysAverage < this.daily.dailyAverage) {
                this.daily.symbol = 'arrow-down'
                this.daily.message = 'below'
            } else if (this.daily.todaysAverage > this.daily.dailyAverage) {
                this.daily.symbol = 'arrow-up'
                this.daily.message = 'above'
            } else {
                this.daily.symbol = 'arrow-right'
                this.daily.message = 'equal to'
            }
        }
    },
}
</script>

<style scoped>
    .col-xs-3 {
        min-width: 100px !important;
        max-width: 100px !important;
        min-height: 100px !important;
        max-height: 100px !important;
    }
    .uk-icon {
        border-radius: 5px;
        background-image: linear-gradient(to bottom, #667eea, #764ba2);
        color: white;
        opacity: 70%;

        padding: 15px;
    }

    .mainAverage {
        font-size: 50px;
        font-weight: 600;

        line-height: 45px;
    }
    .subAverage {
        font-size: 30px;
    }

    .card {
        margin: 10px 0px !important;
    }
</style>
