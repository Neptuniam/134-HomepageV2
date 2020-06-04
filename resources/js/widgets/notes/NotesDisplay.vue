<template>
<div class="row center-xs NotesDisplay">
    <div class="col-xs-2 scrollSpace savedNotes">
        <div v-for="(note, index) in notes">
            <p @click="changeNotes(note)" class="textBody uk-text-truncate savedNote nomargin clickable">
                {{note && note.body ? note.body.replace(/#/g, "").split('  ')[0] : ''}}
            </p>

            <div v-if="note.id === currentNote.id" class="controlButtons">
                <div class="row center-xs">
                    <button v-if="mode == 'edit'" @click="toggleMark" type="button" class="col-xs uk-button uk-button-text uk-text-capitalize">
                        {{showMark ? 'Hide ' : 'Show '}} Mark
                    </button>

                    <button @click="startDelete(note)" type="button" class="col-xs uk-button uk-button-text uk-text-capitalize">
                        Delete Note
                    </button>
                </div>

                <div class="center-xs updatedAt">
                    {{findAuthorName(note)}} - {{note.updated_at.split(' ')[0].replace(/-/g, '/')}}
                </div>
            </div>

            <hr v-if="index < notes.length-1">
        </div>

        <div class="row center-xs">
            <button @click="changeNotes({id: null, body: ''})" type="button" class="col-xs-8 uk-button-default uk-icon-button newButton" uk-icon="plus" />
        </div>
    </div>

    <div class="col-xs row fullWidth scrollSpace">
        <hr class="uk-divider-vertical">

        <textarea v-if="mode === 'edit'" @input="debounce" v-model="currentNote.body" class="col-xs noteBody textBody fullWidth"></textarea>
        <hr v-if="mode === 'edit' && showMark" class="uk-divider-vertical secondHR">

        <div v-if="showMark || mode === 'view'" class="col-xs noteBody textBody fullWidth" v-html="compiledMarkdown"></div>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            mode: 'view',
            showMark: false,
            currentNote: {id: null, body: ''},
            body_timeout: null,
        }
    },
    computed: {
        compiledMarkdown () {
            return marked(this.currentNote.body, { sanitize: true })
        },

        ...mapGetters('settings', {
            activePage: 'getActivePage',
            users:      'getUsers',
            notes:      'getNotes',
        })
    },
    methods: {
        findAuthor(note) {
            return this.users.find(user => user.id === note.author_id)
        },
        findAuthorName(note) {
            let author = this.findAuthor(note)
            if (author)
                return author.name
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

            // If you have hit the current note, toggle modes instead of changing notes
            if (note.id == this.currentNote.id) {
                this.toggleMode()
            } else {
                this.currentNote = {...note}

                // If it's a new note it should be defaulted to edit mode
                this.mode = !note.id ? 'edit' : 'view'
                this.showMark = false
            }
        },

        saveNote() {
            this.backupNote(this.currentNote).then(response => {
                UIkit.notification("Changes Saved", {status:'success'})

                this.fetchNotes().then(notes => {
                    // Take the new id on new notes to avoid continuesly creating notes
                    if (!this.currentNote.id)
                        this.currentNote.id = this.notes[this.notes.length-1].id
                })


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

        ...mapActions('settings', {
            fetchNotes: 'fetchNotes',
            backupNote: 'updateNote',
            deleteNote: 'deleteNote',
        })
    },
    async mounted() {
        await this.fetchNotes()

        if (this.notes.length)
            this.currentNote = this.notes[0]
    },
}
</script>

<style>
.NotesDisplay {
    width: 90vw;

    color: rgb(245, 245, 245) !important;
    background-color: rgba(75, 75, 75, 0.75);

    border-radius: 10px;
    /* margin-bottom: 40px; */
}

.scrollSpace {
    height: 80vh;
    overflow: auto;
}

.NotesDisplay .uk-divider-vertical {
    height: 80vh;
    margin: 0 !important;
    position: absolute;
}
.NotesDisplay hr {
    border-top: 1px solid #959595;
}

.NotesDisplay .secondHR {
    right: 43vw;
}

.NotesDisplay .col-xs-2 {
    padding: 0px;
    min-width: 230px;
    max-width: 230px;
}

.savedNotes {
    text-align: left;
    font-weight: 600px;
    font-size: 20px;

    overflow-x: hidden;
}

.savedNote {
    padding: 10px 0;
    margin: 0;
}

.savedNote:hover {
    background-color: rgba(150, 150, 150, 0.5);
}

.savedNotes button {
    color: rgb(245, 245, 245) !important;
    margin: 20px 0;
}

.savedNotes hr {
    margin: 0;
}

.controlButtons {
    padding: 0 10px;
}

.controlButtons button {
    margin: 5px;
    max-width: 50%;
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
    /* color: rgb(225, 225, 225) !important; */

    background-color: rgba(0, 0, 0, 0);
    border-width: 0px;

    padding: 5px;
    margin: 0 10px;
}

textarea:focus {
    /* background-color: rgba(0,0,0,0); */
}

.noteBody h1, .noteBody h2, .noteBody h3, .noteBody h4, .noteBody h5, .noteBody h6, .noteBody ul {
    color: rgb(225, 225, 225) !important;
}
</style>
