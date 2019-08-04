<template>
    <div class="row fullWidth">
        <textarea class="col-xs noteBody textbody fullWidth" :value="$parent.currentNote.body" @input="updateNote"></textarea>

        <div class="col-xs noteBody textBody fullWidth" v-html="compiledMarkdown"></div>
    </div>


    <!-- <div class="noteBody textBody fullWidth" contenteditable="true" @input="updateNote($event, 'body')"></div> -->
    <!-- <div @input="updateNote($event, 'body')" v-html="currentNote.body" ref="body" class="noteBody textBody fullWidth" contenteditable="true" /> -->
    <!-- <div id="editor">
        <textarea :value="input" @input="update"></textarea>
        <div v-html="compiledMarkdown"></div>
    </div> -->
</template>

<script>
import Notes from './NotesDisplay'
export default {
    extends: Notes,
    props: ['content'],
    data: function() {
        return {
            input: '# hello'
        }
    },
    computed: {
        compiledMarkdown: function () {
            return marked(this.$parent.currentNote.body, { sanitize: true })
        },
    },
    // methods: {
    //     update: _.debounce(function (e) {
    //         this.input = e.target.value
    //     }, 300)
    // }
    methods: {
        updateNote(e) {
            if (!(e && e.target.value))
                return

            console.log(e);

            this.$parent.currentNote.body = event.target.value
            // this.$emit('update',event.target.value);

            this.debounce(e)
        },

        update:function(e){
            // this.input = e.target.value
            this.$emit('update', e.target.innerText);
        }
    },
}
</script>

<style scoped>

</style>
