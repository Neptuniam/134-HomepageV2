<template>
    <table class="uk-table">
        <thead>
            <tr>
                <th>Widget Title</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="widget in widgets" class="textBody">
                <td>{{widget.title}}</td>
                <td>
                    <button type="button" :class="['uk-button uk-button-small', color(widget)]" @click="toggleStatus(widget)">
                        {{readable[widget.status]}}
                    </button>
                    <!-- <a @click="toggleStatus(widget)">{{readable[widget.status]}}</a> -->
                </td>
            </tr>
        </tbody>
    </table>
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
    tr th {
        text-align: center;
    }
    /* tr {
        background: rgba(240,240,240,1);
    } */
</style>
