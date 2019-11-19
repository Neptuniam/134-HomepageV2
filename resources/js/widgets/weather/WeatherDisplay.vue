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
<div v-if="weather" class="row fullWidth">
    <div class="row center-xs middle-xs curDescription textSpecial fullWidth nopadding" :uk-tooltip="address">
        <div v-if="weather.length && weather[0] != undefined && weather[0].Temperature != undefined && weather[0].Temperature.current != undefined">
            {{weather[0].Temperature.current}}&deg;C
        </div>
    </div>

    <div class="row center-xs middle-xs textBody fullWidth">
        <div v-for="day in weather" class="col-xs" :uk-tooltip="day.Day.IconPhrase">
            <div class="row middle-xs">
                <div class="col-xs-7">
                    {{day.Day.IconPhrase}}
                </div>
                <div class="col-xs-3 forecastTemp nospacing">
                    {{day.Temperature.Maximum.Value}}
                    {{day.Temperature.Minimum.Value}}
                </div>
            </div>
            <span class="forecastDay">{{days[new Date(day.EpochDate*1000).getDay()-1]}}</span>
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
        this.getWeather(this.location)

        if (this.widget && this.widget.interval) {
            setInterval(() => {
                this.getWeather(this.location)
            }, this.widget.interval * 60000)
        }
    },
    methods: {
        getDay(day) {
            return this.days[new Date(day).getDay()]
        },

        getWeather(location) {
            if (location === 'loc')
                location = this.location

            let query = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/49546?apikey=W3pCKGGHlxaRrT4VyJvgAqACYu08JSyx&metric=true"
            this.axios.get(query).then(response => {
                query = "http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/49546?apikey=W3pCKGGHlxaRrT4VyJvgAqACYu08JSyx&metric=true"
                this.axios.get(query).then(response2 => {
                    this.weather = response.data.DailyForecasts
                    this.weather[0].Temperature.current = response2.data[0].Temperature.Value

                    console.log('%c Weather ', 'background: #222; color: #bada55');
                    console.log(this.weather);
                })
            })
        },
    },
}
</script>

<style scoped>
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
