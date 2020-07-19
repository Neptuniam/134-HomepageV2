<template>
<div class="card">
    <div v-if="distinct && distinct.length">
        <h2>
            Api Usages by Source
        </h2>

        <vue-frappe
            ref="chart"
            type="bar"
            id="apiHits"
            :colors="['blue', 'yellow', 'orange']"
            :labels="labels"
            :dataSets="[cachedData, fetchedData, inhouseData]"
            :height="300"
            :barOptions="{
                depth: 2,
                spaceRatio: 0.2,
                stacked: 0
            }"
            :valuesOverPoints="true"
        >
        </vue-frappe>
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
        labels() {
            if (this.distinct) {
                return this.distinct.map(api => api.title)
            }
        },

        cachedData() {
            return {
                chartType: 'bar',
                name: 'Cached Services',
                values: this.distinct.map(api => api.cached.length)
            }
        },
        fetchedData() {
            return {
                chartType: 'bar',
                name: 'Fetched Services',
                values: this.distinct.map(api => api.fetched.length)
            }
        },
        inhouseData() {
            return {
                chartType: 'bar',
                name: 'In house Services',
                values: this.distinct.map(api => api.inHouse.length)
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
                let apiObj = apis.find(api => api.title == event.api)

                if (!apiObj) {
                    apiObj = {title: event.api, cached: [], fetched: [], inHouse: []}
                    apis.push(apiObj)
                }

                if (event.hit_source == 0) {
                    apiObj.cached.push(event)
                } else if (event.hit_source == 1) {
                    apiObj.fetched.push(event)
                } else if (event.hit_source == 2) {
                    apiObj.inHouse.push(event)
                } else {
                    console.log('unknown source type: ' + event.hit_source);
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

</style>
