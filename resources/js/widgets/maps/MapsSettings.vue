<template>
    <div class="row">
        <div v-if="userSettings" class="row center-xs middle-xs fullWidth">
            <div class="col-xs-3">
                <span class="row uk-form-label fullWidth textColor textBody">Home Location</span>

                <div class="uk-form-controls fullWidth">
                    <select class="uk-select" @change="updateMapSettings(userSettings)" v-model="userSettings.home_id">
                        <option value=""></option>
                        <option v-for="location in remainingLocations" :value="location.id">
                            {{location.title}}
                        </option>
                    </select>
                </div>
            </div>

            <div class="col-xs-3">
                <span class="row uk-form-label fullWidth textColor textBody">Favourite Location</span>

                <div class="uk-form-controls fullWidth">
                    <select class="uk-select" @change="updateMapSettings(userSettings)" v-model="userSettings.fav_id">
                        <option value=""></option>
                        <option v-for="location in remainingLocations" :value="location.id">
                            {{location.title}}
                        </option>
                    </select>
                </div>
            </div>

            <div class="col-xs-3">
                <span class="row uk-form-label fullWidth textColor textBody">Transportation Method</span>

                <div class="uk-form-controls fullWidth">
                    <select class="uk-select" @change="updateMapSettings(userSettings)" v-model="userSettings.method">
                        <option value=""></option>
                        <option value="DRIVING">Driving</option>
                        <option value="TRANSIT">Bus</option>
                        <option value="WALKING">Walking</option>
                    </select>
                </div>
            </div>
        </div>


        <table class="uk-table">
            <thead>
                <tr>
                    <th class="uk-text-capitalize">Title</th>
                    <th class="uk-text-capitalize">Address</th>
                    <th class="uk-text-capitalize">Lat</th>
                    <th class="uk-text-capitalize">Long</th>
                    <th class="uk-text-capitalize">Edit</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="location in locations" :key="location.id">
                    <td> <input type="text" class="fullWidth textBody uk-input" v-model="location.title"> </td>
                    <td> <input type="text" class="fullWidth textBody uk-input" v-model="location.address"> </td>
                    <td> <input type="text" class="fullWidth textBody uk-input" v-model="location.lat"> </td>
                    <td> <input type="text" class="fullWidth textBody uk-input" v-model="location.lng"> </td>
                    <td class="uk-button-group">
                        <button class="uk-button uk-button-primary uk-button-small" @click="updateLocation(location)">
                            <span uk-icon="pencil"></span>
                        </button>
                        <button class="uk-button uk-button-secondary uk-button-small" @click="deleteLocation(location)">
                            <span uk-icon="trash"></span>
                        </button>
                    </td>
                </tr>

                <tr>
                    <td> <input type="text" class="fullWidth textBody uk-input" v-model="newLocation.title"> </td>
                    <td> <input type="text" class="fullWidth textBody uk-input" v-model="newLocation.address"> </td>
                    <td> <input type="text" class="fullWidth textBody uk-input" v-model="newLocation.lat"> </td>
                    <td> <input type="text" class="fullWidth textBody uk-input" v-model="newLocation.lng"> </td>
                    <td>
                        <button class="uk-button uk-button-primary uk-button-small"
                               @click="updateLocation(newLocation); newLocation={id: null, title: '', address: '', lng: '', lat: '', favourite: null}">
                            <span uk-icon="plus"></span>
                        </button>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data: function() {
        return {
            newLocation: {id: null, title: '', address: '', lng: '', lat: '', favourite: null},
        }
    },
    computed: {
        remainingLocations: function() {
            if (this.locations)
                return this.locations
                // return this.locations.filter(location => location.favourite == null)
        },
        userSettings: function() {
            if (this.mapsSettings)
                return this.mapsSettings.find(user => user.name === 'Liam')
        },

        ...mapGetters('settings', {
            locations: 'getLocations',
            mapsSettings: 'getMapsSettings',
        })
    },
    created: function() {
    },
    methods: {
        ...mapActions('settings', {
            updateLocation: 'updateLocation',
            deleteLocation: 'deleteLocation',
            updateMapSettings: 'updateMapSettings',
        })
    },
}
</script>

<style scoped>
    .uk-form-label {
        padding-left: 7%;
    }

    tr th {
        text-align: center;
    }
</style>
