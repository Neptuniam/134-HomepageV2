<template>
    <div class="homepage">
        <div class="transparent row">
            <div class="col-xs-6 ">
                <weather />
            </div>
            <div class="col-xs-6 ">
                <!-- <widgets /> -->
            </div>
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
            this.setLocation(coordinates)
            console.log('location');
            console.log(coordinates);
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

        color: black;
        /* opacity: 0.85; */
        /* filter: alpha(opacity=50); */
    }

    .seperator {
        border-left: 1px solid;
    }

    .seperator:nth-of-type(1) {
        border-left: 0px solid;
    }

    .fullWidth {
        width: 100%;
    }

    .nopadding {
        padding: 0;
    }

    .nomargin {
        margin: 0;
    }

    .textSpecial {
        font-family: 'Poiret One', cursive;
    }

    .textTitle {
        font-family: 'Arima Madurai', cursive;
    }

    .textBody {
        font-family: 'Roboto';
    }

    .transparent {
        background: rgba(240,240,240,0.3);
        height: 100vh;
        width: 100vw;
    }
</style>
