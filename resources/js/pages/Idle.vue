<template>
<div class="IdleDisplay row middle-xs animated fadeIn">
    <div class="container row center-xs middle-xs">
        <div v-if="weather" class="col-xs-7 row middle-xs center-xs weather">
            <div class="col-xs-5 end-xs">
                <i :class="getIcon(weather.current.IconPhrase)" />
            </div>

            <span class="col-xs start-xs">
                <div>
                    {{Math.round(weather.current.value)}}&deg; C
                </div>
                {{weather.current.IconPhrase}}
            </span>
        </div>

        <!-- <div class="col-xs-1">

        </div> -->

        <div class="col-xs start-xs">
            <DateTime componentClass="center-idle" />
        </div>


        <div v-if="getTravelText" class="col-xs-12 travelText">
            {{getTravelText.travelText}}
        </div>
        <div v-else-if="newsWidget">
            <News :widget="newsWidget" />
        </div>
    </div>

    <!-- <a v-if="news" class="row center-xs middle-xs News" :href="news[index].webUrl" target="_blank">
        {{news[index].webTitle}}
    </a> -->
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            index: Math.floor(Math.random() * 10),
            weatherIconMap: {
                'sunny': "sunny",
                'hot': "hot",
                'cold': "snowflake-cold",
                'clear': "clear",
                'rain': "rain",
                'cloudy': "cloudy",
                'clouds': "cloudy",
                'dreary': "sunny-overcast",
                'overcast': "sunny-overcast",
                'mixed': "rain-mix",
                't-storms': "lightning",
                'showers': "showers",
                'flurries': "showers",
                'drizzle': "showers",
                'thunder': "storm-showers",
                'thunderstorms': "storm-showers",
                'thundery': "storm-showers",
                'snow': "snow",
                'ice': 'sleet-storm',
                'blizzard': "snow",
                'fog': "fog",
                'mist': "fog",
                'dust': "fog",
                'smokey': "fog",
                'wind': "windy",
                'breezy': "windy",
                'windy': "windy",
                'sleet': "sleet",
                'pellets': "sleet",
                'hazy': 'haze'
            }
        }
    },

    computed: {
        newsWidget() {
            return (this.widgets || []).find(widget => widget.title == 'News')
        },

        ...mapGetters('settings', {
            weather: 'getWeather',
            news: 'getNews',
            getTravelText: 'getTravelText',
            widgets:    'getWidgets'
        })
    },

    methods: {
        getIcon(curWeather, time='day') {
            var splitWeatherDesc = curWeather.toLowerCase().split(" ")

            // We currently use only daytime icons, cold only has a neutral icon
            if (curWeather == "Cold")
                return 'wi wi-snowflake-cold'

            for (let keyword of splitWeatherDesc)
                if (this.weatherIconMap[keyword])
                    return `wi wi-${time}-${this.weatherIconMap[keyword]}`

            console.error('Failed to find icon for: ' + curWeather);
            return ''
        },
    },
}
</script>

<style>
    .clock {
        display: none !important;
    }
</style>
<style scoped>
    .IdleDisplay {
        position: fixed;
        top: 0;
        left: 0;

        height: 100vh;
        width: 100vw;

        background: rgba(200,200,200,0.4);
    }
    .container {
        height: 600px;
        width: 100vw;
    }

    .animated {
        -webkit-animation-duration: 3s;
        animation-duration: 3s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }

    @-webkit-keyframes fadeIn {
       0% {opacity: 0;}
       100% {opacity: 1;}
    }

    @keyframes fadeIn {
       0% {opacity: 0;}
       100% {opacity: 1;}
    }

    .fadeIn {
       -webkit-animation-name: fadeIn;
       animation-name: fadeIn;
    }

    .weather {
        /* margin-top: 100px; */
    }
    .weather i {
        font-size: 7rem;
    }

    .weather div {
        font-size: 4rem;
    }
    .weather span {
        font-size: 2rem;
        /* margin-top: 40px; */
    }

    .News {
        /* font-weight: 600; */
        font-size: 2rem;
        text-align: center;

        margin: 60px 0;
        display: inline-block;
    }
    a {
        color: black;
    }

    .travelText {
        font-size: 3rem;
    }
</style>
