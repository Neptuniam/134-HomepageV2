<template>
<div v-if="activeWidgets" class="row center-xs middle-xs nomargin fullWidth">
    <div class="col-xs-8">
        <div v-for="widget in activeWidgets" v-show="activePage === 'home'">
            <component :is="widget.title" />
        </div>

        <News  v-if="$parent.newsStatus.status"  ref="News"  />
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
