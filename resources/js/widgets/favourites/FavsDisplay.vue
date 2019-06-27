<template>
    <!--Favourite tabs Row-->
    <div class="row center-xs">
        <div class="col-xs-9">
            <div class="row center-xs middle-xs favouritesBar">
                <div v-for="favourite in favsOrder" class="col-xs">
                    <a :href="favourite.url" :uk-tooltip="favourite.title">
                        <img :src="'images/favouritesIcons/'+favourite.src" class="favButtons">
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'Vuex'
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
