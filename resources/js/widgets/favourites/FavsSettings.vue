<template>
    <table class="uk-table">
        <thead>
            <tr>
                <th class="uk-text-capitalize">Title</th>
                <th class="uk-text-capitalize">Link</th>
                <th class="uk-text-capitalize">Image Source</th>
                <th class="uk-text-capitalize posWidth">Position</th>
                <th class="uk-text-capitalize">Edit</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="favourite in favourites" class="textBody">
                <td> <input type="text" class="uk-input" v-model="favourite.title"> </td>
                <td> <input type="text" class="uk-input" v-model="favourite.url"> </td>
                <td> <input type="text" class="uk-input" v-model="favourite.src"> </td>
                <td> <input type="number" class="uk-input" v-model="favourite.pos"> </td>
                <td class="uk-button-group">
                    <a class="uk-icon-button uk-button-primary roundedButton" @click="updateFavourite(favourite)" uk-icon="pencil" />
                    <a class="uk-icon-button uk-button-danger roundedButton" @click="deleteFavourite(favourite)" uk-icon="trash" />

                    <!-- <button class="uk-button uk-button-primary uk-button-small roundedButton" @click="updateFavourite(favourite)">
                        <span uk-icon="pencil"></span>
                    </button>
                    <button class="uk-button uk-button-danger uk-button-small roundedButton" @click="deleteFavourite(favourite)">
                        <span uk-icon="trash"></span>
                    </button> -->
                </td>
            </tr>
            <tr>
                <td> <input type="text" class="uk-input" v-model="newFavourite.title"> </td>
                <td> <input type="text" class="uk-input" v-model="newFavourite.url"> </td>
                <td> <input type="text" class="uk-input" v-model="newFavourite.src"> </td>
                <td> <input type="number" class="uk-input" v-model="newFavourite.pos"> </td>
                <td class="posWidth">
                    <a class="uk-icon-button uk-button-success roundedButton" @click="addFav(newFavourite)" uk-icon="plus" />
<!--
                    <button class="uk-button uk-button-primary uk-button-small roundedButton"
                           @click="addFav(newFavourite)">
                        <span uk-icon="plus"></span>
                    </button> -->
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data: function() {
        return {
            newFavourite: {id: null, user_id: null, title: '', url: '', src: ''},
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
        })
    },
}
</script>

<style scoped>
    tr th {
        font-weight: 500px;
        font-size: 22px;
        text-align: center;

        padding: 0;
    }

    .posWidth {
        width: 60px;
    }

    .uk-icon-button {
        height: 40px;
        width:  40px;
    }
</style>
