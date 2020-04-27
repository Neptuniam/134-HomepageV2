<template>
    <div class="row center-xs">
        <div class="row bottom-xs favouritesBar">
            <a v-for="favourite in favsOrder" class="col-xs" :href="favourite.url">
                <img :uk-tooltip="favourite.title" :src="getImg(favourite)" class="favButtons">
            </a>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    computed: {
        favsOrder() {
            let byPos = (a, b) => {
                if (a.pos < b.pos)
                    return -1
                if (a.pos > b.pos)
                    return 1
                return 0
            }

            if (this.favourites)
                return this.favourites.sort(byPos)
        },

        ...mapGetters('settings', {
            favourites: 'getFavourites',
        })
    },

    methods: {
        getImg(favourite) {
            // if the user set an img to use, return that. Otherwise use the sites favicon
            return favourite && favourite.src ? 'images/favouritesIcons/'+favourite.src : favourite.url+'favicon.ico'
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
        position: fixed;
        bottom: 5px;
    }

    .favButtons{
        height: 7.5vh;
        width: 7.5vh;

        transition: all .12s ease-in-out;
    }

    .favouritesBar:hover .favButtons {
        height: 13vh;
        width: 13vh;
    }

    .col-xs:hover .favButtons{
        margin-bottom: 3vh;
    }
</style>
