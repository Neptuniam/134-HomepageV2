<template>
<div v-if="news">
    <div v-if="activePage === 'news'" class="row center-xs NewsDisplay">
        <div class="row middle-xs fullWidth">
            <div class="col-xs">
                <a v-if="index > 0" @click="index--" class="uk-icon previousIcon" uk-icon="icon: chevron-left; ratio: 2" uk-tooltip="Previous Article" />
            </div>

            <ul uk-tab class="col-xs-10 nomargin">
                <li v-for="category in categorys">
                    <a class="uk-text-capitalize textTitle tabsTitle noselect" @click="activeCat = category">
                        {{category}}
                    </a>
                </li>
            </ul>

            <div class="col-xs">
                <a v-if="index < news.length" @click="index++" class="uk-icon nextIcon" uk-icon="icon: chevron-right; ratio: 2" uk-tooltip="Next Article" />
            </div>
        </div>

        <div class="articleNum textBody">
            Article {{index+1}} / {{news.length}}
        </div>

        <div class="textSpecial headlineTitle">
            {{news[index].title.split(' -')[0]}}
        </div>

        <hr class="fullWidth">

        <div v-if="news[index].content" class="row center-xs fullWidth textBody headlineContent">
            {{news[index].content.split('[+')[0]}}
        </div>

        <p class="fullWidth textBody nomargin ">
            <a :href="news[index].url" target="_blank" class="headlineUrl">{{news[index].url}}</a>
        </p>

        <p class="fullWidth textBody headlineSrc">
            - {{news[index].source.name}}
        </p>
    </div>
    <div v-else-if="activePage === 'home'" class="row center-xs NewsRow">
        <a class="col-xs-9" :href="news[index].url" target="_blank">
            {{news[index].title}}
        </a>
    </div>
</div>
</template>

<script>
// Key: 2b056b1596eb4356a56510c4e19da2b7
import { mapActions, mapGetters } from 'vuex';

export default {
    data: function() {
        return {
            news: null,
            showNews: false,
            index: 0,
            categorys: ['general', 'technology', 'sports', 'science', 'entertainment'],
            activeCat: 'general'
        }
    },
    computed: {
        ...mapGetters('settings', {
            activePage: 'getActivePage',
        })
    },
    methods: {
        getNews() {
            let query = "https://newsapi.org/v2/top-headlines?country=ca&category="+this.activeCat+"&apiKey=2b056b1596eb4356a56510c4e19da2b7"
            this.axios.get(query).then(news => {
                // Reset index to the first article everytime we switch categories
                this.index = 0
                this.news = news.data.articles

                console.log('%c News ', 'background: #222; color: #bada55');
                console.log(news.data.articles);
            })
        },

        ...mapActions('settings', {
            setShowHome: 'setShowHome',
            setActivePage: 'setActivePage',
        })
    },
    mounted: function() {
        this.getNews()
    },
    watch: {
        activeCat: function() {
            this.getNews()
        },
        activePage: function(){
            if (this.activePage === 'news') {
                // Always send us back to the default on show so tabs are correct
                this.activeCat = this.categorys[0]
                this.index = 0
            }
        }
    },
}
</script>

<style scoped>
    .NewsDisplay {
        /* width: 1000px; */
        margin-top: 30px;
    }

    .NewsRow {
        font-weight: 600px;
        font-size: 4vh;
    }
    .NewsRow a {
        color: black;
    }

    .newsIcon {
        position: absolute;
        left: 60px;
        top: 10px;
    }

    .newsIcon:hover {
        color: white;
    }

    .articleNum {
        margin: 10px 400px 40px 400px;
    }


    .headlineTitle {
        font-weight: 800px;
        font-size: 35px;

        min-height: 100px;
    }

    .headlineContent {
        font-weight: 400px;
        font-size: 25px;

        min-height: 200px;
    }

    .headlineSrc {
        font-weight: 300px;
        font-size: 20px;
    }

    .headlineUrl {
        font-weight: 200px;
        font-size: 20px;

        color: blue;
    }
</style>
