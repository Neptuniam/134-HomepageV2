<template>
    <div class="row center-xs middle-xs nomargin Settings">
        <div class="col-xs-10 fullWidth background">
            <h1 class="textSpecial">Your {{activeTab.title}}</h1>
            <vue-custom-scrollbar :settings="scrollSettings" class="scrollSpace">
                <ul uk-tab>
                    <li v-for="tab in tabs">
                        <a class="uk-text-capitalize textTitle tabsTitle noselect" @click="activeTab = tab">
                            {{tab.title}}
                        </a>
                    </li>
                </ul>

                <component :is="activeTab.src" />
            </vue-custom-scrollbar>

            <h5 class="textBody">
                HomepageV2 copyright &copy; {{1900+new Date().getYear()}}
                 <a href="https://ljones.ca" target="_blank">Liam Jones</a>. All Rights Reserved.
             </h5>
        </div>
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
                title: 'Widgets',
                src: 'WidgetsSettings'
            },
            tabs: [{
                    title: 'Widgets',
                    src: 'WidgetsSettings'
                }, {
                    title: 'Maps',
                    src: 'MapsSettings'
                }, {
                    title: 'Favourites',
                    src: 'FavSettings'
                }, {
                    title: 'Account',
                    src: 'LoginSettings'
                },
            ]
        }
    },
}
</script>

<style>
    .Settings {
        width: 100vw;
        color: white;
    }

    .background {
        border-radius: 30px;

        background: #0F2027;
        background: -webkit-linear-gradient(to bottom, #2C5364, #203A43, #0F2027);
        background: linear-gradient(to bottom, #2C5364, #203A43, #0F2027);
    }

    .scrollSpace {
        height: 75vh;
        width: 100%;
    }

    .uk-tab>*>a {
        font-size: 1.5rem;
    }

    .textColor, h1, h2, .uk-button, .uk-tab > .uk-active > a, h4, h5 {
        color: white;
    }

    input, .uk-input, .uk-select {
        border-radius: 30px;

        background-color: #29375E;
        border-color: #29375E;
        color: #DCE7F9;
    }

    .uk-table td {
        padding: 10px 5px;
    }

    h1 {
        margin: 15px;
    }

    h5 {
        margin: 10px 0;
    }
</style>


<!-- mysql -->
create table if not exists users (
    id int auto_increment,
    name varchar(50) not null,
    pass varchar(50) not null,
    primary key (id)
);
