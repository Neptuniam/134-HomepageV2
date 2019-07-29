<template>
    <!--Favourite tabs Row-->
    <div class="row center-xs">
        <div class="col-xs-9">
            <div class="row center-xs middle-xs favouritesBar">
                <div v-for="favourite in favsOrder" class="col-xs">
                    <a :href="favourite.url" :uk-tooltip="favourite.title">
                        <img :src="getImg(favourite)" class="favButtons">
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        favsOrder: function() {
            if (this.favourites)
                return this.favourites.sort(this.byPos)
        },

        ...mapGetters('settings', {
            favourites: 'getFavourites',
        })
    },
    methods: {
        getImg(favourite) {
            // if the user set an img to use, return that. Otherwise use the sites favicon
            return favourite.src ?  'images/favouritesIcons/'+favourite.src : favourite.url+'favicon.ico'
        },

        byPos(a,b) {
            if (a.pos < b.pos)
                return -1
            else if (a.pos > b.pos)
                return 1
            return 0
        }
    },
}
</script>

<style scoped>
    .favouritesBar {
        /* height: 100vh; */
        /* text-align: right; */

        /* margin: 75px 0; */
        /* margin-top: 15vh; */

        /* margin-top: 100px; */
        /* width: 500px; */
    }

    .favButtons {
        width: 80%;
        height: 80%;
        margin: 3vh 0;
    }
</style>
