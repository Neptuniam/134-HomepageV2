<template>
    <div class="row center-xs middle-xs nomargin Settings">
        <ul v-if="activeUser" uk-tab>
            <li v-for="tab in tabs" :class="{'uk-active': tab.title == activeTab.title}">
                <a class="uk-text-capitalize textTitle noselect" @click="activeTab = tab">
                    {{tab.title}}
                </a>
            </li>
        </ul>

        <vue-custom-scrollbar :settings="scrollSettings" class="scrollSpace nospacing">
            <component :is="activeTab.src" />
        </vue-custom-scrollbar>

        <h5 class="row fullWidth center-xs footer textBody nospacing">
            HomepageV2 copyright &copy; {{1900+new Date().getYear()}} of &nbsp;
            <a href="https://ljones.ca" target="_blank"> Liam Jones</a>. All Rights Reserved.
        </h5>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            scrollSettings: {
                suppressScrollX: true
            },
            activeTab: {
                title: 'Profile',
                src: 'LoginSettings'
            },
            tabs: [{
                    title: 'Profile',
                    src: 'LoginSettings'
                }, {
                    title: 'Widgets',
                    src: 'WidgetsSettings'
                }, {
                    title: 'Maps',
                    src: 'MapsSettings'
                }, {
                    title: 'Favourites',
                    src: 'FavSettings'
                }, {
                    title: 'Background',
                    src: 'BackgroundSettings'
                }, {
                    title: 'Trello',
                    src: 'TrelloSettings'
                },
            ]
        }
    },
    computed: {
        ...mapGetters('settings', {
            activeUser: 'getUser',
        })
    },
}
</script>

<style>
    .Settings {
        height: 100vh;
        width: 100vw;
    }

    .footer {
        position: absolute;
        bottom: 0;
    }

    .scrollSpace {
        height: 80vh;
        width: 100%;
    }

    .uk-tab>*>a {
        font-weight: 600;
        font-size: 4vh !important;
        color: rgb(100, 100, 100) !important;
    }
    .uk-tab>*>a:hover {
        color: rgb(50, 50, 50) !important;
    }

    .textColor, .Settings h1, h2, h4, h5, .uk-tab > .uk-active > a {
        color: black !important;
    }

    input, select, .uk-input, .uk-select, textarea {
        border-radius: 10px !important;
        background: rgb(235,235,235) !important;
        /* background: rgba(60,60,60,0.7) !important;
        color: rgb(240, 240, 240) !important; */
        outline: none !important;
    }

    /* input:focus, select:focus, .uk-input:focus, .uk-select:focus, textarea:focus {
        border-radius: 30px;
        background: rgba(50,50,50,0.7);
        color: white;
        outline: none;
    } */

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active  {
        -webkit-box-shadow: 0 0 0 30px rgb(235,235,235) inset !important;
        /* -webkit-text-fill-color: white !important; */
    }


    .uk-table th,
    .uk-table .HeaderRow {
        font-weight: 500px !important;
        font-size: 18px !important;

        padding: 30px 0 0 15px !important;
        color: rgb(50, 50, 50) !important;
    }

    .uk-table tbody td,
    .uk-table-striped tbody .row {
        font-size: 22px;

        text-align: left;
        vertical-align: middle !important;

        padding: 10px 15px !important;
    }

    .uk-table-striped tbody tr:nth-child(even),
    .uk-table-striped tbody .row:nth-child(even) {
        background-color: rgba(225, 225, 225, 0.75) !important;
    }
    .uk-table-striped tbody tr:nth-child(odd),
    .uk-table-striped tbody .row:nth-child(odd) {
        background-color: rgba(200, 200, 200, 0.75) !important;
    }

    h1 {
        font-size: 6.5vh;
        margin: 0.5% 0 0 0;
    }

    h5 a {
        color: #333;
    }
</style>
