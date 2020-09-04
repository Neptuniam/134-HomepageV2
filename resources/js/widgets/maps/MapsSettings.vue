<template>
<div>
    <MapsUserSettings />

    <SettingsTable>
        <template v-slot:headers>
            <div class="col-xs uk-text-capitalize">
                Title
            </div>
            <div class="col-xs uk-text-capitalize nopadding">
                Address
            </div>
            <div class="col-xs uk-text-capitalize nopadding">
                Lat
            </div>
            <div class="col-xs uk-text-capitalize nopadding">
                Long
            </div>

            <div class="col-xs-2 center-xs nopadding">
            </div>
        </template>

        <template v-slot:body>
            <MapsRow v-for="locations in getLocations" :key="locations.id" :dataObject="locations" />

            <MapsRow :dataObject="blankObject" />
        </template>
    </SettingsTable>
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
        ...mapGetters('settings', ['getLocations'])
    },

    methods: {
        ...mapActions('settings', [ 'fetchMapsSettings', 'fetchLocations' ])
    },

    mounted() {
        this.fetchMapsSettings()
        this.fetchLocations()
    },
}
</script>

<style scoped>

</style>
