<template>
    <div class="row center-xs middle-xs nomargin Settings">
        <div class="col-xs-10 fullWidth background">
            <h1 class="textSpecial">Your {{activeTab.title}}</h1>
            <vue-custom-scrollbar :settings="scrollSettings" class="scrollSpace">
                <ul uk-tab>
                    <li><a class="uk-text-capitalize textTitle tabsTitle" @click="activeTab = widgets">Widgets</a></li>
                    <li><a class="uk-text-capitalize textTitle tabsTitle" @click="activeTab = maps">Locations</a></li>
                    <li><a class="uk-text-capitalize textTitle tabsTitle" @click="activeTab = favs">Favourites</a></li>
                </ul>

                <component :is="activeTab.src" />
            </vue-custom-scrollbar>

            <h5 class="textBody">HomepageV2 copyright (c) 2019 <a href="https://ljones.ca" target="_blank">Liam Jones</a>. All Rights Reserved.</h5>
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
            widgets: {
                title: 'Widgets',
                src: 'WidgetsSettings'
            },
            maps: {
                title: 'Maps',
                src: 'MapsSettings'
            },
            favs: {
                title: 'Favourite Links',
                src: 'FavSettings'
            }
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
        /* background-color: #29375E; */

        background: #0F2027;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to bottom, #2C5364, #203A43, #0F2027);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to bottom, #2C5364, #203A43, #0F2027); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    }

    .scrollSpace {
        height: 75vh;
        width: 100%;
    }

    .uk-tab>*>a {
        font-size: 1.5rem;
    }

    .textColor, h1, .uk-button, .uk-tab > .uk-active > a, h4, h5 {
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
<!-- create table if not exists favourites (
    id int auto_increment,
    title varchar(100),
    url varchar(200) not null,
    src varchar(20) not null,
    pos int,
    primary key (id)
); -->
