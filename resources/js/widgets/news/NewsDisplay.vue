<template>
<div class="row center-xs News">
    <a v-if="news" class="Widget limitReadable" :href="news.url" target="_blank">
        {{news.title}}
    </a>
</div>
</template>

<script>
export default {
    props: ['widget'],
    data() {
        return {
            news: null,
        }
    },
    methods: {
        getNews() {
            let query = "https://newsapi.org/v2/top-headlines?country=ca&category=general&apiKey=2b056b1596eb4356a56510c4e19da2b7"
            this.axios.get(query).then(news => {
                this.news = news.data.articles[0]

                console.log('%c News ', 'background: #222; color: #bada55');
                console.log(news.data.articles);
            })
        },
    },
    mounted() {
        this.getNews()
        if (this.widget && this.widget.interval)
            setInterval(this.getNews(), this.widget.interval * 60000)
    },
}
</script>

<style scoped>
    .News {
        font-weight: 600px;
        font-size: 3.5vh;

        /* padding: 5px 20px; */
    }
    a {
        color: black;
    }
    .limitReadable {
        max-width: 1000px;
    }
</style>
