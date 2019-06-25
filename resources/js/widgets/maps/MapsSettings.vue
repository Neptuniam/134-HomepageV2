<template>
    <div class="row">
        <div class="row center-xs fullWidth">
            <div class="col-xs-8">
                <div class="row fullWidth">
                    <span class="col-xs start-xs uk-form-label" for="form-stacked-select">Home Location</span>

                    <span v-if="homeLoc" class="col-xs end-xs uk-form-label">{{homeLoc.title}}</span>
                </div>

                <div class="uk-form-controls fullWidth">
                    <select class="uk-select" @change="updateFavourite($event, 'Home')">
                        <option value=""></option>
                        <option v-for="location in remainingLocations" :value="location.id">
                            {{location.title}}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <div class="row center-xs fullWidth">
            <div class="col-xs-8">
                <div class="row fullWidth">
                    <span class="col-xs start-xs uk-form-label" for="form-stacked-select">Favourite Location</span>

                    <span v-if="favLoc" class="col-xs end-xs uk-form-label">{{favLoc.title}}</span>
                </div>

                <div class="uk-form-controls fullWidth">
                    <select class="uk-select" @change="updateFavourite($event, 'Favourite')">
                        <option value=""></option>
                        <option v-for="location in remainingLocations" :value="location.id">
                            {{location.title}}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <table class="uk-table uk-table-striped">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Address</th>
                    <th>Lat</th>
                    <th>Long</th>
                    <th>Save</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="location in locations">
                    <td> <input type="text" class="fullWidth uk-input" v-model="location.title"> </td>
                    <td> <input type="text" class="fullWidth uk-input" v-model="location.address"> </td>
                    <td> <input type="text" class="fullWidth uk-input" v-model="location.lat"> </td>
                    <td> <input type="text" class="fullWidth uk-input" v-model="location.lng"> </td>
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
                    <td> <input type="text" class="fullWidth uk-input" v-model="newLocation.title"> </td>
                    <td> <input type="text" class="fullWidth uk-input" v-model="newLocation.address"> </td>
                    <td> <input type="text" class="fullWidth uk-input" v-model="newLocation.lat"> </td>
                    <td> <input type="text" class="fullWidth uk-input" v-model="newLocation.lng"> </td>
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
                return this.locations.filter(location => location.favourite == null)
        },
        homeLoc: function() {
            if (this.locations)
                return this.locations.find(location => location.favourite == 'Home')
        },
        favLoc: function() {
            if (this.locations)
                return this.locations.find(location => location.favourite == 'Favourite')
        },

        ...mapGetters('settings', {
            locations: 'getLocations',
        })
    },
    methods: {
        updateFavourite(event, option) {
            let newFav = this.locations.find(location => location.id == event.target.value)
            let oldFav = option == 'Home' ? this.homeLoc : this.favLoc

            newFav.favourite = option
            this.updateLocation(newFav)

            oldFav.favourite = null
            this.updateLocation(oldFav)
        },

        ...mapActions('settings', {
            updateLocation: 'updateLocation',
            deleteLocation: 'deleteLocation',
        })
    },
}
</script>

<style scoped>
    .selectLabel {
        text-align: left;
    }

    .selected {
        text-align: right;
    }

    td, .uk-button-group {
        height: 100%;
    }

    .uk-button {
        padding: 0;
        height: 2.4rem;
    }
</style>
