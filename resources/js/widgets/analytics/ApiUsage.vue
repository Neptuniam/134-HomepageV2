<template>
<div class="card">
    <div v-if="distinct && distinct.length">
        <h2>
            Api Usages
        </h2>

        <vue-frappe
            ref="chart"
            type="pie"
            id="apiPieData"
            :labels="labels"
            :dataSets="[apiData]"
            :height="300"
            :valuesOverPoints="true"
        />
    </div>
    <div v-else>
        <!-- <div uk-spinner="ratio: 5"></div> -->
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
        labels() {
            return this.distinct.map(api => api.label)
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
        this.distinct = this.processEvents()
    },
}
</script>

<style scoped>
    .card {
        margin: 10px 0px !important;
    }
</style>
