<template>
    <div>
        <div class="row center-xs travelText textBody uk-text-truncate">
            Leave at {{departureTime}} to arrive at {{start.title}} by {{arrivalTime}}. Via:&nbsp;
            <a @click="showMap = !showMap">Driving</a>
        </div>

        <div v-if="start">
            <gmap-map v-show="false" ref="map" :center="start"
                     :zoom="15" style="width: 1px; height: 1px">
                <gmap-marker :position="this.start" />
                <gmap-marker :position="this.destination" />
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
        }),
        location: function() {
            return {
                title: 'loc',
                lat: this.userLat,
                lng: this.userLng
            }
        },
        homeLoc: function() {
            if (this.locations)
                return this.locations.find(location => location.favourite == 'Home')
        },
        favLoc: function() {
            if (this.locations)
                return this.locations.find(location => location.favourite == 'Favourite')
        },
        distanceToHome: function() {
            if (this.userLat && this.userLng && this.homeLoc)
                return Math.sqrt((this.userLat - this.homeLoc.lat)*(this.userLat - this.homeLoc.lat) + (this.userLng - this.homeLoc.lng)*(this.userLng - this.homeLoc.lng));
        },
        distanceToWork: function() {
            if (this.userLat && this.userLng && this.favLoc)
                return Math.sqrt((this.userLat - this.favLoc.lat)*(this.userLat - this.favLoc.lat) + (this.userLng - this.favLoc.lng)*(this.userLng - this.favLoc.lng));
        },
        start: function() {
            // Based off our distance to keypoints set our start start
            if (this.distanceToHome < 0.05)
                return { title: this.homeLoc.title,    lat: parseFloat(this.homeLoc.lat),     lng: parseFloat(this.homeLoc.lng) }
            else if (this.distanceToWork < 0.05)
                return { title: this.favLoc.title,    lat: parseFloat(this.favLoc.lat),     lng: parseFloat(this.favLoc.lng) }
            return this.location
        },
        destination: function() {
            if (this.homeLoc && this.favLoc)
                return this.distanceToHome < 0.05 ? { title: this.favLoc.title, lat: parseFloat(this.favLoc.lat), lng: parseFloat(this.favLoc.lng) } :
                                                    { title: this.homeLoc.title,lat: parseFloat(this.homeLoc.lat),lng: parseFloat(this.homeLoc.lng) }
        },
        travelMethod: function() {
            return 'DRIVING'
        },
    },
    mounted: function() {
        this.$refs.map.$mapPromise.then(() => {
            let _this = this
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;
            directionsDisplay.setMap(this.$refs.map.$mapObject);

            //google maps API's direction service
            function calculateAndDisplayRoute(directionsService, directionsDisplay, start, destination,) {
                directionsService.route({
                    origin: start,
                    destination: destination,
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
