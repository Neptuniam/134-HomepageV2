<template>
    <div class="row">
        <div v-if="response" class="weatherDisplay col-xs" style="margin-left: 5%; width: 100%;">
            <div class="row">
                <span class="location">{{response.location.name}}, {{response.location.region}}</span>
            </div>

            <div class="row middle-xs">
                <div class="col-xs-2">
                    <img :src="response.current.condition.icon" alt="Condition Icon" class="curIcon">
                </div>
                <div class="col-xs curTemp">
                    <span>{{response.current.feelslike_c}}&deg;C</span>
                </div>
            </div>

            <div class="row">
                <span class="curText">{{response.current.condition.text}}</span>
            </div>

            <div class="row">
                <div v-for="day in response.forecast.forecastday" class="col-xs">
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

                    <span class="forecastText">{{day.day.condition.text}}</span>
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
            response: null
        }
    },
    computed: {
        ...mapGetters('settings', {
            location: 'getLocation',
        }),
        query: function() {
            return "http://api.apixu.com/v1/forecast.json?key=2a5f91f5f5b34808bea182102193001&q="+this.location+"&days=7"
        },
    },
    watch: {
        query: function() {
            console.log("querying");
            this.axios.get(this.query).then(response => {
                console.log(response);
                this.response = response.data
            })
        }
    },
}
</script>

<style scoped>
    .weatherdisplay {
        margin-left: 5%;
        padding-left: 5%;
        width: 100%;
    }

    .location {
        font-size: 9vh;
        color: white;
    }

    .curText {
        font-size: 5vh;
        margin-bottom: 18vh;
        color: white;
    }

    .curIcon {
        width: 15vh;
        height: 15vh;
    }
    .curTemp{
        font-size: 5vh;
        color: white;
    }

    .forecastIcon {
        width: 7.5vh;
        height: 7.5vh;
    }
    .forecastTemp {
        font-size: 2.5vh;
        color: white;
    }
    .forecastText {
        /* font-size: 1vh; */
        color: white;
    }
</style>
