<template>
<a v-if="news && news.length" class="Widget limitReadable News" :href="news[0].url" target="_blank">
    {{news[0].title}}
</a>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    props: ['widget'],
    computed: {
        ...mapGetters('settings', {
            news: 'getNews'
        })
    },

    methods: {
        ...mapActions('settings', {
            fetchNews: 'fetchNews',
        })
    },

    mounted() {
        this.fetchNews('technology')
        if (this.widget && this.widget.interval)
            setInterval(this.fetchNews('technology'), this.widget.interval * 60000)
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
    .limitReadable {
        max-width: 1000px;
    }
</style>
