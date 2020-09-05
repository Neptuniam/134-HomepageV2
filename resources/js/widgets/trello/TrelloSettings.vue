<template>
<SettingsTable>
    <template v-slot:headers>
        <div class="col-xs">
            Board ID
        </div>

        <div class="col-xs">
            Developer Key
        </div>
        <div class="col-xs">
            Token
        </div>

        <div class="col-xs-2">
        </div>
    </template>

    <template v-slot:body>
        <TrelloRow v-for="credential in getTrelloCreds" :key="credential.id" :dataObject="credential" />

        <TrelloRow :dataObject="blankObject" />
    </template>
</SettingsTable>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            blankObject: {id: null, user_id: null, board_id: null, developer_key: null, token: null}
        }
    },
    computed: {
        ...mapGetters('settings', ['getTrelloCreds'])
    },

    methods: {
        ...mapActions('settings', ['fetchTrelloCredentials'])
    },

    mounted() {
        this.fetchTrelloCredentials()
    }
}
</script>
