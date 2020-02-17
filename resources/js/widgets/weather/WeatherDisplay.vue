<template>
<div v-if="weather" class="row fullWidth Weather">
    <div v-if="weather && weather.current" class="row curDescription textSpecial fullWidth nopadding"
        :uk-tooltip="address && address.formatted_address ? address.formatted_address : 'Could not find Address'">
        <div class="col-xs start-xs">
            <i :class="getIcon(weather.current.IconPhrase)" />
        </div>
        <div class="col-xs-7 center-xs">
            <!-- {{parseAddress()}} -->
            {{weather.location.LocalizedName}}
        </div>
        <div class="col-xs end-xs">
            {{Math.round(weather.current.value)}}&deg; C
        </div>
    </div>
    <!-- <input v-model="curLoc" v-on:keyup.enter="getWeather(curLoc)" @click='curLoc = " "' v-if="curLoc"
           type="text" class="textSpecial" :style="'width: '+curLoc.length*2+'vw;'"> -->

    <div class="row center-xs middle-xs textBody fullWidth forecast">
        <div v-for="day in weather.forecast" class="col-xs day uk-box-shadow-hover-large" :uk-tooltip="day.Day.IconPhrase">
            <div class="row middle-xs">
                <div class="col-xs-7">
                    <i :class="getIcon(day.Day.IconPhrase)" />
                </div>
                <div class="col-xs-3 forecastTemp nospacing">
                    {{Math.round(day.Temperature.Maximum.Value)}}&deg;
                    <br>
                    {{Math.round(day.Temperature.Minimum.Value)}}&deg;
                </div>
            </div>

            <hr>
            <div class="forecastDay bottom-xs">
                {{getDay(day)}}
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    props: ['widget'],
    data() {
        return {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            weather: null,
            curLoc: null,
            weatherIconMap: {
                sunny: "sunny",
                clear: "stars",
                rain: "rain",
                cloudy: "cloudy",
                overcast: "sunny-overcast",
                mixed: "rain-mix",
                showers: "showers",
                drizzle: "showers",
                thunder: "storm-showers",
                thundery: "storm-showers",
                snow: "snow",
                blizzard: "snow",
                fog: "fog",
                mist: "fog",
                dust: "fog",
                smokey: "fog",
                wind: "windy",
                breezy: "windy",
                sleet: "sleet",
                pellets: "sleet"
            }
        }
    },
    computed: {
        ...mapGetters('settings', {
            location:  'getLocation',
            address:   'getAddress',
        }),
    },
    methods: {
        parseAddress() {
            if (this.address && this.address.formatted_address) {
                let split = this.address.formatted_address.split(',')

                if (split.length >= 2)
                    return split[1]
            }

            return ""
        },

        getDay(day) {
            return this.days[new Date(day.EpochDate*1000).getDay()]
        },

        getIcon(curWeather) {
            var splitWeatherDesc = curWeather.toLowerCase().split(" "), tempIconText = null, i = 0;
            var iconText = "wi wi-day-";

            while (tempIconText == null && i < splitWeatherDesc.length)
                if ((tempIconText = this.weatherIconMap[splitWeatherDesc[i++]]) != null)
                    iconText += tempIconText;

            return (iconText)
        },

        async getWeather(location) {
            if (location === 'loc')
                location = this.location

            let accu = "http://dataservice.accuweather.com/"
            let key = process.env.MIX_ACCU_KEY

            let locResponse = await this.axios.get(accu+"locations/v1/cities/geoposition/search.json?q="+location+"&apikey="+key)
            let forecastResponse = await this.axios.get(accu+"forecasts/v1/daily/5day/"+locResponse.data.Key+"?apikey="+key+"&metric=true")
            let currrentResponse = await this.axios.get(accu+"forecasts/v1/hourly/1hour/"+locResponse.data.Key+"?apikey="+key+"&metric=true")
            let current = {
                value: currrentResponse.data[0].Temperature.Value,
                IconPhrase: currrentResponse.data[0].IconPhrase
            }

            this.weather = {}
            this.$set(this.weather, 'location', locResponse.data)
            this.$set(this.weather, 'current', current)
            this.$set(this.weather, 'forecast', forecastResponse.data.DailyForecasts)

            console.log('%c Weather ', 'background: #222; color: #bada55');
            console.log(this.weather);

            this.curLoc = this.parseAddress()
        },
    },
    mounted() {
        this.getWeather(this.location)

        if (this.widget && this.widget.interval)
            setInterval(this.getWeather(this.location), this.widget.interval * 60000)
    },
}
</script>

<style scoped>
    .Weather {
        height: 100% !important;
        width: 100% !important;

        margin-bottom: 15vh;
    }

    .forecast {
        height: 18.5vh;
    }

    .day {
        border: 1.5px solid grey;
        border-radius: 5px;

        margin: 0px 7.5px;
        background: rgba(200,200,200,0.75);

        height: 80% !important;
    }
    .day:hover {
        background: rgba(220,220,220,0.95);
        height: 100% !important;
    }

    .day i {
        margin-top: 2vh !important;
        font-size: 5vh;
    }
    .day:hover i {
        margin-top: 2vh !important;
        font-size: 6.5vh;
    }

    .forecastTemp {
        font-size: 3vh;
        text-align: right;
    }
    .day:hover .forecastTemp {
        font-size: 4vh;
        text-align: right;
    }

    .forecastDay {
        font-size: 2vh;
    }
    .day:hover .forecastDay {
        font-size: 3vh;
    }


    .day hr {
        margin: 10px 0px 5px 0px;
        border-color: grey;
    }

    /* input {
        border: none;
        background: none;
        color: black;
    } */

    .curDescription, .curDescription input {
        font-size: 4vw;
    }


</style>
