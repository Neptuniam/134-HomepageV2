<template>
<div v-if="distinct && distinct.length" class="card">
    <h2>
        Your API Usage Details
    </h2>

    <div class="row middle-xs">
        <div class="col-xs-3">
            <span class="uk-icon" :uk-icon="`icon: more-vertical; ratio: 3`"
                    :uk-tooltip="`Your most and least used apis`">
            </span>
        </div>

        <div class="col-xs start-xs text">
            <div class="mainAverage" :uk-tooltip="`Total Events; ${distinct[0].events}`">
                {{distinct[0].label | capitalizeWords}}
            </div>

            <div class="subAverage" :uk-tooltip="`Total Events; ${distinct[distinct.length-1].events}`">
                {{distinct[distinct.length-1].label | capitalizeWords}}
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
            distinct: null
        }
    },
    computed: {
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

        console.log(this.distinct[0]);

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
