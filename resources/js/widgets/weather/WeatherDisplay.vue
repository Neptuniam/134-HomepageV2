<template>
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
        widget: function() {
            if (this.widgets)
                return this.widgets.find(widget => widget.title === 'Weather')
        },

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
        getWeather(location) {
            if (location === 'loc')
                location = this.location

            let query = "http://api.apixu.com/v1/forecast.json?key=2a5f91f5f5b34808bea182102193001&q="+location+"&days=7"
            this.axios.get(query).then(weather => {
                this.weather = weather.data
                this.curLoc = (this.weather.location.name +', ' +this.weather.location.region)

                console.log('%c Weather ', 'background: #222; color: #bada55');
                console.log(weather.data);
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

</style>
