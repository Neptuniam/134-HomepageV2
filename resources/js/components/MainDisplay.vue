<template>
    <div class="homepage row middle-xs">
        <div class="col-xs-6">
            <weather />
        </div>
        <div class="col-xs-6">
            <widgets />
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data: function() {
        return {
            locationOptions: {
                enableHighAccuracy: true,
                timeout: 5000,
            },
        }
    },
    methods: {
        ...mapActions({
            setLocation: 'settings/setLocation'
        })
    },
    created: function() {
        // Retrieve the users location on created
        this.$getLocation(this.locationOptions).then(coordinates => {
            console.log(coordinates);
            this.setLocation(coordinates)
        });
    },
}
</script>

<style>
    .homepage {
        height: 100vh;
        width: 100vw;
        overflow: hidden;

        background: url('../../images/backgrounds/SOSA21I.jpg');
        background-repeat:no-repeat;
        background-size:cover;
        /* opacity: 0.85; */
        /* filter: alpha(opacity=50); */
    }

    .nopadding {
        padding: 0;
    }

    .nomargin {
        margin: 0;
    }
</style>
