<template>
<div class="MapsSettings">
    <div class="row start-xs middle-xs textBody HeaderRow">
        <div class="col-xs-1">
            Sort
        </div>

        <div class="col-xs uk-text-capitalize">
            title
        </div>
        <div class="col-xs uk-text-capitalize">
            url
        </div>
        <div class="col-xs uk-text-capitalize">
            src
        </div>

        <div class="col-xs-2 center-xs">
            Actions
        </div>
    </div>

    <div uk-sortable="handle: .uk-sortable-handle">
        <div v-for="(favourite, index) in favourites" class="row middle-xs textBody SettingsRow" :id="favourite.id">
            <div class="uk-sortable-handle col-xs-1 start-xs" uk-icon="icon: grid; ratio: 1.5"></div>

            <input class="col-xs uk-input" v-model="favourite.title">
            <input class="col-xs uk-input" v-model="favourite.url">
            <input class="col-xs uk-input" v-model="favourite.src">

            <div class="col-xs-2 end-xs uk-button-group">
                <a class="uk-icon-button uk-button-primary roundedButton uk-box-shadow-hover-xlarge" @click="updateFavourite(favourite)" uk-icon="pencil" />
                <a class="uk-icon-button uk-button-danger roundedButton uk-box-shadow-hover-xlarge" @click="deleteFavourite(favourite)" uk-icon="trash" />
            </div>
        </div>
    </div>

</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            newFavourite: {id: null, user_id: null, title: '', url: '', src: ''},
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
        addFav() {
            // Only create a favourite if we know the user
            if (this.activeUser) {
                // Add the user id
                this.newFavourite.user_id = this.activeUser.id

                // Add the fav to the db
                this.updateFavourite(this.newFavourite)

                // Clear the new object so another can be created
                this.newFavourite = {id: null, user_id: this.activeUser.id, title: '', url: '', src: ''}
            }
        },

        ...mapActions('settings', {
            updateFavourite: 'updateFavourite',
            deleteFavourite: 'deleteFavourite',
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
            await this.axios.put('/settings/favourites/updatePositions', this.updatedOrder)
            this.fetchFavourites()
        }
    },
}
</script>

<style scoped>
    .MapsSettings {
        padding: 0px 20px;
    }

    .HeaderRow {
        font-weight: 500px;
        font-size: 22px;

        padding: 0;
    }


    .SettingsRow {
        /* margin: 10px 0px; */
    }
    .SettingsRow input, .SettingsRow div {
        margin: 10px 5px;
    }

    .col-xs-1 {
        max-width: 60px;
    }
    .col-xs-2 {
        max-width: 120px;
    }

    .uk-icon-button {
        height: 40px;
        width:  40px;
    }
</style>
