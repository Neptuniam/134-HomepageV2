<template>
<div class="row center-xs middle-xs Homepage nomargin uk-animation-fade" :style="`background: rgba(200,200,200,${transparency});`">
    <div v-if="$route.name == 'Home'" class="row start-xs middle-xs pageControl">
        <router-link to="/settings" class="col-xs-3">
            <span class="uk-icon" uk-icon="icon: cog; ratio:2;" uk-tooltip="Settings" />
        </router-link>

        <router-link v-if="isActive(newsStatus)" to="/news" class="col-xs-3">
            <span class="uk-icon" uk-icon="icon: world; ratio: 2" uk-tooltip="News"/>
        </router-link>

        <router-link v-if="isActive(trelloStatus)" to="/trello" class="col-xs-3" style="position: relative;">
            <span class="uk-icon" uk-icon="icon: gitter; ratio: 2;" uk-tooltip="View Trello Cards" />

            <span class="TrelloDueToday">
                {{TrelloDueToday}}
            </span>
        </router-link>

        <router-link v-if="isActive(notesStatus)" to="/notes" class="col-xs-3">
            <span class="uk-icon" uk-icon="icon: pencil; ratio: 2;" uk-tooltip="Personal Notes" />
        </router-link>
    </div>
    <div v-else class="row start-xs middle-xs pageControl">
        <router-link to="/" class="col-xs-3">
            <a class="uk-icon" uk-icon="icon: home; ratio:2;" uk-tooltip="Back Home" />
        </router-link>
    </div>

    <DateTime />

    <TrelloDisplay v-if="trelloStatus && trelloStatus.status === 1" v-model="TrelloDueToday" />

    <router-view v-if="activeUser && location" />

    <!-- <div v-if="activeUser && location" v-show="activePage === 'Home'">
        <Home />
    </div>

    <component v-if="activePage && activePage != 'Home'" :is="activePage" /> -->
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            TrelloDueToday: null
        }
    },

    computed: {
        controlIcon() {
            return this.activePage === 'Home' ? 'cog' : 'home'
        },
        transparency() {
            return this.activePage === 'Home' ? 0.75 : 0.85
        },

        newsStatus() {
            if (this.widgets)
                return this.widgets.find(widget => widget.title === 'News')
            return {}
        },
        notesStatus() {
            if (this.widgets)
                return this.widgets.find(widget => widget.title === 'Notes')
            return {}
        },
        trelloStatus() {
            if (this.widgets)
                return this.widgets.find(widget => widget.title === 'Trello')
            return {}
        },
        backgroundStatus() {
            if (this.widgets)
                return this.widgets.find(widget => widget.title === 'Background')
            return {}
        },

        ...mapGetters('settings', {
            activePage: 'getActivePage',
            activeUser: 'getUser',
            widgets:    'getWidgets',
            location:   'getLocation'
        })
    },
    methods: {
        isActive(widget) {
            return widget && widget.status === 1
        },

        async fetchLocation() {
            // Retrieve the users location on created
            let response = await this.axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.MIX_GOOGLE_KEY}`)
            let geolocation = await this.axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${response.data.location.lat},${response.data.location.lng}&key=${process.env.MIX_GOOGLE_KEY}`)

            this.$set(response.data.location, 'geocode', geolocation.data.results)
            this.$set(response.data, 'fetched', new Date())

            console.log('%c Fetched geoLocation', 'background: #222; color: #bada55');
            console.log(geolocation.data);

            this.setLocation(response.data.location)
            localStorage.setItem('LastLocation', JSON.stringify(response.data))
        },
        checkTimeSince(cachedTime) {
            // Check that the cached data isn't "too old"
            return ((new Date().getTime() - new Date(cachedTime).getTime()) / 300000) < 1
        },
        getLocation() {
            let CachedLoc = JSON.parse(localStorage.getItem('LastLocation'))

            if (CachedLoc && 'fetched' in CachedLoc && this.checkTimeSince(CachedLoc.fetched)) {
                console.log('%c Cached geoLocation', 'background: #222; color: #bada55');
                console.log(CachedLoc);

                this.setLocation(CachedLoc.location)
            } else {
                this.fetchLocation()
            }
        },

        getBackground() {
            // Hit the random background endpoint
            this.axios.get('/background/').then(background => {
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
            fetchWidgets: 'fetchWidgets',
        })
    },
    created() {
        this.fetchUser().then(() => {
            this.fetchWidgets().then(() => {
                if (this.backgroundStatus && this.backgroundStatus.interval)
                    setInterval(this.getBackground, this.backgroundStatus.interval * 60000)
            })
        })

        this.fetchUsers()
        this.getLocation()
        this.getBackground()

        // this.axios.get(`https://api.trello.com/1/boards/5e0b302d93a3935125fd3503/cards?key=${process.env.MIX_TRELLO_KEY}&token=${process.env.MIX_TRELLO_SECRET}`).then(trello => {
        //     console.log('trello', trello);
        // })
    },
}
</script>

<style>
    .Homepage {
        overflow-y:hidden;
        overflow-x:hidden;
        overflow: hidden !important;

        color: black;

        height: 100vh;
        width: 100vw;
    }

    .pageControl {
        position: fixed;
        top: 10px;
        left: 10px;
        width: 220px;
    }

    .pageControl .uk-icon {
        color: black;
    }
    .pageControl .uk-icon:hover {
        color: white;
    }

    .TrelloDueToday {
        position: absolute;
        top: -15px;
        right: -5px;
        z-index: 0;
        /* color: blue; */
        font-weight: 700;
        font-size: 20px;
    }

    .uk-tooltip {
        font-family: 'Roboto' !important;
        font-weight: 300px;
        font-size: 16px;

        max-width: 400px;
    }

    div {
        cursor: default;
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

    .clickable {
        cursor: pointer !important;
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

    .card {
        border: 1.5px solid grey;
        border-radius: 5px;
        background: rgba(230, 230, 250, 0.5);

        margin: 10px;
        padding: 5px 10px;
    }

    .uk-button-success {
        background-color: #228B22;
        color: white;
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
