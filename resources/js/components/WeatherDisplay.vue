<template>
    <div class="">
        <h1>Weather display</h1>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    created: function() {
        // axios.get({
        //     url: 'https://api.apixu.com/v1/forecast.json',
        //     method: 'GET',
        //     data: {
        //         "key": "2a5f91f5f5b34808bea182102193001",
        //         "q": this.location,
        //         "days": 7
        //     },
        //     success: function(response) {
        //         console.log("Weather Response:");
        //         console.log(response);
        //     },
        //     error: function(response) {
        //         console.log("Failed");
        //         console.log(response);
        //     }
        // });
    },
    computed: {
        ...mapGetters({
            location: 'settings/getLocation'
        })
    },
}
</script>

<style scoped>
</style>
