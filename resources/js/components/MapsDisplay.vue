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
            if (this.userLat && this.userLng)
                return Math.sqrt((this.userLat - this.home.lat)*(this.userLat - this.home.lat) + (this.userLng - this.home.lng)*(this.userLng - this.home.lng));
        },
        distanceToWork: function() {
            if (this.userLat && this.userLng)
                return Math.sqrt((this.userLat - this.work.lat)*(this.userLat - this.work.lat) + (this.userLng - this.work.lng)*(this.userLng - this.work.lng));
        },
        location: function() {
            console.log('distanceToHome');
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
                        console.log(_this.directions);
                        _this.setDisplay()
                        directionsDisplay.setDirections(response);
                    } else {
                        window.alert('Directions request failed due to ' + status);
                    }
                });
            }

            calculateAndDisplayRoute(directionsService, directionsDisplay, this.location, this.destination);
            // _this.parseTravelTime(_this.directions[0].duration.text)
        })
    },
    methods: {
        // timeConvert(time) {
        //     // Check correct time format and split into components
        //     time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        //
        //     if (time.length > 1) { // If time format correct
        //         time = time.slice (1);  // Remove full string match value
        //         time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        //         time[0] = +time[0] % 12 || 12; // Adjust hours
        //     }
        //     return time.join (''); // return adjusted time or original string
        // },

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

            // travelObj.departureTime = this.timeConvert(travelObj.departureTime.getHours()+":"+travelObj.departureTime.getMinutes())
            // travelObj.arrivalTime = this.timeConvert(travelObj.arrivalTime.getHours()+":"+travelObj.arrivalTime.getMinutes())
            travelObj.departureTime = this.timeConvert(travelObj.departureTime)
            travelObj.arrivalTime = this.timeConvert(travelObj.arrivalTime)


            this.setTravelObj(travelObj)
        },

        setDisplay: function() {
            this.parseTravelTime(this.directions[0].duration.value)
            // console.log(this.parseTravelTime(this.directions[0].duration.text.split(' ')));
        },

        ...mapActions('settings', {
            setTravelObj: 'setTravelObj'
        })
    }
}
</script>

<style scoped>
</style>
