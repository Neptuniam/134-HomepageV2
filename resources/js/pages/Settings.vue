<template>
    <div class="row center-xs middle-xs nomargin Settings">
        <div class="col-xs-10 fullWidth background">
            <h1 class="textSpecial">Your {{activeTab.title}}</h1>
            <vue-custom-scrollbar class="scrollSpace">
                <ul uk-tab>
                    <li><a @click="activeTab = widgets">Widgets</a></li>
                    <li><a @click="activeTab = maps">Locations</a></li>
                    <li><a @click="activeTab = favs">Favourites</a></li>
                </ul>

                <component :is="activeTab.src" />
            </vue-custom-scrollbar>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
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

<style scoped>
    .Settings {
        width: 100vw;

        color: black;
    }

    .background {
        background: rgba(240,240,240,0.85);
    }

    .scrollSpace {
        height: 80vh;
        width: 100%;
    }

    h3 {
        /* text-align: center; */
        padding-left: 10px;
    }
</style>


<!-- mysql -->
create table if not exists favourites (
    id int auto_increment,
    title varchar(100),
    url varchar(200) not null,
    src varchar(20) not null,
    pos int,
    primary key (id)
);
