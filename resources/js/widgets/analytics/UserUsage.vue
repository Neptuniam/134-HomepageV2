<template>
<div v-if="distinct && distinct.length" class="card">
    <h2>
        Api Users
    </h2>

    <vue-frappe
        ref="chart"
        type="donut"
        id="userUsages"
        :colors="['blue', 'yellow', 'orange']"
        :labels="labels"
        :dataSets="[userData]"
        :height="300"
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
            return this.distinct.map(user => user.label)
        },

        userData() {
            return {
                chartType: 'pie',
                name: 'Usages by User',
                values: this.distinct.map(user => user.events)
            }
        },

        ...mapGetters('settings', {
            users: 'getUsers',
            events: 'getEvents',
        })
    },

    methods: {
        processEvents() {
            let users = []

            for (const event of this.events) {
                const user = this.users.find(user => user.id == event.user_id) || {}
                const name = user.name || 'Deleted'
                let obj = users.find(day => day.label == name)

                if (obj) {
                    obj.events++
                } else {
                    users.push({label: name, events: 1})
                }
            }

            return users
        },
    },

    mounted() {
        this.distinct = this.processEvents()
    },
}
</script>

<style scoped>

</style>
