<template>
<div v-if="distinct && distinct.length" class="card">
    <h2>
        Api Usages history
    </h2>

    <vue-frappe
        ref="chart"
        type="line"
        id="TimelineUsages"
        :colors="['blue', 'yellow', 'orange']"
        :labels="labels"
        :dataSets="[dailyData]"
        :height="300"
        :valuesOverPoints="true"
    />
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            distinct: null
        }
    },
    computed: {
        labels() {
            if (this.distinct) {
                return this.distinct.map(day => day.label)
            }
        },

        dailyData() {
            return {
                chartType: 'line',
                name: 'Usages by day',
                values: this.distinct.map(api => api.events)
            }
        },

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
    },
}
</script>

<style scoped>

</style>
