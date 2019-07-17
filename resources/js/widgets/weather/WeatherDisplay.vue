<template>
<div v-if="weather" class="weatherDisplay fullWidth">
    <input v-model="curLoc" v-on:keyup.enter="getWeather(curLoc)" @click='curLoc = null'
           type="text" class="row center-xs bottom-xs fullWidth location textSpecial" :uk-tooltip="address">

    <div class="row center-xs middle-xs curDescription nopadding">
        <img :src="weather.current.condition.icon" alt="Condition Icon" class="curIcon">
        <div class="uk-text-truncate curText textSpecial">
            {{weather.current.feelslike_c}}&deg;C - {{weather.current.condition.text}}
        </div>
    </div>

    <div class="row center-xs middle-xs textBody">
        <div v-for="day in weather.forecast.forecastday" class="col-xs" :uk-tooltip="day.day.condition.text">
            <div class="row">
                <div class="col-xs end-xs nopadding nomargin">
                    <img :src="day.day.condition.icon" alt="Condition Icon" class="forecastIcon">
                </div>
                <div class="col-xs-3 forecastTemp nopadding nomargin">
                    {{Math.round(day.day.maxtemp_c)}}&deg;
                    {{Math.round(day.day.mintemp_c)}}&deg;
                </div>
                <div class="col-xs-2" />
            </div>
            <span class="forecastDay">{{days[new Date(day.date).getDay()]}}</span>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data: function() {
        return {
            days: ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
            weather: null,
            curLoc: null,
        }
    },
    computed: {
        ...mapGetters('settings', {
            location:  'getLocation',
            address:   'getAddress',
        }),
    },
    mounted: function() {
        // Update the weather every 10 minutes
        // setInterval(this.getWeather, 600000)
        this.getWeather(this.location)
    },
    methods: {
        getWeather(location) {
            let query = "http://api.apixu.com/v1/forecast.json?key=2a5f91f5f5b34808bea182102193001&q="+location+"&days=7"
            this.axios.get(query).then(weather => {
                this.weather = weather.data
                console.log('%c Weather ', 'background: #222; color: #bada55');
                console.log(weather.data);
                this.curLoc = (this.weather.location.name +', ' +this.weather.location.region)
            })
        },
    },
}
</script>

<style scoped>
    .weatherDisplay {
        width: 100%;
    }

    .location {
        font-size: 10vh;
        text-align: center;
        margin-bottom: 0;
    }

    input {
        font-size: 10vh;
        text-align: center;
        margin-bottom: 0;

        border: none;
        border-radius: none;
        background: none;
        color: black;
    }

    .curDescription {
        /* margin: 0 0 10vh 0; */
        font-size: 6.5vh;
    }
    .curIcon {
        width: 17vh;
        height: 17vh;
    }

    .forecastIcon {
        width: 90%;
        height: 90%;
    }
    .forecastTemp {
        font-size: 3vh;
        text-align: right;
    }
    .forecastDay {
        font-size: 2vh;
        text-align: left;
    }

</style>
