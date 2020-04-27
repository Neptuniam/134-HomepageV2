<template>
<!-- <div v-if="activeWidgets" class="row center-xs middle-xs nomargin Home">
    <div class="col-xs-8">
        <div v-for="widget in activeWidgets">
            <component :is="widget.title" :widget="widget" />
        </div>
    </div>
</div> -->
<div v-if="activeWidgets" class="row center-xs middle-xs nomargin Home">
    <div class="col-xs-10">
        <Weather v-if="isActive('Weather')" />

        <Maps v-if="isActive('Maps')" />
        <hr style="width: 600px; margin: auto;">
        <News v-if="isActive('News')" />

        <!-- <div class="row fullWidth">
            <div class="col-xs card start-xs">
                <b class="start-xs">News</b>: <br>
                <News v-if="isActive('News')" />
            </div>

            <Maps v-if="isActive('Maps')" class="col-xs" style="max-width: 400px !important;" />

            <div class="col-xs card start-xs">
                <b class="start-xs">Quote</b>: <br>
                <QOTD v-if="isActive('QOTD')" class="" />
            </div>
        </div> -->

        <Favourites v-if="isActive('Favourites')" />
        <QOTD v-if="isActive('QOTD')" class="" />
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        activeWidgets() {
            if (this.widgets)
                return this.widgets.filter(widget => widget.status == 1 && !(widget.title === 'Notes' || widget.title === 'Trello' || widget.title === 'Background'))
        },

        ...mapGetters('settings', {
            // activePage: 'getActivePage',
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
