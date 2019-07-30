<template>
<div v-if="activeUser && location" class="row center-xs middle-xs homepage nomargin uk-animation-fade" :style="'background: rgba(200,200,200,'+transparency+');'">
    <div class="row middle-xs pageControl">
        <div class="col-xs">
            <a @click="setActivePage(activePage === 'home' ? 'settings' : 'home')" class="uk-icon "
              :uk-icon="'icon: '+controlIcon+'; ratio: 2;'" uk-tooltip='Settings'/>
        </div>

        <div class="col-xs">
            <a v-if="newsStatus.status === 1  && activePage === 'home'" @click="setActivePage('news')" class="uk-icon newsIcon"
               uk-icon="icon: world; ratio: 2" uk-tooltip="News"/>
        </div>

        <div class="col-xs">
            <a v-if="notesStatus.status === 1 && activePage === 'home'" @click="setActivePage('notes')" class="uk-icon notesIcon"
               uk-icon="icon: pencil; ratio: 2;" uk-tooltip="Personal Notes" />
        </div>
    </div>

    <DateTime />

    <Home />

    <div v-if="activePage === 'settings'">
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
            return this.activePage === 'home' ? 'cog' : 'home'
        },
        transparency: function() {
            return this.activePage === 'home' ? 0.4 : 0.7
        },

        newsStatus: function() {
            if (this.widgets)
                return this.widgets.find(widget => widget.title === 'News')
            return {}
        },
        notesStatus: function() {
            if (this.widgets)
                return this.widgets.find(widget => widget.title === 'Notes')
            return {}
        },

        ...mapGetters('settings', {
            activePage: 'getActivePage',
            activeUser: 'getUser',
            widgets: 'getWidgets',
            location: 'getLocation'
        })
    },
    methods: {
        getLocation() {
            // Retrieve the users location on created
            this.axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAnTaE5aRbrHcbnzpKErFm7l2lrlUAzRHM').then(response => {
                this.setLocation(response.data.location)
            })
        },

        getBackground() {
            // Hit the random background endpoint
            this.axios('/background/').then(background => {
                console.log('%c Background', 'background: #222; color: #bada55');
                console.log(background.data);

                document.body.style.background = "url('images/"+background.data+"')"
                document.body.style.backgroundSize = "cover";
            })
        },

        ...mapActions('settings', {
            setShowHome: 'setShowHome',
            setActivePage: 'setActivePage',
            setLocation: 'setLocation',
            fetchUser: 'fetchUser',
            fetchUsers: 'fetchUsers',
        })
    },
    created: function() {
        this.fetchUser()
        this.fetchUsers()

        // Update the users location every 10 minutes
        // setInterval(this.getLocation, 600000)
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
        height: 100vh;
        width: 100vw;
    }

    .pageControl {
        position: absolute;
        top: 10px;
        left: 10px;
        width: 175px;
    }

    .pageControl .uk-icon:hover {
        color: white;
    }

    .uk-tooltip {
        font-family: 'Roboto' !important;
        font-weight: 300px;
        font-size: 16px;

        max-width: 300px;
    }

    .fullWidth {
        width: 100% !important;
    }
    .fullHeight {
        height: 100% !important;
    }

    .nopadding {
        padding: 0 !important;
    }

    .nomargin {
        margin: 0 !important;
    }

    .nospacing {
        margin: 0 !important;
        padding: 0 !important;
    }

    .textSpecial {
        font-family: 'Arima Madurai', cursive !important;
    }

    .textTitle {
        font-family: 'Poiret One', cursive !important;
    }

    .textBody {
        font-family: 'Roboto' !important;
    }

    .roundedButton {
        color: white;
        border-radius: 10px;
        padding: auto 10px;
        margin: 0 5px;
        outline: none;
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


<!-- Pulling the Homepage:
    git clone https://github.com/Neptuniam/134-HomepageV2
    npm install
    composer update/install
    cp .env.example .env
    php artisan key:generate
    Configure Database settings in .env


 -->
