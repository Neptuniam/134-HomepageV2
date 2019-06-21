<template>
    <div class="row middle-xs weatherDisplay" style="margin-left: 5%; width: 100%;">
        <div class="date textBody"> {{date.getDate()}} {{months[date.getMonth()]}} {{date.getFullYear()}}
        </div>

        <div class="col-xs">
            <div v-if="weather">
                <div class="row" :uk-tooltip="address">
                    <span class="location textTitle">{{weather.location.name}}, {{weather.location.region}}</span>
                </div>

                <div class="row middle-xs curDescription">
                    <div class="col-xs-2">
                        <img :src="weather.current.condition.icon" alt="Condition Icon" class="curIcon">
                    </div>
                    <div class="col-xs uk-text-truncate curText textTitle">
                        <span>{{weather.current.feelslike_c}}&deg;C -</span>
                        <span class="">{{weather.current.condition.text}}</span>
                    </div>
                </div>

                <div class="row center-xs middle-xs textBody">
                    <div v-for="day in weather.forecast.forecastday" class="col-xs" :uk-tooltip="day.day.condition.text">
                        <div class="row">
                            <div class="col-xs-8 nopadding nomargin">
                                <img :src="day.day.condition.icon" alt="Condition Icon" class="forecastIcon">
                            </div>
                            <div class="col-xs nopadding nomargin">
                                <span class="forecastTemp">{{Math.round(day.day.maxtemp_c)}}</span>
                                <br>
                                <span class="forecastTemp">{{Math.round(day.day.mintemp_c)}}</span>
                            </div>
                        </div>
                        <span class="forecastDay">{{days[new Date(day.date).getDay()]}}</span>
                    </div>
                </div>
            </div>

            <maps />
            <div v-if="travelObj" class="row center-xs travelText textBody">
                Leave at {{travelObj.departureTime}} to arrive at {{travelObj.arrivalLoc}} by: {{travelObj.arrivalTime}}.  via:&nbsp;
                <a @click="showMap = !showMap">{{travelObj.method}}</a>
            </div>
            <favourites />
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data: function() {
        return {
            months: ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'],
            days: ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
            weather: null,
            // showMap: false
        }
    },
    computed: {
        ...mapGetters('settings', {
            location:  'getLocation',
            travelObj: 'getTravelObj',
            address:   'getAddress',
        }),
        date: function() {
            return new Date()
        }
    },
    watch: {
        location: function() {
            // Perform the Weather query anytime the users location changes
            let query = "http://api.apixu.com/v1/forecast.json?key=2a5f91f5f5b34808bea182102193001&q="+this.location+"&days=7"
            this.axios.get(query).then(weather => {
                this.weather = weather.data
                console.log('%c Weather ', 'background: #222; color: #bada55');
                console.log(weather.data);
            })
        }
    },
}
</script>

<style scoped>
    .date {
        font-size: 1.2rem;
        position: absolute;
        top: 10px;
        right: 30px;
    }

    .weatherDisplay {
        height: 100%;
        width: 100%;
    }

    .location {
        font-size: 10vh;
    }


    .curIcon {
        width: 17vh;
        height: 17vh;
    }
    .curText {
        font-size: 6.5vh;
    }

    .forecastIcon {
        width: 8vh;
        height: 8vh;
    }
    .forecastTemp {
        font-size: 3vh;
    }
    .forecastDay {
        font-size: 2vh;
    }

    .travelText {
        text-align: center;
        font-size: 4.5vh;
        margin-top: 15vh;
    }
    a {
        color: black;
    }
</style>
