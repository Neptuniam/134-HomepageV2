<template>
<!--Favourite tabs Row-->
<div class="row center-xs fullWidth">
    <div class="col-xs-10">
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
import { mapActions, mapGetters } from 'vuex';
export default {
    computed: {
        favsOrder() {
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

        byPos(a, b) {
            if (a.pos < b.pos)
                return -1
            if (a.pos > b.pos)
                return 1
            return 0
        },

        ...mapActions('settings', {
            fetchFavourites: 'fetchFavourites',
        })
    },

    created() {
        this.fetchFavourites()
    },
}
</script>

<style scoped>
    .favouritesBar {
        height: 15vh !important;
    }

    .favButtons {
        height: 75%;
        width: 75%;
    }
    .favButtons:hover {
        height: 100%;
        width: 100%;
    }
</style>
