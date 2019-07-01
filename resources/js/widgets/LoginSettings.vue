<template>
    <div class="row center-xs middle-xs fullWidth textColor">
        <div class="col-xs-4">
            <div v-if="activeUser" class="row center-xs fullWidth nomargin">
                <h2 class="textTitle">Welcome, {{activeUser.name}}!</h2>
            </div>


            <span class="row uk-form-label fullWidth textColor textBody">Username</span>

            <div class="uk-form-controls fullWidth">
                <input type="name" name="name" v-model="name" class="uk-input textBody fullWidth">
            </div>

            <br>

            <span class="row uk-form-label fullWidth textColor textBody">Password</span>

            <div class="uk-form-controls fullWidth">
                <input type="password" name="pass" v-model="pass" class="uk-input textBody fullWidth">
            </div>

            <br>

            <div class="row center-xs">
                <button type="button" class="uk-button uk-button-primary textTitle" @click="login()">
                    Switch Accounts
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data: function() {
        return {
            name: null,
            pass: null,
        }
    },
    computed: {
        ...mapGetters('settings',{
            users: 'getUsers',
            activeUser: 'getUser'
        })
    },
    methods: {
        login() {
            // Attempt to match the provided login credentials to an existing user
            let newUser = this.users.find(user => user.name === this.name && user.pass === this.pass)

            // If a user was found with matching credentials allow the login
            if (newUser) {
                console.log("Valid Login Provided");
                console.log(newUser);

                // Logout the previous user
                if (this.activeUser) {
                    this.activeUser.active = 0
                    this.updateUser(this.activeUser)
                }

                newUser.active = 1
                this.updateUser(newUser)
                this.setActiveUser(newUser)
            } else {
                console.log("Invalid Login");
            }


        },
        ...mapActions('settings', {
            updateUser: 'updateUser',
            setActiveUser: 'setActiveUser',
            // fetchUser: 'fetchUser',
            // fetchUsers: 'fetchUsers',
            // fetchWidgets: 'fetchWidgets',
            // fetchLocations: 'fetchLocations',
            // fetchMapsSettings: 'fetchMapsSettings',
            // fetchFavourites: 'fetchFavourites',
        })
    },
}
</script>

<style scoped>
    .uk-form-label {
        padding-left: 7%;
    }
</style>
