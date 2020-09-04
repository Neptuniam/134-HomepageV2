<template>
<SettingsTable>
    <template v-slot:headers>
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
    </template>

    <template v-slot:body>
        <span uk-sortable="handle: .uk-sortable-handle">
            <FavsRow v-for="fav in getFavourites" :key="fav.id" :id="fav.id" :dataObject="fav" />
        </span>

        <FavsRow :dataObject="blankObject" />
    </template>
</SettingsTable>
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
        ...mapGetters('settings', ['getFavourites'])
    },

    methods: {
        ...mapActions('settings', ['fetchFavourites'])
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
                let fav = _this.getFavourites.find(fav => fav.id == child.id)

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
