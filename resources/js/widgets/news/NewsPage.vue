<template>
<div v-if="news && news.length" class="NewsDisplay">
    <div class="row middle-xs fullWidth">
        <div class="col-xs">
            <a v-if="index > 0" @click="index--" class="uk-icon previousIcon"
               uk-icon="icon: chevron-left; ratio: 2" uk-tooltip="Previous Article" />
        </div>

        <ul uk-tab class="col-xs-10 center-xs nomargin">
            <li v-for="category in categorys">
                <a class="uk-text-capitalize textTitle tabsTitle noselect" @click="changeCat(category)">
                    {{category.title}}
                </a>
            </li>
        </ul>

        <div class="col-xs">
            <a v-if="index < news.length-1" @click="index++" class="uk-icon nextIcon"
               uk-icon="icon: chevron-right; ratio: 2" uk-tooltip="Next Article" />
        </div>
    </div>

    <div class="articleNum textBody">
        Article {{index+1}} / {{news.length}}
    </div>

    <div v-if="news[index].webTitle" class="textSpecial headlineTitle" v-html="news[index].webTitle.split(' -')[0]" />

    <hr class="fullWidth">

    <!-- New api doesnt provide a body -->
    <!-- <div v-if="news[index].content" class="textBody headlineContent" v-html="news[index].content.split('[+')[0]" /> -->


    <div class="fullWidth textBody headlineSrc">
        <a :href="news[index].webUrl" target="_blank" class="headlineUrl">
            {{news[index].webUrl}}
        </a>

        <br>
        {{util.createDisplayDate(news[index].webPublicationDate)}}
        <!-- - {{news[index].source.name}} -->
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            index: 0,
            activeCat: null
        }
    },
    computed: {
        widget() {
            if (this.widgets)
                return this.widgets.find(widget => widget.title === 'News')
        },

        ...mapGetters('settings', {
            categorys: 'getCategorys',
            news: 'getNews'
        })
    },
    methods: {
        changeCat(category) {
            this.activeCat = category
            this.fetchNews(category.title)
        },

        onKeyPress () {
            if (event.keyCode == 37 && this.index > 0) {
                this.index--
            } else if (event.keyCode == 39 && this.index < 19) {
                this.index++
            }
        },

        ...mapActions('settings', {
            fetchCategorys: 'fetchCategorys',
            fetchNews: 'fetchNews',
            setShowHome: 'setShowHome',
            setActivePage: 'setActivePage',
        })
    },
    mounted() {
        document.addEventListener("keyup", this.onKeyPress);

        if (!this.news) {
            this.fetchCategorys().then(() => {
                this.activeCat = this.categorys[0]
                this.fetchNews(this.categorys[0].title)
            })
        }
    },
}
</script>

<style scoped>
    .NewsDisplay {
        margin-top: 30px;
        min-height: 650px;

        min-width: 60vw;

        text-align: center;
    }

    .articleNum {
        margin: 10px 400px 40px 400px;
    }


    /* Golen Ratio (Increase by 1.6 each step) */
    .headlineTitle {
        font-weight: 800px;
        font-size: 41px;

        min-height: 110px;
    }

    .headlineContent {
        font-weight: 400px;
        font-size: 26px;

        min-height: 200px;
    }

    .headlineSrc {
        font-weight: 300px;
        font-size: 16px;

        min-height: 150px;
    }

    .headlineUrl {
        font-weight: 200px;
        font-size: 20px;

        color: blue;
    }
</style>
