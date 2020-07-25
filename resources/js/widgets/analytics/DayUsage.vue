<template>
<div v-if="distinct && distinct.length" class="card">
    <h2>
        Daily Api Usages
    </h2>

    <vue-frappe
        ref="chart"
        type="bar"
        id="dayData"
        :colors="['yellow']"
        :labels="['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']"
        :dataSets="[dayData]"
        :height="300"
        :barOptions="{
            depth: 2,
            spaceRatio: 0.2,
            stacked: 0
        }"
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
        dayData() {
            return {
                chartType: 'bar',
                name: 'Usages by Day',
                values: this.distinct
            }
        },

        ...mapGetters('settings', {
            events: 'getEvents',
        })
    },

    methods: {
        processEvents() {
            let days = [0, 0, 0, 0, 0, 0, 0]

            for (const event of this.events) {
                days[(new Date(event.created_at+' UTC')).getDay()]++
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
