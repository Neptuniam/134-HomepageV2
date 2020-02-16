<template>
<div>
    <div class="row center-xs textBody uk-text-truncate ">
        <div class="travelText Widget">
            {{travelText}}
            <!-- Leave at {{departureTime}} to arrive at {{destination.title}} by {{arrivalTime}}. Via:&nbsp; -->
            <!-- <a @click="showMap = !showMap">{{travelMethod}}</a> -->
        </div>
    </div>


    <div v-show="false">
        <gmap-map ref="map" :center="origin" :zoom="15" style="width: 1px; height: 1px">
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
    data() {
        return {
            home: null,
            fav: null,

            origin: { title: 'loc', lat: 0, lng: 0 },
            destination: null,
            travelMethod: null,

            showMap: true,
            directions: null,
            departureTime: null,
            arrivalTime: null,
            travelText: null,
        }
    },
    computed: {
        loc() {
            return { title: 'loc', lat: this.userLat, lng: this.userLng }
        },

        widget() {
            if (this.widgets)
                return this.widgets.find(widget => widget.title === 'Maps')
        },

        ...mapGetters('settings', {
            widgets: 'getWidgets',
            activePage: 'getActivePage',
            userLat: 'getLat',
            userLng: 'getLng',
            locations: 'getLocations',
            mapsSettings: 'getMapsSettings',
        })
    },
    methods: {
        distanceToLoc(loc) {
            return Math.sqrt((this.userLat - this.loc.lat)*(this.userLat - this.loc.lat) +
                             (this.userLng - this.loc.lng)*(this.userLng - this.loc.lng))
        },
        findLoc(toFind) {
            if (this.locations) {
                let loc = this.locations.find(location => location.id === toFind)

                if (loc)
                    return { title: loc.title, lat: parseFloat(loc.lat), lng: parseFloat(loc.lng) }
                console.log("Could not find Location: " + toFind);
            }
        },

        determineOrigin(home, fav) {
            if (this.distanceToLoc(home) < 0.05)
                return home
            if (this.distanceToLoc(fav) < 0.05)
                return fav
            return this.loc
        },
        determineDest(home, fav) {
            return this.origin == home ? fav : home
        },


        initLocations() {
            let home = this.findLoc(this.mapsSettings.home_id)
            let fav = this.findLoc(this.mapsSettings.fav_id)

            // Determine three key attributes for maps request
            this.origin = this.determineOrigin(home, fav)
            this.destination = this.determineDest(home, fav)
            this.travelMode = this.mapsSettings.method

            this.getDirections()
        },

        parseTravelData(duration) {
            var date = new Date()

            let departureDate = date
            let arrivalDate = new Date(date.getTime() + duration*1000)

            // Prettify the times for display
            this.departureTime = this.convert24To12(departureDate.getHours()) + ':' +
                                 this.zeroPadding(departureDate.getMinutes(), 2)

            this.arrivalTime = this.convert24To12(arrivalDate.getHours()) + ':' +
                               this.zeroPadding(arrivalDate.getMinutes(), 2)
        },

        createDisplay(duration) {
            if (this.travelMode == "DRIVING") {
                this.travelText = `Arrive at ${this.destination.title} in ${duration.text}.`
            } else {
                this.parseTravelData(duration.value)
                this.travelText = `Leave at ${this.departureTime} to arrive at ${this.destination.title} by ${this.arrivalTime}. Via: ${this.travelMode}`
            }
        },

        async getDirections() {
            await this.$refs.map.$mapPromise

            let _this = this
            let directionsService = new google.maps.DirectionsService;
            let directionsDisplay = new google.maps.DirectionsRenderer;
            directionsDisplay.setMap(this.$refs.map.$mapObject);

            //google maps API's direction service
            function calculateAndDisplayRoute(directionsService, directionsDisplay) {
                directionsService.route({
                    origin: _this.origin,
                    destination: _this.destination,
                    travelMode: _this.travelMode
                }, function(response, status) {
                    if (status === 'OK') {
                        _this.directions = response.routes[0].legs
                        console.log('%c Directions ', 'background: #222; color: #bada55');
                        console.log(_this.directions);

                        _this.createDisplay(_this.directions[0].duration)
                        directionsDisplay.setDirections(response);
                    } else {
                        window.alert('Directions request failed due to ' + status);
                    }
                });
            }

            calculateAndDisplayRoute(directionsService, directionsDisplay, this.start, this.destination);
        },

        ...mapActions('settings', {
            setAddress: 'setAddress',
            fetchMapsSettings: 'fetchMapsSettings',
            fetchLocations: 'fetchLocations'
        })
    },
    async mounted() {
        await Promise.all([this.fetchMapsSettings(), this.fetchLocations()])
        this.initLocations()

        if (this.widget && this.widget.interval)
            setInterval(this.initLocations(), this.widget.interval * 60000)
    },
}
</script>

<style scoped>
    .travelText {
        font-weight: 600px;
        font-size: 4vh;
        text-align: center;

    }
    a {
        color: black;
    }
</style>
