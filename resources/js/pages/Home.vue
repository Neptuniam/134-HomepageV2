<template>
<div v-if="activeUser && location && widgets" class="row center-xs middle-xs nomargin Home">
    <Idle v-if="showIdle" />

    <div v-show="!showIdle" class="col-xs-10">
        <Weather v-if="isActive('Weather')" />

        <Maps v-if="isActive('Maps')" />
        <hr v-if="isActive('Maps') && (isActive('News') || isActive('QOTD')) ">

        <News v-if="isActive('News')" />
        <hr v-if="isActive('News') && isActive('QOTD')">

        <QOTD v-if="isActive('QOTD')" class="" />

        <Favourites v-if="isActive('Favourites')" />
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            timer: null,
            showIdle: false
        }
    },
    computed: {
        ...mapGetters('settings', {
            activeUser: 'getUser',
            location:   'getLocation',
            widgets:    'getWidgets'
        })
    },
    methods: {
        isActive(title) {
            let found = this.widgets.find(widget => widget.title == title)
            return found && found.status == 1
        },

        setTimer() {
            this.showIdle = false
            clearTimeout(this.timer)
            this.timer = setTimeout(() => this.showIdle = true, 60000)
        }
    },

    mounted() {
        // Show a simple idle screen once the user hasn't been active for a min
        this.setTimer()
        document.addEventListener('mousemove', () => this.setTimer())
    },
    destroyed() {
        clearTimeout(this.timer)
    },
}
</script>

<style>
    .Home {
        position: fixed;
        top: 10vh;

        width: 100vw !important;
    }

    .Widget {
        padding: 5px 20px;
    }
    .Widget:hover {
        /* border: 1.5px solid grey; */
        border-radius: 5px;
        background: rgba(230, 230, 250, 0.85);
    }

    .Home>.col-xs-10>hr {
        width: 600px;
        margin: 10px auto;
    }
</style>
