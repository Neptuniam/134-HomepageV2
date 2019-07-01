<template>
    <div>
        <div v-if="destination" class="row center-xs travelText textBody uk-text-truncate">
            Leave at {{departureTime}} to arrive at {{destination.title}} by {{arrivalTime}}. Via:&nbsp;
            <a @click="showMap = !showMap">{{travelMethod}}</a>
        </div>

        <div v-show="false">
            <gmap-map ref="map" :center="start" :zoom="15" style="width: 1px; height: 1px">
                <!-- <gmap-marker :position="this.start" />
                <gmap-marker :position="this.destination" /> -->
            </gmap-map>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DateTime from '../DateTime'

export default {
    extends: DateTime,
    data: function() {
        return {
            showMap: true,
            directions: null,
            departureTime: null,
            arrivalTime: null,
        }
    },
    computed: {
        ...mapGetters('settings', {
            userLat: 'getLat',
            userLng: 'getLng',
            locations: 'getLocations',
            mapsSettings: 'getMapsSettings',
        }),
        userSettings: function() {
            if (this.mapsSettings)
                return this.mapsSettings.find(user => user.name === 'Liam')
        },

        loc: function() {
            return { title: 'loc', lat: this.userLat, lng: this.userLng }
        },
        home: function() {
            if (this.locations && this.userSettings) {
                let loc = this.locations.find(location => location.id === this.userSettings.home_id)
                return { title: loc.title, lat: parseFloat(loc.lat), lng: parseFloat(loc.lng) }
            }
        },
        fav: function() {
            if (this.locations && this.userSettings) {
                let loc = this.locations.find(location => location.id === this.userSettings.fav_id)
                return { title: loc.title, lat: parseFloat(loc.lat), lng: parseFloat(loc.lng) }
            }
        },

        distanceToHome: function() {
            if (this.userLat && this.home)
                return Math.sqrt((this.userLat - this.home.lat)*(this.userLat - this.home.lat) +
                                 (this.userLng - this.home.lng)*(this.userLng - this.home.lng))
        },
        distanceToFav: function() {
            if (this.userLat && this.fav)
                return Math.sqrt((this.userLat - this.fav.lat)*(this.userLat - this.fav.lat) +
                                 (this.userLng - this.fav.lng)*(this.userLng - this.fav.lng))
        },

        start: function() {
            if (this.distanceToHome < 0.05)
                return this.home
            else if (this.distanceToFav < 0.05)
                return this.fav
            return this.loc
        },
        destination: function() {
            if (this.distanceToHome)
                return this.distanceToHome < 0.05 ? this.fav : this.home
        },
        travelMethod: function() {
            if (this.userSettings)
                return this.userSettings.method
        },
    },
    watch: {
        destination: function() {
            this.getDirections()
        }
    },
    methods: {
        parseTravelData(duration) {
            var date = new Date()

            this.departureTime = date
            this.arrivalTime = new Date(date.getTime() + duration*1000)

            // Prettify the times for display
            this.departureTime = this.convert24To12(this.departureTime.getHours()) + ':' +
                                 this.zeroPadding(this.departureTime.getMinutes(), 2)

            this.arrivalTime = this.convert24To12(this.arrivalTime.getHours()) + ':' +
                               this.zeroPadding(this.arrivalTime.getMinutes(), 2)
        },

        getDirections() {
            this.$refs.map.$mapPromise.then(() => {
                let _this = this
                var directionsService = new google.maps.DirectionsService;
                var directionsDisplay = new google.maps.DirectionsRenderer;
                directionsDisplay.setMap(this.$refs.map.$mapObject);

                //google maps API's direction service
                function calculateAndDisplayRoute(directionsService, directionsDisplay) {
                    directionsService.route({
                        origin: _this.start,
                        destination: _this.destination,
                        travelMode: _this.travelMethod
                    }, function(response, status) {
                        if (status === 'OK') {
                            _this.directions = response.routes[0].legs
                            console.log('%c Directions ', 'background: #222; color: #bada55');
                            console.log(_this.directions);

                            _this.setAddress(_this.directions[0].start_address)
                            _this.parseTravelData(_this.directions[0].duration.value)
                            directionsDisplay.setDirections(response);
                        } else {
                            window.alert('Directions request failed due to ' + status);
                        }
                    });
                }

                calculateAndDisplayRoute(directionsService, directionsDisplay, this.start, this.destination);
            })
        },

        ...mapActions('settings', {
            setAddress: 'setAddress',
        })
    }
}
</script>

<style scoped>
    .travelText {
        text-align: center;
        font-size: 4vh;
        margin-top: 15vh;
    }
    a {
        color: black;
    }
</style>
