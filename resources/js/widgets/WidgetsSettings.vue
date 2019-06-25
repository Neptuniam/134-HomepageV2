<template>
    <table class="uk-table uk-table-striped">
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
                    <a @click="toggleStatus(widget)">{{readable[widget.status]}}</a>
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

</style>
