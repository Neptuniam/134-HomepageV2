<template>
<div class="row center-xs middle-xs textBody textColor">
    <div class="LoginSettings">
        <div v-if="activeUser" class="row center-xs nomargin">
            <h1>Welcome, {{activeUser.name}}!</h1>
        </div>

        <div class="inputRow">
            <CustomInput placeholder="Username" :inputData.sync="name" />

            <CustomInput placeholder="Password" :inputData.sync="pass" />
        </div>

        <div class="row center-xs buttonsRow">
            <CustomButton title="Log in" color="primary" class="col-xs-5 uk-text-capitalize" :click="login" />

            <CustomButton v-if="activeUser && activeUser.id == 1" title="Create Profile" color="secondary" class="col-xs-5 uk-text-capitalize" :click="create" />
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
                UIkit.notification({
                    message: '<span uk-icon=\'icon: check\'></span> Valid Login Provided!',
                    status: 'success'
                })

                this.setActiveUser(newUser)
                this.fetchWidgets()
            } else {
                UIkit.notification({
                    message: '<span uk-icon=\'icon: close\'></span> Invalid Login Provided!',
                    status: 'danger'
                })
            }
        },

        create() {
            this.createUser({id:null, name: this.name, pass: this.pass}).then(() => {
                UIkit.notification({
                    message: '<span uk-icon=\'icon: check\'></span> New User Created!',
                    status: 'success'
                })
            }).catch(() => {
                UIkit.notification({
                    message: '<span uk-icon=\'icon: close\'></span> Failed to create user!',
                    status: 'danger'
                })
            })
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

    /* .inputRow {
        margin: 50px 0;
    }

    .uk-form-label {
        text-align: left;
        width: 100%;

        margin-top: 25px;
        padding-left: 15px;
    }

    .uk-button {
        font-size: 18px;
    } */
</style>
