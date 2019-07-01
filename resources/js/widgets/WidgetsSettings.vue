<template>
    <div>
        <div class="row center-xs fullWidth">
            <div class="col-xs-3">
                <h2>Widget Title</h2>
            </div>
            <div class="col-xs-3">
                <h2>Status</h2>
            </div>
        </div>

        <div v-for="widget in widgets" class="row center-xs middle-xs fullWidth rowHeight">
            <div class="col-xs-3 widgetTitle">
                {{widget.title}}
            </div>
            <div class="col-xs-3">
                <button type="button" :class="['uk-button uk-button-small', color(widget)]" @click="toggleStatus(widget)">
                    {{readable[widget.status]}}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data: function() {
        return {
            readable: ['Off', 'On'],
        }
    },
    computed: {
        ...mapGetters('settings', {
            widgets: 'getWidgets',
        })
    },

    methods: {
        color(widget) {
            return widget.status ? 'uk-button-default' : 'uk-button-danger'
        },

        toggleStatus(widget) {
            widget.status == 1 ? widget.status = 0 : widget.status = 1
            this.updateWidget(widget)
        },

        ...mapActions('settings', {
            updateWidget: 'updateWidget',
        })
    },
}
</script>

<style scoped>
    .rowHeight {
        height: 2.5rem;
    }

    .widgetTitle {
        font-size: 1.3rem;
    }
</style>
