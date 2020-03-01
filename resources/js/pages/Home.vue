<template>
<div v-if="activeWidgets" class="row center-xs middle-xs nomargin Home">
    <div class="col-xs-8">
        <div v-for="widget in activeWidgets">
            <component :is="widget.title" :widget="widget" />
        </div>
    </div>
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

    .Widget {
        padding: 5px 20px;
    }
    .Widget:hover {
        /* border: 1.5px solid grey; */
        border-radius: 5px;
        background: rgba(230, 230, 250, 0.85);
    }
</style>
