<template>
<div class="Widget" id="NewsDisplay">
    <div v-if="categorys && categorys.length" class="row middle-xs fullWidth CategoryRow onHover">
        <div class="col-xs">
            <a v-if="catIndex > 0" @click="changeCat(-1)" class="uk-icon previousIcon" uk-icon="chevron-left" />
        </div>

        <div class="limitReadable Cateogory col-xs center-xs nomargin">
            {{categorys[catIndex].title}}
        </div>

        <div class="col-xs">
            <a v-if="catIndex < categorys.length-1" @click="changeCat(1)" class="uk-icon nextIcon" uk-icon="chevron-right" />
        </div>
    </div>

    <div v-if="news && news.length" class="row top-xs fullWidth headlineRow">
        <div class="col-xs-1">
            <a v-if="index > 0" @click="index--" class="uk-icon previousIcon onHover"
               uk-icon="icon: chevron-left; ratio: 2" uk-tooltip="Previous Article" />
        </div>

        <a class="News col-xs center-xs nomargin" :href="news[index].webUrl" target="_blank">
            {{news[index].webTitle}}
        </a>

        <div class="col-xs-1">
            <a v-if="index < news.length-1" @click="index++" class="uk-icon nextIcon onHover"
               uk-icon="icon: chevron-right; ratio: 2" uk-tooltip="Next Article" />
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    props: ['widget'],

    data() {
        return {
            index: 0,
            catIndex: 0
        }
    },
    computed: {
        ...mapGetters('settings', {
            categorys: 'getCategorys',
            news: 'getNews'
        })
    },

    methods: {
        changeCat(offset) {
            this.catIndex += offset

            this.fetchNews(this.categorys[this.catIndex].title).then(() => {
                this.index = 0
            })
        },

        ...mapActions('settings', {
            fetchCategorys: 'fetchCategorys',
            fetchNews: 'fetchNews',
        })
    },

    mounted() {
        this.fetchCategorys().then(() => {
            this.fetchNews(this.categorys[0].title).then(() => {
                this.index = Math.floor(Math.random() * this.news.length)
            })
        })

        if (this.widget && this.widget.interval) {
            var firstIndex = this.index

            setInterval(() => {
                this.index++

                if (this.index >= this.news.length) {
                    this.index = 0
                } else if (this.index == firstIndex) {
                    this.catIndex++

                    if (this.catIndex >= this.categorys.length)
                        this.catIndex = 0
                    this.index == 0
                    firstIndex = 0
                }
            }, this.widget.interval * 60000)
        }
    },
}
</script>

<style scoped>
    .News {
        font-weight: 600px;
        font-size: 3.5vh;
        text-align: center;
    }
    a {
        color: black;
    }

    .CategoryRow {
        max-width: 15vw;
        margin: auto;
    }
    .Cateogory {
        font-size: 2vh;
        font-weight: 500;
    }

    .limitReadable {
        /* max-width: 80vw; */
    }
    .col-xs-1 {
        max-width: 50px;
    }

    #NewsDisplay .onHover{
        display: none;
    }

    #NewsDisplay:hover .onHover{
        display: flex;
    }
</style>
