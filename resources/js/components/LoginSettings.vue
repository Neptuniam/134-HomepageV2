<template>
<div class="row center-xs middle-xs textBody textColor">
    <div class="uk-card uk-card-default uk-card-body roundedButton LoginSettings start-xs">
        <div v-if="activeUser">
            <h1  class="uk-card-title">
                Welcome, {{activeUser.name}}!
            </h1>

            <div class="spacer">

            </div>
        </div>

        <!-- <div class="inputRow"> -->
            <CustomInput placeholder="Username" :inputData.sync="name" />

            <CustomInput
                placeholder="Password"
                :inputType="passwordType"
                :inputData.sync="pass"
                :append-icon="passwordType == 'password' ? 'EyeOff' : 'eye'"
                @appendIconClick="passwordType = passwordType == 'password' ? 'text' : 'password'"
            />

        <!-- </div> -->

        <div class="row center-xs buttonsRow">
            <CustomButton
                title="Log in"
                color="primary"
                class="col-xs-5 uk-text-capitalize"
                :click="login"
            />

            <CustomButton v-if="activeUser && activeUser.id == 1"
                title="Change Password"
                color="secondary"
                class="col-xs-5 uk-text-capitalize"
                :click="create"
            />
        </div>

        <!-- <CustomButton
            title="New User"
            color="text"
            :click="login"
        /> -->

    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            name: 'Liam',
            pass: 'liam',

            passwordType: 'password'
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

            // this.axios.post('/user/login', { name: this.name, pass: this.pass}).then(({ data }) => {
            //     console.log(data);
            //     if ('id' in data) {
            //         localStorage.setItem('activeUser', data.id);
            //     }
            // })
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

<style>
    .LoginSettings {
        width: 500px;

        margin-top: 50px;
    }


    .LoginSettings input {
        background: white !important;
    }

    .LoginSettings .buttonsRow {
        margin-top: 40px;
    }

    /* h1 {
        font-weight: 550px !important;
    } */
</style>
