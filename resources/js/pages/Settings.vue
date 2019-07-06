<template>
    <div class="row center-xs middle-xs nomargin Settings">
        <div class="row center-xs fullWidth nospacing">
            <h1 class="textSpecial">Your {{activeTab.title}}</h1>
        </div>

        <div class="row center-xs nospacing">
            <ul uk-tab>
                <li v-for="tab in tabs">
                    <a class="uk-text-capitalize textTitle tabsTitle noselect" @click="activeTab = tab">
                        {{tab.title}}
                    </a>
                </li>
            </ul>
        </div>

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
    data: function() {
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
        height: 69vh;
        width: 100%;
    }

    .uk-tab>*>a {
        font-size: 4vh;
        color: grey;
    }

    .textColor, .Settings h1, h2, h4, h5, .uk-tab > .uk-active > a {
        color: black;
    }

    input, select, .uk-input, .uk-select {
        border-radius: 30px;
        background: rgba(30,30,30,0.5);
        color: white;
    }

    input:focus, select:focus, .uk-input:focus, .uk-select:focus {
        border-radius: 30px;
        background: rgba(50,50,50,0.7);
        color: white;
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

    /* h1 {
        margin: 15px;
    }

    h5 {
        margin: 10px 0;
    } */
</style>


<!-- mysql -->
create table if not exists users (
    id int auto_increment,
    name varchar(50) not null,
    pass varchar(50) not null,
    primary key (id)
);
