<template>
<div v-if="news" class="row center-xs News">
    <a class="Widget" :href="news[index].url" target="_blank">
        {{news[index].title}}
    </a>
</div>
</template>

<script>
export default {
    props: ['widget'],
    data() {
        return {
            news: null,
            index: 0,
            categorys: ['general', 'technology', 'sports', 'science', 'entertainment'],
            activeCat: 'general'
        }
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

        onKeyPress () {
            if (event.keyCode == 37 && this.index > 0) {
                this.index--
            } else if (event.keyCode == 39 && this.index < 19) {
                this.index++
            }
        },
    },
    mounted() {
        document.addEventListener("keyup", this.onKeyPress);

        this.getNews()
        if (this.widget && this.widget.interval)
            setInterval(this.getNews(), this.widget.interval * 60000)
    },
}
</script>

<style scoped>
    .NewsDisplay {
        margin-top: 30px;
        height: 650px;
    }

    .News {
        font-weight: 600px;
        font-size: 3.5vh;

        padding: 5px 20px;
    }
    .News a {
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
        font-size: 30px;

        min-height: 110px;
    }

    .headlineContent {
        font-weight: 400px;
        font-size: 25px;

        min-height: 200px;
    }

    .headlineSrc {
        font-weight: 300px;
        font-size: 20px;

        min-height: 150px;
    }

    .headlineUrl {
        font-weight: 200px;
        font-size: 20px;

        color: blue;
    }
</style>
