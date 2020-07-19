<template>
<table class="FavsSettings uk-table uk-table-striped">
    <div class="row start-xs middle-xs textBody HeaderRow">
        <div class="col-xs-1">
            Sort
        </div>

        <div class="col-xs-2 uk-text-capitalize">
            title
        </div>
        <div class="col-xs uk-text-capitalize nopadding">
            url
        </div>
        <div class="col-xs uk-text-capitalize nopadding">
            src
        </div>

        <div class="col-xs-2 center-xs nopadding">
        </div>
    </div>

    <tbody>
        <span uk-sortable="handle: .uk-sortable-handle">
            <FavsRow v-for="fav in favourites" :key="fav.id" :id="fav.id" :favourite="fav" />
        </span>

        <FavsRow :favourite="blankObject" />
    </tbody>
</table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            blankObject: {id: null, user_id: null, title: '', url: '', src: ''},
            updatedOrder: null
        }
    },
    computed: {
        ...mapGetters('settings', {
            favourites: 'getFavourites',
            activeUser: 'getUser',
        })
    },
    methods: {
        ...mapActions('settings', {
            fetchFavourites: 'fetchFavourites'
        })
    },

    mounted() {
        this.fetchFavourites()

        let _this = this
        // Listen for an update on the uk-sortable
        document.addEventListener('moved', function(e) {
            // Mixing uikit sortable with updating indices was awful so we update them on the backend
            _this.updatedOrder = []

            for (let i = 0; i < e.target.children.length; i++) {
                let child = e.target.children[i]
                let fav = _this.favourites.find(fav => fav.id == child.id)

                if (fav) {
                    _this.updatedOrder.push(fav)
                }
            }
        });
    },

    async destroyed() {
        if (this.updatedOrder) {
            await this.axios.put('/favourites/updatePositions', this.updatedOrder)
            this.fetchFavourites()
        }
    },
}
</script>

<style>
</style>
