<template>
    <div v-if="location">
        <gmap-map v-show="false" ref="map" :center="location" :zoom="15" style="width: 100%; height: 300px">
            <gmap-marker :position="this.location" />
            <gmap-marker :position="this.destination" />
        </gmap-map>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data: function() {
        return {
            showMap: true,
            directions: null,
            departureTime: null,
            arrivalTime: null,
            method: 'DRIVING',

            //Important Addresses
            home   : { title: 'Home',    lat: 51.018350,     lng: -114.313620 },
            work   : { title: 'Work',    lat: 51.042130,     lng: -114.035890 },
            guelph : { title: 'Home',    lat: 43.519570,     lng: -80.229080 },
            school : { title: 'School',  lat: 43.5301401,    lng: -80.22631060000001 },
        }
    },
    computed: {
        ...mapGetters('settings', {
            userLat: 'getLat',
            userLng: 'getLng',
        }),
        distanceToHome: function() {
            if (this.userLat && this.userLng) {}
                return Math.sqrt((this.userLat - this.home.lat)*(this.userLat - this.home.lat) + (this.userLng - this.home.lng)*(this.userLng - this.home.lng));
        },
        distanceToWork: function() {
            if (this.userLat && this.userLng)
                return Math.sqrt((this.userLat - this.work.lat)*(this.userLat - this.work.lat) + (this.userLng - this.work.lng)*(this.userLng - this.work.lng));
        },
        location: function() {
            console.log('%c distanceToHome ', 'background: #222; color: #bada55');
            console.log(this.distanceToHome);
            // Based off our distance to keypoints set our start location
            if (this.distanceToHome < 0.05)
                return this.home
            else if (this.distanceToWork < 0.05)
                return this.work
            else
                return {
                    title: 'loc',
                    lat: this.userLat,
                    lng: this.userLng
                }
        },
        destination: function() {
            return this.distanceToHome < 0.05 ? this.work : this.home
        }
    },
    mounted: function() {
        this.$refs.map.$mapPromise.then(() => {
            let _this = this
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;
            directionsDisplay.setMap(this.$refs.map.$mapObject);

            //google maps API's direction service
            function calculateAndDisplayRoute(directionsService, directionsDisplay, start, destination) {
                directionsService.route({
                    origin: start,
                    destination: destination,
                    travelMode: 'DRIVING'
                }, function(response, status) {
                    if (status === 'OK') {
                        _this.directions = response.routes[0].legs
                        console.log('%c Directions ', 'background: #222; color: #bada55');
                        console.log(_this.directions);

                        _this.setAddress(_this.directions[0].start_address)
                        _this.parseTravelTime(_this.directions[0].duration.value)
                        directionsDisplay.setDirections(response);
                    } else {
                        window.alert('Directions request failed due to ' + status);
                    }
                });
            }

            calculateAndDisplayRoute(directionsService, directionsDisplay, this.location, this.destination);
        })
    },
    methods: {
        timeConvert(time) {
            var hour = time.getHours(), minute = time.getMinutes()

            if (hour >= 12)
                hour -= 12

            if (minute < 10)
                minute = "0" + minute

            return hour+":"+minute
        },

        parseTravelTime(duration) {
            var date = new Date()
            var travelObj = {
                departureLoc: this.location.title,
                arrivalLoc: this.destination.title,
                method: 'Driving',
                departureTime: date,
                arrivalTime: new Date(date.getTime() + duration*1000),
                days: 0
            }

            travelObj.departureTime = this.timeConvert(travelObj.departureTime)
            travelObj.arrivalTime = this.timeConvert(travelObj.arrivalTime)


            this.setTravelObj(travelObj)
        },

        ...mapActions('settings', {
            setTravelObj: 'setTravelObj',
            setAddress: 'setAddress',
        })
    }
}
</script>

<style scoped>
</style>
