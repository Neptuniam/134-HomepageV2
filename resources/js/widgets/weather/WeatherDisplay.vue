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
        <div v-for="day in weather.forecast" class="col-xs day card uk-box-shadow-hover-xlarge clickable" @click="showMore(day)">
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
            // weather: null,
            curLoc: null,
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
        weather: {
            set(val) {
                this.setWeather(val)
            },
            get() {
                return this.getWeather
            }
        },

        ...mapGetters('settings', {
            location:  'getLocation',
            address:   'getAddress',
            getWeather:'getWeather',
        }),
    },
    methods: {
        showMore(day) {
            console.log(day);
            const parseTime = (time, title) => {
                let keys = ''
                for (const key in time)
                    keys += `<li> ${key}: ${time[key]}`

                let local = `
                    <div class="col-xs-5 extraDetails card start-xs">
                        <h2>${title} Time</h2>

                        <div class="row middle-xs">
                            <div class="col-xs-3 center-xs">
                                <i class="${this.getIcon(time.IconPhrase, title == 'Night' ? 'night' : 'day')}"></i>
                            </div>

                            <div class="col-xs forecastTemp nospacing">
                                <ul> ${keys} </ul>
                            </div>
                        </div>
                    </div>`

                return local
            }

            let str = `
            <div class="card center-xs">
                <h1>${this.getDay(day)}</h1>

                <h3 style="margin-bottom: 100px;">
                    Maximum: ${day.Temperature.Maximum.Value >= 0 ? '&nbsp;' : ''}${Math.round(day.Temperature.Maximum.Value)}&deg;
                    <br>
                    Minimum: ${day.Temperature.Minimum.Value >= 0 ? '&nbsp;' : ''}${Math.round(day.Temperature.Minimum.Value)}&deg;
                </h3>

                <div class="row around-xs" style="width: 90vw;">
                    ${parseTime(day.Day, 'Day')}
                    ${parseTime(day.Night, 'Night')}
                <div>

                <h3>
                    <a href="${day.Link}" target="_blank">Desktop Link</a> - <a href="${day.MobileLink}" target="_blank">Mobile Link</a>
                </h3>
            </div>
            `

            this.$bus.$emit('showPreview', str)
        },

        getDay(day) {
            let date = new Date(day.EpochDate*1000)
            return `${this.days[date.getDay()]}, ${this.months[date.getMonth()]} ${date.getDate()}`
        },

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

        async requestWeather(location) {
            const getExipery = (expires) => {
                var dt = new Date();
                dt.setHours( dt.getHours() + 2 );

                // Dont let the weather info be older than two hours
                return new Date(expires) < dt ? expires : dt.toString()
            }

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
            this.$set(this.weather, 'expires', getExipery(locResponse.headers.expires))


            util.trackResult('weather', 1, this.weather)
            localStorage.setItem('LastWeatherDetails', JSON.stringify(this.weather))
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

        findWeather(location) {
            // Check the localstorage for previous data first
            let weather = JSON.parse(localStorage.getItem('LastWeatherDetails'))

            // If there is previous data, check that the users location hasn't changed or the data hasn't expired
            if (weather) {
                if (this.distanceBetween(weather.requestLoc, location) < 0.05 && this.checkExpirey(weather)) {
                    this.weather = weather

                    util.trackResult('weather', 0, weather)
                    return
                }
            }

            // Otherwise, fallback on hitting api
            this.requestWeather(location)
        },

        ...mapActions('settings', {
            setWeather: 'setWeather',
        })
    },
    mounted() {
        this.findWeather(this.location)

        if (this.widget && this.widget.interval)
            setInterval(this.findWeather(this.location), this.widget.interval * 60000)
    },
}
</script>

<style>
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

        color: black !important;
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

    .extraDetails {
        color: black;
    }
    .extraDetails i {
        font-size: 7vh;
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
