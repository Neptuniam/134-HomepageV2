<template>
<div class="row center-xs middle-xs Homepage nomargin uk-animation-fade">
    <Idle v-if="showIdle" />

    <template v-else>
        <router-view />

        <ControlBar />

        <DateTime />

        <FilePreviewer />
    </template>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            toPreview: null,
            showIdle: false
        }
    },
    computed: {
        ...mapGetters('settings', {
            widgets:    'getWidgets',
            activeUser: 'getUser',
            location:   'getLocation'
        })
    },
    methods: {
        async fetchLocation() {
            // Retrieve the users location on created
            let response = await this.axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.MIX_GOOGLE_KEY}`)
            let geolocation = await this.axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${response.data.location.lat},${response.data.location.lng}&key=${process.env.MIX_GOOGLE_KEY}`)

            this.$set(response.data.location, 'geocode', geolocation.data.results)
            this.$set(response.data, 'fetched', new Date())

            util.trackResult('geolocation', 1, geolocation.data)

            this.setLocation(response.data.location)
            localStorage.setItem('LastLocation', JSON.stringify(response.data))
        },
        getLocation() {
            let CachedLoc = JSON.parse(localStorage.getItem('LastLocation'))

            // Check that the cached data isn't "too old"
            let checkTimeSince = (cachedTime) => ((new Date().getTime() - new Date(cachedTime).getTime()) / 300000) < 1

            if (CachedLoc && 'fetched' in CachedLoc && checkTimeSince(CachedLoc.fetched)) {
                util.trackResult('geolocation', 0, CachedLoc)

                this.setLocation(CachedLoc.location)
            } else {
                this.fetchLocation()
            }
        },

        getBackground() {
            // Hit the random background endpoint
            this.axios.get('/background/').then(background => {
                util.trackResult('background', 2, background.data)

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
            // Fetch the users widget data
            this.fetchWidgets().then(() => {
                // Background doesn't have it's own component (cause that's unnecessary) so we just manage it's update interval here
                let backgroundStatus = this.widgets.find(widget => widget.title === 'Background')
                if (backgroundStatus && backgroundStatus.interval)
                    setInterval(this.getBackground, backgroundStatus.interval * 60000)
            })
        }).catch(error => {
            // If noone is logged in, send the user to the settings screen to login
            if (error == 'user_not_found')
                this.$router.replace({ name: 'Settings' })
        })

        this.fetchUsers()
        this.getLocation()
        this.getBackground()
    },

    mounted() {
        var timer = setTimeout(() => {
            this.showIdle = true
        }, 30000)

        document.addEventListener('mousemove', () => {
            clearTimeout(timer);
            this.showIdle = false

            timer = setTimeout(() => {
                this.showIdle = true
            }, 30000)
        })
    },
}
</script>

<style>
    .Homepage {
        overflow-y:hidden;
        overflow-x:hidden;
        overflow: hidden !important;

        color: black;
        /* color: #001a33 !important; */

        height: 100vh;
        width: 100vw;

        background: rgba(200,200,200,0.7);
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

    .limitReadable {
    	max-width: 1000px;
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
    .card:hover {
        background: rgba(230, 230, 250, 0.75);
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

    .invertedText {
    	color: silver !important;
    }

    .blueText {
    	color: blue !important;
    }

    .swal2-content {
        /* font-size: 30px !important; */
    }

    .color-overlay {
        position: relative;
    }
    .color-overlay:before {
        content: "";
        position: absolute;
        left: 0; right: 0;
        top: 0; bottom: 0;
        height: 100%;
    }
</style>
