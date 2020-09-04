<template>
<div class="row center-xs">
    <div class="col-xs-12 WidgetSettings">
        <div class="row start-xs">
            <div class="col-xs">
                <h2>Widget Title</h2>
            </div>
            <div class="col-xs-3">
                <h2>Status</h2>
            </div>
            <div class="col-xs-3">
                <h2>Interval</h2>
            </div>
        </div>

        <div v-for="widget in widgets" class="row start-xs middle-xs rowHeight">
            <div class="col-xs widgetTitle">
                {{widget.title}}
            </div>
            <div class="col-xs-3">
                <CustomButton :title="readable[widget.status]" :color="color(widget)" :click="() => toggleStatus(widget)" />
            </div>
            <div class="col-xs-3">
                <div class="row center-xs middle-xs">
                    <input v-model="widget.interval" @input="updateWidget(widget)" :disabled="!widget.status" onClick="this.select();" type="number" min="0" class="col-xs-6">
                    Min
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
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
            return widget.status ? 'default' : 'danger'
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
    .WidgetSettings {
        max-width: 550px;
    }

    .rowHeight {
        height: 55px;
        /* padding: 10px 0px; */
    }

    .widgetTitle {
        font-size: 1.3rem;
    }

    .rowHeight input {
        font-size: 1.3rem !important;
        color: black !important;
        background: none !important;
        border: none !important;
    }
    .rowHeight:hover {
        background-color: rgba(100, 100, 100,  0.15);
        border-radius: 5px;
    }

    .uk-button-default:hover {
        /* background-color: #e5e5e5 !important; */
        border-color: rgb(150, 150, 150) !important;
    }
</style>

<style>
    .WidgetSettings .uk-button {
        width: 85px !important;
    }
</style>
