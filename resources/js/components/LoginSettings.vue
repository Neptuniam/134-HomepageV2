<template>
<div class="row center-xs middle-xs textBody textColor">
    <div class="uk-card uk-card-default uk-card-body roundedButton LoginSettings start-xs">
        <div v-if="activeUser">
            <h1 class="uk-card-title">
                Welcome, {{activeUser.name}}!
            </h1>

            <div class="spacer"></div>
        </div>

        <CustomInput
            placeholder="Username"
            :inputData.sync="user.name"
            prepend-icon="Account"
        />

        <CustomInput
            placeholder="Password"
            :inputType="passwordType"
            :inputData.sync="user.pass"
            prepend-icon="Lock"
            :append-icon="passwordType == 'password' ? 'EyeOff' : 'eye'"
            @appendIconClick="passwordType = passwordType == 'password' ? 'text' : 'password'"
        />

        <!-- <label for="rememberMe">
            <input type="checkbox" class="uk-checkbox" name="rememberMe" v-model="rememberMe">
            <span class="darkText"> Remember Me </span>
        </label> -->


        <div class="center-xs buttonsRow">
            <div class="row around-xs">
                <CustomButton
                    title="Log in"
                    color="primary"
                    class="uk-text-capitalize fullWidth"
                    :click="login"
                />
            </div>

            <div class="row around-xs">
                <CustomButton v-if="activeUser"
                    title="Change Password"
                    color="secondary"
                    class="col-xs uk-text-capitalize"
                    :click="changePass"
                />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            user: {
                name: null,
                pass: null
            },

            passwordType: 'password',
            rememberMe: true
        }
    },

    computed: {
        ...mapGetters('settings', {
            activeUser: 'getUser'
        })
    },

    methods: {
        login() {
            if (!(!!this.user.name && !!this.user.pass)) {
                UIkit.notification({
                    message: '<span uk-icon=\'icon: close\'></span> Please enter your login credentials!',
                    status: 'danger'
                })

                return
            }

            this.axios.post('/user/login', this.user).then(async ({ data }) => {
                UIkit.notification({
                    message: `<span uk-icon=\'icon: check\'></span> Logged in to '${data.name}'`,
                    status: 'success'
                })

                // Save the new account to localStorage without showing the pass
                delete data.pass
                await this.setActiveUser(data)

                // Update the users widgets
                this.fetchWidgets()
            }).catch((error) => {
                console.log('error', error);
                
                UIkit.notification({
                    message: `<span uk-icon=\'icon: close\'></span> Failed to login to '${this.user.name}'!`,
                    status: 'danger'
                })
            })
        },

        changePass() {
            if (this.user.name === this.activeUser.name) {
                this.updateUser({...this.activeUser, pass: this.user.pass}).then(res => {
                    UIkit.notification({
                        message: '<span uk-icon=\'icon: check\'></span> Password updated!',
                        status: 'success'
                    })
                })
            } else {
                UIkit.notification({
                    message: '<span uk-icon=\'icon: close\'></span> Can only change your password!',
                    status: 'danger'
                })
            }
        },

        create() {
            this.createUser(this.user).then(() => {
                UIkit.notification({
                    message: '<span uk-icon=\'icon: check\'></span> New User Created!',
                    status: 'success'
                })

                // Update the users widgets
                this.fetchWidgets()
            }).catch(error => {
                console.log('error', error.response);
                UIkit.notification({
                    message: '<span uk-icon=\'icon: close\'></span> Failed to create user!',
                    status: 'danger'
                })
            })
        },

        ...mapActions('settings', [
            'createUser',
            'updateUser',
            'setActiveUser',
            'fetchWidgets',
        ])
    }
}
</script>

<style>
    .LoginSettings {
        width: 450px;

        margin-top: 50px;
    }

    .LoginSettings .buttonsRow {
        margin-top: 30px;
    }

    .buttonsRow .uk-button {
        margin: 10px 0px !important;
    }
</style>
