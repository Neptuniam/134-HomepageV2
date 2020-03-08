<template>
<div class="MapsSettings">

    <!-- <table class="uk-table">
        <thead>
            <tr>
                <th class="uk-text-capitalize posWidth">Position</th>
                <th class="uk-text-capitalize">Title</th>
                <th class="uk-text-capitalize">Link</th>
                <th class="uk-text-capitalize">Image Source</th>
                <th class="uk-text-capitalize">Edit</th>
            </tr>
        </thead>
        <tbody uk-sortable="handle: .uk-sortable-handle" class="fullWidth">
            <tr v-for="favourite in favourites" class="uk-sortable-handle fullWidth textBody">
                <td>
                    <input type="number" class="uk-input" v-model="favourite.pos">
                </td>
                <td> <input class="uk-input" v-model="favourite.title"> </td>
                <td> <input class="uk-input" v-model="favourite.url"> </td>
                <td> <input class="uk-input" v-model="favourite.src"> </td>

                <td class="uk-button-group">
                    <a class="uk-icon-button uk-button-primary roundedButton" @click="updateFavourite(favourite)" uk-icon="pencil" />
                    <a class="uk-icon-button uk-button-danger roundedButton" @click="deleteFavourite(favourite)" uk-icon="trash" />
                </td>
            </tr>
            <tr>
                <td>
                    <input type="number" class="uk-input" v-model="newFavourite.pos">
                </td>
                <td> <input class="uk-input" v-model="newFavourite.title"> </td>
                <td> <input class="uk-input" v-model="newFavourite.url"> </td>
                <td> <input class="uk-input" v-model="newFavourite.src"> </td>
                <td class="posWidth">
                    <a class="uk-icon-button uk-button-success roundedButton" @click="addFav(newFavourite)" uk-icon="plus" />
                </td>
            </tr>
        </tbody>
    </table> -->

    <div uk-sortable="handle: .uk-sortable-handle">
        <div v-for="(favourite, index) in favourites" class="row middle-xs textBody SettingsRow" :id="favourite.id">
            <div class="uk-sortable-handle col-xs-1 end-xs" uk-icon="icon: grid; ratio: 1.5"></div>

            <input class="col-xs uk-input" v-model="favourite.title">
            <input class="col-xs uk-input" v-model="favourite.url">
            <input class="col-xs uk-input" v-model="favourite.src">

            <div class="col-xs-1 end-xs">{{index}}</div>
            <div class="col-xs-2 end-xs uk-button-group">
                <a class="uk-icon-button uk-button-primary roundedButton" @click="updateFavourite(favourite)" uk-icon="pencil" />
                <a class="uk-icon-button uk-button-danger roundedButton" @click="deleteFavourite(favourite)" uk-icon="trash" />
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

    mounted() {
        let _this = this
        // Listen for an update on the uk-sortable
        document.addEventListener('moved', function(e) {
            for (let i = 0; i < e.target.children.length; i++) {
                let child = e.target.children[i]
                let fav = _this.favourites.find(fav => fav.id == child.id)

                if (fav) {
                    console.log(i, {...fav});
                    fav.pos = i
                    console.log({...fav});
                    // _this.updateFavourite(fav)
                }
            }

        });
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

    .MapsSettings {
        padding: 0px 20px;
    }


    .SettingsRow {
        /* margin: 10px 0px; */
    }
    .SettingsRow input, .SettingsRow div {
        margin: 10px 5px;
    }

    .col-xs-1 {
        max-width: 40px;
    }
    .col-xs-2 {
        max-width: 120px;
    }

    .uk-icon-button {
        height: 40px;
        width:  40px;
    }
</style>
