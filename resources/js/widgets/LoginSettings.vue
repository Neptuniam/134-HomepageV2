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
                <button type="button" class="col-xs-4 uk-button uk-button-primary textBody uk-text-capitalize" @click="login()">
                    Switch Profiles
                </button>
                <button type="button" class="col-xs-4 uk-button uk-button-secondary textBody uk-text-capitalize" @click="create()">
                    Create Profile
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
                UIkit.notification({message: '<span uk-icon=\'icon: check\'></span> Valid Login Provided!', status: 'success'})
                this.setActiveUser(newUser)
            } else {
                UIkit.notification({message: '<span uk-icon=\'icon: close\'></span> Invalid Login Provided!', status: 'danger'})
            }
        },

        create() {
            this.createUser({id:null, name: this.name, pass: this.pass, active: 0})
        },

        ...mapActions('settings', {
            createUser: 'createUser',
            setActiveUser: 'setActiveUser',
        })
    },
}
</script>

<style scoped>
    .uk-form-label {
        padding-left: 7%;
    }
</style>
