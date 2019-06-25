<template>
    <table class="uk-table uk-table-striped">
        <thead>
            <tr>
                <th>Title</th>
                <th>Link</th>
                <th>Image Source</th>
                <th>Position</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="favourite in favourites" class="textBody">
                <td> <input type="text" class="fullWidth uk-input" v-model="favourite.title"> </td>
                <td> <input type="text" class="fullWidth uk-input" v-model="favourite.url"> </td>
                <td> <input type="text" class="fullWidth uk-input" v-model="favourite.src"> </td>
                <td> <input type="number" class="uk-input" v-model="favourite.pos"> </td>
                <td class="uk-button-group">
                    <button class="uk-button uk-button-primary uk-button-small" @click="updateFavourite(favourite)">
                        <span uk-icon="pencil"></span>
                    </button>
                    <button class="uk-button uk-button-secondary uk-button-small" @click="deleteFavourite(favourite)">
                        <span uk-icon="trash"></span>
                    </button>
                </td>
            </tr>
            <tr>
                <td> <input type="text" class="fullWidth uk-input" v-model="newFavourite.title"> </td>
                <td> <input type="text" class="fullWidth uk-input" v-model="newFavourite.url"> </td>
                <td> <input type="text" class="fullWidth uk-input" v-model="newFavourite.src"> </td>
                <td> <input type="number" class="uk-input" v-model="newFavourite.pos"> </td>
                <td>
                    <button class="uk-button uk-button-primary uk-button-small"
                           @click="updateFavourite(newFavourite); newFavourite={id: null, title: '', url: '', src: ''}">
                        <span uk-icon="plus"></span>
                    </button>
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
            newFavourite: {id: null, title: '', url: '', src: ''},
        }
    },
    computed: {
        ...mapGetters('settings', {
            favourites: 'getFavourites',
        })
    },
    methods: {
        ...mapActions('settings', {
            updateFavourite: 'updateFavourite',
            deleteFavourite: 'deleteFavourite',
        })
    },
}
</script>

<style scoped>
    td {
        height: 100%;
    }

    .uk-button {
        padding: 0;
        height: 2.4rem;
    }
</style>
