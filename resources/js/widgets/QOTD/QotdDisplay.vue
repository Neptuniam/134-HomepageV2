<template>
<div v-if="quote" class="row center-xs">
    <div class="qotd Widget">
        {{ quote }}
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            quote: null
        }
    },

    mounted() {
        this.axios.get("https://quotes.rest/qod").then(response => {
            console.log('%c Qoute of the Day', 'background: #222; color: #bada55');
            console.log(response.data.contents.quotes);

            this.quote = response.data.contents.quotes[0].quote + " -" +response.data.contents.quotes[0].author
        })
    },
}
</script>

<style scoped>
    .qotd {
        /* position: fixed;
        top: 0px;
        left: 0px;

        width: 100%; */

        font-weight: 400;
        font-size: 2.5vh;
        max-width: 1000px;
    }
</style>
