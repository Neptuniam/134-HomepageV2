<template>
    <div class="row center-xs middle-xs homepage transparent nomargin" id="background">
        <a @click="setShowHome(!showHome)" class="uk-icon pageControl" :uk-icon="'icon: '+ controlIcon +'; ratio: 2;'" />

        <DateTime />

        <div v-if="showHome == true">
            <Home />
        </div>
        <div v-if="showHome == false">
            <Settings />
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
    computed: {
        controlIcon: function() {
            return this.showHome ? 'cog' : 'home'
        },

        ...mapGetters('settings', {
            showHome: 'getShowHome',
        })
    },
    methods: {
        getLocation() {
            // Retrieve the users location on created
            this.$getLocation(this.locationOptions).then(coordinates => {
                this.setLocation(coordinates)
                console.log('%c Location ', 'background: #222; color: #bada55');
                console.log(coordinates);
            });
        },

        getBackground() {
            // Hit the random background endpoint
            this.axios('/background/').then(background => {
                console.log('%c Background ', 'background: #222; color: #bada55');
                console.log(background.data);

                document.body.style.background = "url('images/"+background.data+"')"
                document.body.style.backgroundSize = "cover";
            })
        },

        ...mapActions('settings', {
            setLocation: 'setLocation',
            setShowHome: 'setShowHome',
            fetchWidgets: 'fetchWidgets',
            fetchLocations: 'fetchLocations',
            fetchFavourites: 'fetchFavourites',
        })
    },
    created: function() {
        // Fetch User Settings
        this.fetchWidgets()

        // Fetch Users Locations
        this.fetchLocations()

        // Fetch Users Favourites
        this.fetchFavourites()

        // Update the users location every 10 minutes
        // setInterval(this.getLocation, 10000)
        this.getLocation()

        // Update the background every 1 minute
        // setInterval(this.getBackground, 60000)
        this.getBackground()
    },
}
</script>

<style>
    .homepage {
        /* height: 100vh;
        width: 100vw; */
            overflow: hidden;
        color: black;
    }

    .transparent {
        background: rgba(240,240,240,0.35);
        height: 100vh;
        width: 100vw;
    }

    .pageControl {
        position: absolute;
        top: 0px;
        left: 0px;

        width: 9vw;
    }

    .uk-icon {
        margin: 2vh;
    }
    a:hover {
        color: white;
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
        font-family: 'Arima Madurai', cursive;
    }

    .textTitle {
        font-family: 'Poiret One', cursive;
    }

    .textBody {
        font-family: 'Roboto';
    }
</style>
