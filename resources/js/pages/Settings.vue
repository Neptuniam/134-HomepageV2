<template>
    <div class="row center-xs middle-xs nomargin Settings">
        <ul uk-tab>
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
                },
            ]
        }
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
        color: rgb(100, 100, 100);
    }

    .textColor, .Settings h1, h2, h4, h5, .uk-tab > .uk-active > a {
        color: black !important;
    }

    input, select, .uk-input, .uk-select, textarea {
        border-radius: 10px !important;
        background: rgba(60,60,60,0.7) !important;
        color: rgb(240, 240, 240) !important;
        outline: none !important;
    }

    input:focus, select:focus, .uk-input:focus, .uk-select:focus, textarea:focus {
        border-radius: 30px;
        background: rgba(50,50,50,0.7);
        color: white;
        outline: none;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active  {
        -webkit-box-shadow: 0 0 0 30px rgba(50,50,50,0.7) inset !important;
        -webkit-text-fill-color: white !important;
    }

    .uk-table th {
        color: black;
    }

    .uk-table td {
        padding: 10px 5px;
    }

    h1 {
        font-size: 6.5vh;
        margin: 0.5% 0 0 0;
    }

    h5 a {
        color: #333;
    }
</style>
