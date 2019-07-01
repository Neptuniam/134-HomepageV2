<template>
    <div class="row center-xs middle-xs homepage transparent nomargin uk-animation-fade" id="background" :style="'background: rgba(240,240,240,'+transparency+');'">
        <a @click="setShowHome(!showHome)" class="uk-icon pageControl" :uk-icon="'icon: '+controlIcon+'; ratio: 2;'" />

        <DateTime />

        <div v-show="showHome == true">
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
        transparency: function() {
            return this.showHome ? 0.35 : 0.65
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
            });
        },

        getBackground() {
            // Hit the random background endpoint
            this.axios('/background/').then(background => {
                document.body.style.background = "url('images/"+background.data+"')"
                document.body.style.backgroundSize = "cover";
            })
        },

        ...mapActions('settings', {
            setLocation: 'setLocation',
            setShowHome: 'setShowHome',
            fetchUser: 'fetchUser',
            fetchUsers: 'fetchUsers',
        })
    },
    created: function() {
        this.fetchUser().then(() => {
            console.log(this.$store.getters['getUser']);
        })
        this.fetchUsers()

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
        overflow: hidden;
        color: black;
    }

    .transparent {
        /* background: rgba(240,240,240,0.75); */
        height: 100vh;
        width: 100vw;
    }

    .pageControl {
        position: absolute;
        top: 0px;
        left: 0px;

        width: 9vw;
        margin: 2vh;
    }

    .pageControl:hover {
        color: white;
    }

    .fullWidth {
        width: 100%;
    }
    .fullHeight {
        height: 100%;
    }

    .nopadding {
        padding: 0;
    }

    .nomargin {
        margin: 0;
    }

    .nospacing {
        margin: 0;
        padding: 0;
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

    .noselect {
      -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
         -khtml-user-select: none; /* Konqueror HTML */
           -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version,(Chrome and Opera) */
    }
</style>
