<template>
<div class="card">
    <div v-if="distinct && distinct.length">
        <h2>
            Api Sources
        </h2>

        <vue-frappe
            ref="chart"
            type="pie"
            id="sourceUsages"
            :colors="['blue', 'yellow', 'orange']"
            :labels="['Cached', 'Fetched', 'In House']"
            :dataSets="[sourceData]"
            :height="300"
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
        sourceData() {
            return {
                chartType: 'pie',
                name: 'Usages by day',
                values: this.distinct
            }
        },

        ...mapGetters('settings', {
            events: 'getEvents',
        })
    },

    methods: {
        processEvents() {
            let sources = [0, 0, 0]

            for (const event of this.events) {
                if (event.hit_source in sources) {
                    sources[event.hit_source]++
                } else {
                    console.log('unknown source type: ' + event.hit_source);
                }
            }

            return sources
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
