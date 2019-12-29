<!-- <template>
<div v-if="weather">
    <div class="row center-xs middle-xs curDescription textSpecial fullWidth nopadding" :uk-tooltip="address">
        <img :src="weather.current.condition.icon" alt="Condition Icon" class="curIcon nospacing"
             :uk-tooltip="weather.current.condition.text">
        {{Math.round(weather.current.feelslike_c)}}&deg;C -

        <input v-model="curLoc" v-on:keyup.enter="getWeather(curLoc)" @click='curLoc = " "' v-if="curLoc"
               type="text" class="textSpecial" :style="'width: '+curLoc.length*2+'vw;'">
    </div>

    <div class="row center-xs middle-xs textBody fullWidth">
        <div v-for="day in weather.forecast.forecastday" class="col-xs" :uk-tooltip="day.day.condition.text">
            <div class="row">
                <div class="col-xs-7 end-xs nospacing">
                    <img :src="day.day.condition.icon" alt="Condition Icon" class="forecastIcon">
                </div>
                <div class="col-xs-3 forecastTemp nospacing">
                    {{Math.round(day.day.maxtemp_c)}}&deg;
                    {{Math.round(day.day.mintemp_c)}}&deg;
                </div>
            </div>
            <span class="forecastDay">{{getDay(day.date)}}</span>
        </div>
    </div>
</div>
</template> -->
<template>
<div v-if="weather" class="row fullWidth Weather">
    <div class="row start-xs middle-xs curDescription textSpecial fullWidth nopadding" :uk-tooltip="address.formatted_address">
        <div v-if="weather.length && weather[0].Temperature && weather[0].Temperature.current != undefined">
            {{weather[0].Temperature.current}}&deg;C - {{parseAddress()}}
        </div>
    </div>

    <div class="row center-xs middle-xs textBody fullWidth">
        <div v-for="day in weather" class="col-xs day" :uk-tooltip="day.Day.IconPhrase">
            <div class="row middle-xs">
                <div class="col-xs-7">
                    <!-- {{day.Day.IconPhrase}} -->
                    <i :class="getIcon(1, day.Day.IconPhrase)"></i>
                </div>
                <div class="col-xs-3 forecastTemp nospacing">
                    {{Math.round(day.Temperature.Maximum.Value)}}
                    <br>
                    {{Math.round(day.Temperature.Minimum.Value)}}
                </div>
            </div>

            <hr>

            <span class="forecastDay">{{getDay(day)}}</span>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    props: ['widget'],
    data: function() {
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
            // return this.days[new Date(day).getDay()]
            return this.days[new Date(day.EpochDate*1000).getDay()]
        },

        getIcon(isDay, curWeather) {
            var splitWeatherDesc = curWeather.toLowerCase().split(" "), tempIconText = null, i = 0;
            var iconText = "wi wi-";

            iconText += (isDay == 1 || curWeather.includes("overcast") ) ? 'day-' : 'night-alt-'

            while (tempIconText == null && i < splitWeatherDesc.length)
                if ((tempIconText = this.weatherIconMap[splitWeatherDesc[i++]]) != null)
                    iconText += tempIconText;

            console.log(curWeather + " -> " + iconText);
            return (iconText)
        },

        getWeather(location) {
            if (location === 'loc')
                location = this.location

            let accu = "http://dataservice.accuweather.com/forecasts/v1/"
            let query = accu+"daily/5day/49546?apikey=W3pCKGGHlxaRrT4VyJvgAqACYu08JSyx&metric=true"

            this.axios.get(query).then(response => {
                query = accu+"hourly/1hour/49546?apikey=W3pCKGGHlxaRrT4VyJvgAqACYu08JSyx&metric=true"

                this.axios.get(query).then(response2 => {
                    this.weather = response.data.DailyForecasts
                    this.weather[0].Temperature.current = response2.data[0].Temperature.Value

                    console.log('%c Weather ', 'background: #222; color: #bada55');
                    console.log(this.weather);

                    this.curLoc = this.parseAddress()
                    console.log(this.curLoc);
                })
            })
        },
    },
    mounted: function() {
        this.getWeather(this.location)

        if (this.widget && this.widget.interval) {
            setInterval(() => {
                this.getWeather(this.location)
            }, this.widget.interval * 60000)
        }
    },
}
</script>

<style scoped>
    .Weather {
        height: 100% !important;
        width: 100% !important;

        margin-bottom: 15vh;
    }

    .day {
        border: 1px solid grey;
        border-radius: 5px;

        margin: 0px 7.5px;
        background: rgba(200,200,200,0.75);
    }

    .day i {
        margin-top: 2vh !important;
        font-size: 5vh;
    }

    .day hr {
        margin: 10px 0px 0px 0px;
    }

    .location {
        font-size: 5vh;
        text-align: center;
        margin-bottom: 0;
    }

    input {
        border: none;
        background: none;
        color: black;
    }

    .curDescription, .curDescription input {
        font-size: 4vw;
    }
    .curIcon {
        width: 15vh;
        height: 15vh;
        padding-bottom: 1vh;
        text-align: center;
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

    .col-xs {
        /* min-width: 15vw !important; */
        /* max-width: 15vw !important; */
    }
</style>
