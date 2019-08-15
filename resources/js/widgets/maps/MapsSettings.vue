<template>
<div>
    <div v-if="mapsSettings" class="row center-xs middle-xs fullWidth">
        <div class="col-xs-3">
            <span class="row uk-form-label fullWidth textColor textBody">Home Location</span>

            <div class="uk-form-controls fullWidth">
                <select class="uk-select" @change="updateMapSettings(mapsSettings)" v-model="mapsSettings.home_id">
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
                <select class="uk-select" @change="updateMapSettings(mapsSettings)" v-model="mapsSettings.fav_id">
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
                <select class="uk-select" @change="updateMapSettings(mapsSettings)" v-model="mapsSettings.method">
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
        <tbody class="textBody">
            <tr v-for="location in locations" :key="location.id">
                <td> <input type="text" class="uk-input" v-model="location.title"> </td>
                <td> <input type="text" class="uk-input" v-model="location.address"> </td>
                <td> <input type="text" class="uk-input" v-model="location.lat"> </td>
                <td> <input type="text" class="uk-input" v-model="location.lng"> </td>
                <td class="uk-button-group">
                    <a class="uk-icon-button uk-button-primary roundedButton" @click="updateLocation(location)" uk-icon="pencil" />
                    <a class="uk-icon-button uk-button-danger roundedButton" @click="deleteLocation(location)" uk-icon="trash" />
                </td>
            </tr>

            <tr>
                <td> <input type="text" class="uk-input" v-model="newLocation.title"> </td>
                <td> <input type="text" class="uk-input" v-model="newLocation.address"> </td>
                <td> <input type="text" class="uk-input" v-model="newLocation.lat"> </td>
                <td> <input type="text" class="uk-input" v-model="newLocation.lng"> </td>
                <td class="posWidth">
                    <a class="uk-icon-button uk-button-success roundedButton" @click="addLoc(newLocation)" uk-icon="plus" />
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
            newLocation: {id: null, user_id: null,  title: '', address: '', lng: '', lat: ''},
        }
    },
    computed: {
        remainingLocations: function() {
            if (this.locations)
                return this.locations
                // return this.locations.filter(location => location.favourite == null)
        },
        ...mapGetters('settings', {
            locations: 'getLocations',
            mapsSettings: 'getMapsSettings',
            activeUser: 'getUser',
        })
    },
    created: function() {

    },
    methods: {
        addLoc() {
            // Only create a location if we know the user
            if (this.activeUser) {
                // Add the user id
                this.newLocation.user_id = this.activeUser.id

                // Add the loc to the db
                this.updateLocation(this.newLocation)

                // Clear the new object so another can be created
                this.newLocation = {id: null, user_id: null, title: '', address: '', lng: '', lat: ''}
            }
        },

        ...mapActions('settings', {
            updateLocation: 'updateLocation',
            deleteLocation: 'deleteLocation',
            updateMapSettings: 'updateMapSettings',
        })
    },
}
</script>

<style scoped>
    tr th {
        font-weight: 500px;
        font-size: 22px;
        text-align: center;

        padding: 30px 0 0 0;
    }

    .uk-form-label {
        padding-left: 7%;
    }

    .uk-icon-button {
        height: 40px;
        width:  40px;
    }
</style>
