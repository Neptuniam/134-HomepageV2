<template>
    <div class="row center-xs middle-xs nomargin Settings">
        <div class="col-xs-12 fullWidth background">
            <h1 class="textSpecial">Your {{activeTab.title}}</h1>

            <div class="row center-xs">
                <ul uk-tab class="col-xs-4">
                    <li v-for="tab in tabs">
                        <a class="uk-text-capitalize textTitle tabsTitle noselect" @click="activeTab = tab">
                            {{tab.title}}
                        </a>
                    </li>
                </ul>
            </div>

            <vue-custom-scrollbar :settings="scrollSettings" class="scrollSpace">
                <component :is="activeTab.src" />
            </vue-custom-scrollbar>

        </div>

        <h5 class="row fullWidth center-xs footer textBody">
            HomepageV2 copyright &copy; {{1900+new Date().getYear()}}
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
                title: 'Favourites',
                src: 'FavSettings'
            },
            tabs: [{
                    title: 'Account',
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
        width: 100vw;
    }

    .footer {
        position: absolute;
        bottom: 0;
    }

    .scrollSpace {
        height: 70vh;
        width: 100%;
    }

    .uk-tab>*>a {
        font-size: 1.5rem;
        color: grey;
    }

    .textColor, .Settings h1, h2, h4, h5, .uk-tab > .uk-active > a {
        color: black;
    }

    input, .uk-input, .uk-select {
        border-radius: 30px;
        background: rgba(30,30,30,0.5);
        color: white;
    }

    .uk-table th {
        color: black;
    }

    .uk-table td {
        padding: 10px 5px;
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
