<template>
<div class="row center-xs middle-xs nomargin">
    <div class="col-xs-8">
        <div v-for="widget in activeWidgets">
            <component :is="widget.title" />
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
                return this.widgets.filter(widget => widget.status == 1 && !(widget.title === 'News' || widget.title === 'Notes'))
        },

        ...mapGetters('settings', {
            activePage: 'getActivePage',
            widgets: 'getWidgets'
        })
    },
}
</script>

<style scoped>
</style>
