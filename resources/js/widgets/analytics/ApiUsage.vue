<template>
<div v-if="distinct && distinct.length" class="card">
    <h2>
        Api Usages
    </h2>

    <vue-frappe
        ref="chart"
        type="donut"
        id="apiPieData"
        :colors="['blue', 'yellow', 'orange']"
        :labels="labels"
        :dataSets="[apiData]"
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
            return this.distinct.map(api => this.$options.filters.capitalizeWords(api.label))
        },

        apiData() {
            return {
                chartType: 'pie',
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
            let apis = []

            for (const event of this.events) {
                let obj = apis.find(api => api.label == event.api)

                if (obj) {
                    obj.events++
                } else {
                    apis.push({label: event.api, events: 1})
                }
            }

            return apis
        },
    },

    mounted() {
        this.distinct = this.processEvents().sort((a, b) => b.events - a.events)
    },
}
</script>

<style scoped>
    .card {
        margin: 10px 0px !important;
    }
</style>
