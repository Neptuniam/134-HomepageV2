<template>
<SettingsTable>
    <template v-slot:headers>
        <div class="col-xs-2 uk-text-capitalize">
            ID
        </div>
        <div class="col-xs uk-text-capitalize nopadding">
            Name
        </div>
        <div class="col-xs uk-text-capitalize nopadding">
            Pass
        </div>
        <div class="col-xs-2 uk-text-capitalize nopadding">
            Last Updated
        </div>

        <div class="col-xs-2 center-xs nopadding">
        </div>
    </template>

    <template v-slot:body>
        <UsersRow v-for="user in getUsers" :key="user.id" :dataObject="user" />

        <UsersRow :dataObject="blankObject" />
    </template>
</SettingsTable>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            blankObject: {id: null, name: null, pass: null}
        }
    },

    computed: {
        ...mapGetters('settings', [ 'getUsers' ])
    }
}
</script>
