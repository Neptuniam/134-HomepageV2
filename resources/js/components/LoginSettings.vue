<template>
<div class="row center-xs middle-xs textBody textColor">
    <div class="LoginSettings">
        <div v-if="activeUser" class="row center-xs nomargin">
            <h1>Welcome, {{activeUser.name}}!</h1>
        </div>

        <div class="inputRow">
            <span class="row uk-form-label">Username</span>
            <input type="name"      v-model="name" onClick="this.select();" class="uk-input">

            <span class="row uk-form-label">Password</span>
            <input type="password"  v-model="pass" onClick="this.select();" class="uk-input">
        </div>

        <div class="row center-xs buttonsRow">
            <button type="button" class="col-xs-5 uk-button uk-button-primary roundedButton uk-text-capitalize" @click="login()">
                {{ activeUser ? "Switch Profiles" : "Log in" }}
            </button>
            <button type="button" class="col-xs-5 uk-button uk-button-secondary roundedButton uk-text-capitalize" @click="create()">
                Create Profile
            </button>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
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
                this.fetchWidgets()
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
            fetchWidgets: 'fetchWidgets',
        })
    },
}
</script>

<style scoped>
    .LoginSettings {
        width: 500px;
    }

    h1 {
        font-weight: 550px !important;
    }

    .inputRow {
        margin: 50px 0;
    }

    .uk-form-label {
        text-align: left;
        width: 100%;

        margin-top: 25px;
        padding-left: 25px;
    }

    .buttonsRow {
        /* margin-top: 40px; */
    }

    .uk-button {
        font-size: 18px;
    }
</style>
