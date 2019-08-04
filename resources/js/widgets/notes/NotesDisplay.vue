<template>
<div v-if="activePage === 'notes'" class="row center-xs NotesDisplay fullWidth">
    <div class="col-xs-2 savedNotes">
        <div v-for="(note, index) in notes">
            <p @click="changeNotes(note)" class="textBody uk-text-truncate savedNote nomargin clickable">
                {{note.body}}
            </p>

            <div v-if="note.id === currentNote.id" class="row center-xs controlButtons">
                <button @click="toggleMode()" type="button" class="col-xs uk-button-default fullWidth uk-icon-button clickable">
                    {{mode === 'view' ? 'Edit' : 'View'}}
                </button>

                <button v-if="mode === 'edit'" @click="toggleMark()" type="button" class="col-xs uk-button-default fullWidth uk-icon-button clickable">
                    {{showMark ? 'Hide ' : 'Show '}} Mark
                </button>

                <button v-if="mode === 'edit'" @click="startDelete(note)" type="button" class="col-xs uk-button-default fullWidth uk-icon-button clickable">
                    Delete Note
                </button>

                <div class="fullWidth updatedAt">
                    {{findAuthor(note).name}} - {{note.updated_at.split(' ')[0]}}
                </div>
            </div>

            <hr v-if="index < notes.length-1">
        </div>

        <button @click="changeNotes({id: null, body: ''})" type="button" class="uk-button-default fullWidth uk-icon-button" uk-icon="plus" />
    </div>

    <div class="col-xs-9">
        <div class="row fullWidth">
            <textarea v-if="mode === 'edit'" :value="currentNote.body" @input="updateNote"
                      class="col-xs noteBody textBody fullWidth">
            </textarea>

            <div v-if="showMark || mode === 'view'" class="col-xs noteBody textBody fullWidth" v-html="compiledMarkdown">
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data: function() {
        return {
            mode: 'view',
            showMark: true,
            currentNote: {id: null, body: ''},
            body_timeout: null,
        }
    },
    computed: {
        compiledMarkdown: function () {
            return marked(this.currentNote.body, { sanitize: true })
        },

        ...mapGetters('settings', {
            users: 'getUsers',
            activePage: 'getActivePage',
            notes: 'getNotes',
        })
    },
    methods: {
        findAuthor(note) {
            return this.users.find(user => user.id === note.author_id)
        },

        startDelete(note) {
            if (confirm('Are you sure you want to delete this note?')) {
                this.deleteNote(note).then(() => {
                    this.currentNote = this.notes[0]
                })
            }
        },

        toggleMode() {
            // Save changes when leaving edit mode
            if (this.body_timeout && this.mode === 'edit')
                this.saveNote()

            this.mode = this.mode === 'view' ? 'edit' : 'view'
        },
        toggleMark() {
            // If we're in view mode something must be shown
            if (this.mode === 'view')
                return

            this.showMark = !this.showMark
        },

        changeNotes(note) {
            // Save changes before switching notes
            if (this.body_timeout && this.mode === 'edit')
                this.saveNote()

            this.currentNote = {...note}

            // If it's a new note it should be defaulted to edit mode
            this.mode = note.id === null ? 'edit' : 'view'
            this.showMark = true
        },

        saveNote() {
            console.log('saving');
            console.log(this.currentNote)

            this.backupNote(this.currentNote).then(response => {
                UIkit.notification("Changes Saved", {status:'success'})

                clearTimeout(this.body_timeout)
                this.body_timeout = null
            })
        },

        debounce() {
            if (this.body_timeout)
                clearTimeout(this.body_timeout)

            var _this = this;

            this.body_timeout = setTimeout(function() {
                _this.saveNote()
            }, 2500);
        },

        updateNote(e) {
            if (!(e && e.target.value))
                return

            this.currentNote.body = e.target.value
            this.debounce()
        },

        ...mapActions('settings', {
            fetchNotes: 'fetchNotes',
            backupNote: 'updateNote',
            deleteNote: 'deleteNote',
        })
    },
    mounted: function() {
        this.fetchNotes().then(() => {
            if (this.notes.length)
                this.currentNote = this.notes[0]
        })
    },
}
</script>

<style>
.NotesDisplay {
    height: 80vh;
    color: rgb(245, 245, 245) !important;
}

.savedNotes {
    text-align: left;
    font-weight: 600px;
    font-size: 20px;

    background-color: rgba(75, 75, 75, 0.75);
    border-radius: 10px;
    height: 80vh;
}

.savedNote {
    padding: 20px 0;
    margin: 0;
}

.savedNote:hover {
    background-color: rgba(150, 150, 150, 0.5);
}

.savedNotes hr {
    margin: 0;
}

.savedNotes button {
    color: rgb(245, 245, 245);
    margin: 20px 0;
}

.controlButtons button {
    margin: 5px;
}

.controlButtons .updatedAt {
    font-weight: 300px;
    font-size: 15px;
    margin: 5px 0;
}


.noteBody {
    font-weight: 350px;
    font-size: 20px;
    text-align: left;

    height: 80vh;

    background-color: rgba(75, 75, 75, 0.75);
    border-radius: 10px;
    color: rgb(225, 225, 225) !important;
    padding: 5px;
    margin: 0 10px;
}

.noteBody h1, .noteBody h2, .noteBody h3, .noteBody h4, .noteBody h5, .noteBody h6, .noteBody ul {
    color: rgb(225, 225, 225) !important;
}
</style>
