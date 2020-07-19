<template>
<div>
    <MapsUserSettings />

    <table class="uk-table uk-table-striped">
        <thead>
            <tr>
                <th class="uk-text-capitalize">
                    Title
                </th>
                <th class="uk-text-capitalize">
                    Address
                </th>
                <th class="uk-text-capitalize">
                    Lat
                </th>
                <th class="uk-text-capitalize">
                    Long
                </th>
            </tr>
        </thead>
        <tbody class="textBody">
            <MapsRow  v-for="location in locations" :key="location.id" :location="location" />

            <MapsRow :location="blankObject" />
        </tbody>
    </table>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            blankObject: { id: null, user_id: null,  title: '', address: '', lng: '', lat: '' },
        }
    },
    computed: {
        ...mapGetters('settings', {
            locations:  'getLocations',
            activeUser: 'getUser',
        })
    },

    methods: {
        ...mapActions('settings', {
			fetchMapsSettings:  'fetchMapsSettings',
			fetchLocations:     'fetchLocations',
        })
    },

    mounted() {
        this.fetchMapsSettings()
        this.fetchLocations()
    },
}
</script>

<style scoped>

</style>
