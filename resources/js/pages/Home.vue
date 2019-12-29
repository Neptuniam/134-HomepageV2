<template>
<div v-if="activeWidgets" class="row center-xs middle-xs nomargin Home">
    <div class="col-xs-8">
        <div v-for="widget in activeWidgets" v-show="activePage === 'home'" class="Widget">
            <component :is="widget.title" :widget="widget" />
        </div>

        <!-- <News v-if="$parent.newsStatus.status" ref="News"  /> -->
    </div>
    <Notes v-if="$parent.notesStatus.status" ref="Notes" />
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        activeWidgets: function() {
            if (this.widgets)
                return this.widgets.filter(widget => widget.status == 1 && !(widget.title === 'Notes'))
        },

        ...mapGetters('settings', {
            activePage: 'getActivePage',
            widgets: 'getWidgets'
        })
    },
}
</script>

<style>
    .Home {
        width: 100vw !important;
    }

    .Widget:hover {
        /* border: 1px solid grey; */
        border-radius: 5px;
        background: rgba(200,200,200,0.75);
    }
</style>
