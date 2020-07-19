<template>
<div class="card">
    <div v-if="distinct && distinct.length">
        <h2>
            Hourly Api Usages
        </h2>

        <vue-frappe
            ref="chart"
            type="line"
            id="hourData"
            :colors="['orange']"
            :labels="['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am',
                      '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm']"
            :dataSets="[hourData]"
            :height="300"
        />
    </div>
    <div v-else>
        <div uk-spinner="ratio: 5"></div>
    </div>
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
        hourData() {
            return {
                chartType: 'line',
                name: 'Usages by Hour',
                values: this.distinct
            }
        },

        ...mapGetters('settings', {
            events: 'getEvents',
        })
    },

    methods: {
        processEvents() {
            let hours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

            for (const event of this.events) {
                hours[(new Date(event.created_at+' UTC')).getHours()]++
            }

            return hours
        },
    },

    mounted() {
        this.distinct = this.processEvents()
    },
}
</script>

<style scoped>

</style>
