<template>
<div>
    <div class="row center-xs textBody uk-text-truncate ">
        <div class="travelText Widget">
            <span @click="forceUpdate"> {{travelText}} </span>
            <a @click="showMap" class="uk-text-capitalize"> Via: {{travelMode}} </a>
        </div>

        <!-- <hr class="" style="margin: 20px 0 0 0 !important; width: 50vw !important;"> -->
    </div>


    <div v-if="origin" v-show="showingMap" class="mapsPosition" @click="hideMap" id="container">
        <div class="row" style="border: 1px black solid; width: 90vw">
            <gmap-map ref="map" :center="origin" :zoom="15" class="col-xs" id="map">
                <gmap-marker :position="origin" />
                <gmap-marker :position="destination" />
            </gmap-map>

            <div v-if="showingMap && directions" class="col-xs-4 instructionsContainer start-xs">
                <img class="qrCode" :src="getQR()" alt="Google Maps QR Code">
                <h1> Directions </h1>

                <ol>
                    <li v-for="step in directions.routes[0].legs[0].steps" style="margin: 10px 0px" v-html="step.instructions" />
                </ol>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    props: ['widget',],

    data() {
        return {
            home: null,
            fav: null,

            origin: { title: 'loc', lat: 0, lng: 0 },
            destination: null,
            travelMode: null,

            showingMap: false,
            directions: null,
            travelText: null,
        }
    },
    computed: {
        ...mapGetters('settings', {
            userLat: 'getLat',
            userLng: 'getLng',
            locations: 'getLocations',
            mapsSettings: 'getMapsSettings',
        })
    },
    methods: {
        getQR() {
            return `https://chart.googleapis.com/chart?chs=100x100&cht=qr&chl=http://maps.google.com/maps?q=${this.destination.lat},${this.destination.lng}`
        },

        distanceToLoc(loc) {
            return Math.sqrt((this.userLat - loc.lat)*(this.userLat - loc.lat) +
                             (this.userLng - loc.lng)*(this.userLng - loc.lng))
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
            return { title: 'loc', lat: this.userLat, lng: this.userLng }
        },
        determineDest(home, fav) {
            return this.origin == home ? fav : home
        },


        matchLocations(curPayload, cachedPayload) {
            // Compare the core details of all the payload attributes
            return  curPayload.origin.title == cachedPayload.origin.title &&
                    curPayload.destination.title == cachedPayload.destination.title &&
                    curPayload.travelMode == cachedPayload.travelMode
        },
        checkTimeSince(cachedTime) {
            // Check that the cached data isn't "too old"
            return ((new Date().getTime() - new Date(cachedTime).getTime()) / 1800000) < 1
        },
        initLocations() {
            let CachedMaps = JSON.parse(localStorage.getItem('LastMapsDetails'))

            let home = this.findLoc(this.mapsSettings.home_id)
            let fav = this.findLoc(this.mapsSettings.fav_id)

            // Determine three key attributes for maps request
            this.origin = this.determineOrigin(home, fav)
            this.destination = this.determineDest(home, fav)
            this.travelMode = this.mapsSettings.method

            let payload = {
                origin: this.origin,
                destination: this.destination,
                travelMode: this.travelMode
            }

            // If there is data in the cache, the user hasn't moved locations and the data is still recent, avoid making too many api usages
            if (CachedMaps && this.matchLocations(payload, CachedMaps.payload) && this.checkTimeSince(CachedMaps.RetrievedDate)) {
                this.directions = CachedMaps
                util.trackResult('maps', 0, this.directions)

                this.createDisplay(this.directions.routes[0].legs[0].duration)
            } else {
                this.getDirections(payload)
            }
        },

        forceUpdate() {
            let payload = {
                origin: this.origin,
                destination: this.destination,
                travelMode: this.travelMode
            }

            this.getDirections(payload)
        },

        hideMap($event) {
            if ($event.target.id == 'container')
                this.showingMap = false
        },
        showMap() {
            let directionsDisplay = new google.maps.DirectionsRenderer;
            directionsDisplay.setMap(this.$refs.map.$mapObject);
            directionsDisplay.setDirections(this.directions);

            this.showingMap = true
        },

        parseTravelData(duration) {
            var date = new Date()

            let departureDate = date
            let arrivalDate = new Date(date.getTime() + duration*1000)

            // Prettify the times for display
            return {
                departureTime:  this.convert24To12(departureDate.getHours()) + ':' +
                                this.zeroPadding(departureDate.getMinutes(), 2),

                arrivalTime:    this.convert24To12(arrivalDate.getHours()) + ':' +
                                this.zeroPadding(arrivalDate.getMinutes(), 2)
            }
        },

        createDisplay(duration) {
            if (this.travelMode == "DRIVING") {
                this.travelText = `Arrive at ${this.destination.title} in ${duration.text}.`
            } else {
                let travelData = this.parseTravelData(duration.value)
                this.travelText = `Leave at ${travelData.departureTime} to arrive at ${this.destination.title} by ${travelData.arrivalTime}. Via: ${this.travelMode}`
            }
        },

        async getDirections(payload) {
            await this.$refs.map.$mapPromise

            let _this = this
            let directionsService = new google.maps.DirectionsService;
            let directionsDisplay = new google.maps.DirectionsRenderer;
            directionsDisplay.setMap(this.$refs.map.$mapObject);

            //google maps API's direction service
            function calculateAndDisplayRoute(directionsService, directionsDisplay) {
                directionsService.route(payload, function(response, status) {
                    if (status === 'OK') {
                        _this.directions = response //.routes[0].legs[0]
                        _this.$set(_this.directions, 'RetrievedDate', new Date())
                        _this.$set(_this.directions, 'payload', payload)

                        util.trackResult('maps', 1, _this.directions)
                        localStorage.setItem('LastMapsDetails', JSON.stringify(_this.directions))

                        _this.createDisplay(_this.directions.routes[0].legs[0].duration)
                        // directionsDisplay.setDirections(_this.directions);
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
        font-size: 3.5vh;
        /* text-align: center; */
    }
    a {
        color: black;
    }

    .mapsPosition {
        position: fixed;
        top: 0px;
        left: 0px;

        padding: 10vh 5vw;

        height: 100vh;
        width: 100vw;

        z-index: 5;
    }
    .mapsPosition .vue-map-container {
        /* width: 80vw;
        height: 80vh; */

        /* border: 1px black solid; */
        z-index: 1;
    }
    .mapsPosition .instructionsContainer {
        position: relative;

        min-width: 500px;
        max-width: 500px;
        height: 80vh;

        background-color: white;

        overflow-y: auto;
    }
    .instructionsContainer h1 {
        margin: 30px 0 0 10px;
        text-decoration: underline;
    }

    .qrCode {
        position: absolute;
        top: 0px;
        right: 0px;
    }
</style>
