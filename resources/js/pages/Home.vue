<template>
<!-- <div v-if="activeWidgets" class="row center-xs middle-xs nomargin Home">
    <div class="col-xs-8">
        <div v-for="widget in activeWidgets">
            <component :is="widget.title" :widget="widget" />
        </div>
    </div>
</div> -->
<div v-if="widgets" class="row center-xs middle-xs nomargin Home">
    <div class="col-xs-10">
        <Weather v-if="isActive('Weather')" />

        <Maps v-if="isActive('Maps')" />
        <hr v-if="isActive('Maps')" style="width: 600px; margin: 10px auto;">
        <News v-if="isActive('News')" />
        <hr v-if="isActive('News')" style="width: 600px; margin: 10px auto;">
        <QOTD v-if="isActive('QOTD')" class="" />

        <Favourites v-if="isActive('Favourites')" />
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        // activeWidgets() {
        //     if (this.widgets)
        //         return this.widgets.filter(widget => widget.status == 1 && !(widget.title === 'Notes' || widget.title === 'Trello' || widget.title === 'Background'))
        // },

        ...mapGetters('settings', {
            widgets: 'getWidgets'
        })
    },
    methods: {
        isActive(title) {
            let found = this.widgets.find(widget => widget.title == title)
            return found && found.status == 1
        }
    },
}
</script>

<style>
    .Home {
        width: 100vw !important;

        position: fixed;
        top: 10vh;
    }

    .Widget {
        padding: 5px 20px;
    }
    .Widget:hover {
        /* border: 1.5px solid grey; */
        border-radius: 5px;
        background: rgba(230, 230, 250, 0.85);
    }
</style>
