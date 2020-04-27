<template>
<div v-if="weather" class="row fullWidth Weather">
    <div v-if="weather && weather.current" class="row curDescription textSpecial fullWidth nopadding"
        :uk-tooltip="address && address.formatted_address ? address.formatted_address : 'Could not find Address'">
        <div class="col-xs center-xs">
            <i :class="getIcon(weather.current.IconPhrase)" />
        </div>
        <div class="col-xs-7 center-xs">
            {{weather.location.LocalizedName}}
        </div>
        <div class="col-xs center-xs">
            {{Math.round(weather.current.value)}}&deg; C
        </div>
    </div>

    <div class="row center-xs middle-xs textBody fullWidth forecast">
        <div v-for="day in weather.forecast" class="col-xs day card uk-box-shadow-hover-xlarge">
            <div class="row middle-xs">
                <div class="col-xs-8">
                    <i :class="getIcon(day.Day.IconPhrase)" />
                </div>

                <div class="col-xs forecastTemp nospacing">
                    {{day.Temperature.Maximum.Value >= 0 ? '&nbsp;' : ''}}{{Math.round(day.Temperature.Maximum.Value)}}&deg;
                    <br>
                    {{day.Temperature.Minimum.Value >= 0 ? '&nbsp;' : ''}}{{Math.round(day.Temperature.Minimum.Value)}}&deg;
                </div>
            </div>

            <div class="forecastDesc bottom-xs uk-text-truncate">
                {{day.Day.IconPhrase}}
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
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
            days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            weather: null,
            curLoc: null,
            weatherIconMap: {
                'sunny': "sunny",
                'hot': "hot",
                'cold': "snowflake-cold",
                'clear': "stars",
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
        ...mapGetters('settings', {
            location:  'getLocation',
            address:   'getAddress',
        }),
    },
    methods: {
        // parseAddress() {
        //     if (this.address && this.address.formatted_address) {
        //         let split = this.address.formatted_address.split(',')
        //
        //         if (split.length >= 2)
        //             return split[1]
        //     }
        //
        //     return ""
        // },

        getDay(day) {
            let date = new Date(day.EpochDate*1000)
            return `${this.days[date.getDay()]}, ${this.months[date.getMonth()]} ${date.getDate()}`
        },

        getIcon(curWeather) {
            var splitWeatherDesc = curWeather.toLowerCase().split(" ")

            // We currently use only daytime icons, cold only has a neutral icon
            if (curWeather == "Cold")
                return 'wi wi-snowflake-cold'

            for (let keyword of splitWeatherDesc)
                if (this.weatherIconMap[keyword])
                    return `wi wi-day-${this.weatherIconMap[keyword]}`
            return ''
        },

        async requestWeather(location) {
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
            this.$set(this.weather, 'requestLoc', location)
            this.$set(this.weather, 'expires', locResponse.headers.expires)


            console.log('%c Retrieved Weather ', 'background: #222; color: #bada55');
            console.log(this.weather);
            localStorage.setItem('LastWeatherDetails', JSON.stringify(this.weather))

            // this.curLoc = this.parseAddress()
        },

        distanceBetween(cachedLoc, curLoc) {
            // Locations are stored as a single string ("lat,lng")
            let splitCache = cachedLoc.split(",")
            let splitCur = curLoc.split(",")

            if (splitCache && splitCur) {
                let cachedLoc = {
                    lat: Number(splitCache[0]),
                    lng: Number(splitCache[1])
                }
                let curLoc = {
                    lat: Number(splitCur[0]),
                    lng: Number(splitCur[1])
                }

                return  Math.sqrt(
                            (cachedLoc.lat - curLoc.lat)*(cachedLoc.lat - curLoc.lat) +
                            (cachedLoc.lng - curLoc.lng)*(cachedLoc.lng - curLoc.lng)
                        )
            }

            return 1
        },

        checkExpirey(weather) {
            return new Date(weather.expires) > new Date()
        },

        getWeather(location) {
            // Check the localstorage for previous data first
            let weather = JSON.parse(localStorage.getItem('LastWeatherDetails'))

            // If there is previous data, check that the users location hasn't changed or the data hasn't expired
            if (weather) {
                if (this.distanceBetween(weather.requestLoc, location) < 0.05 && this.checkExpirey(weather)) {
                    this.weather = weather

                    console.log('%c Cached Weather ', 'background: #222; color: #bada55');
                    console.log(this.weather);
                    return
                }
            }

            // Otherwise, fallback on hitting api
            this.requestWeather(location)
        }
    },
    mounted() {
        this.getWeather(this.location)


        // console.log('Sunny', '=>', this.getIcon('Sunny'));
        // console.log('Mostly Sunny', '=>', this.getIcon('Mostly Sunny'))
        // console.log('Partly Sunny', '=>', this.getIcon('Partly Sunny'))
        // console.log('Intermittent Clouds', '=>', this.getIcon('Intermittent Clouds'))
        // console.log('Hazy Sunshine', '=>', this.getIcon('Hazy Sunshine'))
        // console.log('Mostly Cloudy', '=>', this.getIcon('Mostly Cloudy'))
        // console.log('Cloudy', '=>', this.getIcon('Cloudy'))
        // console.log('Dreary (Overcast)', '=>', this.getIcon('Dreary (Overcast)'))
        // console.log('Fog', '=>', this.getIcon('Fog'))
        // console.log('Showers', '=>', this.getIcon('Showers'))
        // console.log('Mostly Cloudy w/ Showers', '=>', this.getIcon('Mostly Cloudy w/ Showers'))
        // console.log('Partly Sunny w/ Showers', '=>', this.getIcon('Partly Sunny w/ Showers'))
        // console.log('T-Storms', '=>', this.getIcon('T-Storms'))
        // console.log('Mostly Cloudy w/ T-Storms', '=>', this.getIcon('Mostly Cloudy w/ T-Storms'))
        // console.log('Partly Sunny w/ T-Storms', '=>', this.getIcon('Partly Sunny w/ T-Storms'))
        // console.log('Rain', '=>', this.getIcon('Rain'))
        // console.log('Flurries', '=>', this.getIcon('Flurries'))
        // console.log('Mostly Cloudy w/ Flurries', '=>', this.getIcon('Mostly Cloudy w/ Flurries'))
        // console.log('Partly Sunny w/ Flurries', '=>', this.getIcon('Partly Sunny w/ Flurries'))
        // console.log('Snow', '=>', this.getIcon('Snow'))
        // console.log('Mostly Cloudy w/ Snow', '=>', this.getIcon('Mostly Cloudy w/ Snow'))
        // console.log('Ice', '=>', this.getIcon('Ice'))
        // console.log('Sleet', '=>', this.getIcon('Sleet'))
        // console.log('Freezing Rain', '=>', this.getIcon('Freezing Rain'))
        // console.log('Rain and Snow', '=>', this.getIcon('Rain and Snow'))
        // console.log('Hot', '=>', this.getIcon('Hot'))
        // console.log('Cold', '=>', this.getIcon('Cold'))
        // console.log('Windy', '=>', this.getIcon('Windy'))
        // console.log('Clear', '=>', this.getIcon('Clear'))
        // console.log('Mostly Clear', '=>', this.getIcon('Mostly Clear'))
        // console.log('Partly Cloudy', '=>', this.getIcon('Partly Cloudy'))
        // console.log('Intermittent Clouds', '=>', this.getIcon('Intermittent Clouds'))
        // console.log('Hazy Moonlight', '=>', this.getIcon('Hazy Moonlight'))
        // console.log('Mostly Cloudy', '=>', this.getIcon('Mostly Cloudy'))
        // console.log('Partly Cloudy w/ Showers', '=>', this.getIcon('Partly Cloudy w/ Showers'))
        // console.log('Mostly Cloudy w/ Showers', '=>', this.getIcon('Mostly Cloudy w/ Showers'))
        // console.log('Partly Cloudy w/ T-Storms', '=>', this.getIcon('Partly Cloudy w/ T-Storms'))
        // console.log('Mostly Cloudy w/ T-Storms', '=>', this.getIcon('Mostly Cloudy w/ T-Storms'))
        // console.log('Mostly Cloudy w/ Flurries', '=>', this.getIcon('Mostly Cloudy w/ Flurries'))
        // console.log('Mostly Cloudy w/ Snow', '=>', this.getIcon('Mostly Cloudy w/ Snow'))


        if (this.widget && this.widget.interval)
            setInterval(this.getWeather(this.location), this.widget.interval * 60000)
    },
}
</script>

<style scoped>
    .Weather {
        height: 100% !important;
        width: 100% !important;

        margin: 0 0 5vh 0;
    }

    .forecast {
        height: 28vh;
    }

    .day {
        height: 60% !important;
        transition: all .1s ease-in-out;
    }
    .day:hover {
        background: rgba(230, 230, 250, 0.95);

        height: 100% !important;
        min-width: 35% !important;
        transform: scale(1);
    }

    .day i {
        margin-top: 2vh !important;
        font-size: 5vh;
    }
    .day:hover i {
        margin-top: 1vh !important;
        font-size: 10vh;
    }

    .forecastTemp {
        font-size: 3vh;
        text-align: left;
    }
    .day:hover .forecastTemp {
        font-size: 5vh;
        /* text-align: right; */
    }

    .forecastDesc {
        margin-top: 1vh;
    }
    .forecastDay, .forecastDesc {
        font-size: 2vh;
    }
    .day:hover .forecastDay, .day:hover .forecastDesc {
        font-size: 4vh;
    }


    .day hr {
        /* margin: 10px 0px 5px 0px; */
        margin: 0px;
        border-color: grey;
    }

    .curDescription, .curDescription input {
        font-size: 4vw;
    }
</style>
