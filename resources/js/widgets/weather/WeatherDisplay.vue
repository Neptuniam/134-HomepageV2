<template>
    <div class="row middle-xs weatherDisplay">
        <div class="col-xs">
            <div v-if="weather">
                <div class="row center-xs bottom-xs location textSpecial" :uk-tooltip="address">
                    {{weather.location.name}}, {{weather.location.region}}
                </div>

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
        }
    },
    computed: {
        ...mapGetters('settings', {
            location:  'getLocation',
            address:   'getAddress',
        }),
    },
    created: function() {
        // Update the weather every 10 minutes
        // setInterval(this.getWeather, 600000)
        this.getWeather()
    },
    methods: {
        getWeather() {
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
    .weatherDisplay {
        /* height: 100%; */
        width: 100%;
    }

    .location {
        font-size: 10vh;
        text-align: center;
        margin-bottom: 0;
    }



    .curDescription {
        /* margin: 0 0 10vh 0; */
        font-size: 6.5vh;
    }
    .curIcon {
        width: 17vh;
        height: 17vh;
    }
    .curText {
    }

    .forecastIcon {
        /* width: 100%;
        height: 100%; */
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
