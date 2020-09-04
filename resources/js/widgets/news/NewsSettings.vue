<template>
<SettingsTable>
    <template v-slot:headers>
        <div class="col-xs-1">
            Sort
        </div>

        <div class="col-xs-2 uk-text-capitalize">
            title
        </div>

        <div class="col-xs-2 center-xs nopadding">
        </div>
    </template>

    <template v-slot:body>
        <span uk-sortable="handle: .uk-sortable-handle">
            <NewsRow v-for="cat in getCategorys" :key="cat.id" :id="cat.id" :dataObject="cat" />
        </span>

        <NewsRow :dataObject="blankObject" />
    </template>
</SettingsTable>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            blankObject: {id: null, name: null, pass: null},
            updatedOrder: null
        }
    },

    computed: {
        ...mapGetters('settings', [ 'getCategorys' ])
    },

    methods: {
        ...mapActions('settings', [ 'fetchCategorys' ])
    },

    mounted() {
        this.fetchCategorys()

        let _this = this
        // Listen for an update on the uk-sortable
        document.addEventListener('moved', function(e) {
            // Mixing uikit sortable with updating indices was awful so we update them on the backend
            _this.updatedOrder = []

            for (let i = 0; i < e.target.children.length; i++) {
                let child = e.target.children[i]
                let fav = _this.getCategorys.find(fav => fav.id == child.id)

                if (fav) {
                    _this.updatedOrder.push(fav)
                }
            }
        });
    },

    async destroyed() {
        if (this.updatedOrder) {
            await this.axios.put('/news/categorys/updatePositions', this.updatedOrder)
            this.fetchCategorys()
        }
    },
}
</script>
