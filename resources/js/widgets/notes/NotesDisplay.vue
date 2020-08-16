<template>
<div class="row start-xs NotesDisplay">
    <div class="col-xs-2 scrollSpace savedNotes">
        <div v-for="(note, index) in notes">
            <hr>

            <div :class="{'activeNote': note.id === currentNote.id}" class="savedNote">
                <p @click="changeNotes(note)" class="textBody uk-text-truncate nomargin clickable">
                    {{note && note.body ? note.body.replace(/#/g, "").split('  ')[0] : ''}}
                </p>

                <div v-if="note.id === currentNote.id" class="controlButtons">
                    <div class="updatedAt">
                        <!-- {{findAuthorName(note)}} -  -->
                        {{note.updated_at.split(' ')[0].replace(/-/g, ' / ')}}
                    </div>

                    <div class="row start-xs bottom-xs">
                        <button v-if="mode == 'edit'" class="col-xs uk-button uk-button-text uk-text-capitalize" @click="toggleMark">
                            <span uk-icon="icon: code; ratio: 0.8" /> {{showMark ? 'Hide ' : 'Show '}} Mark
                        </button>
                        <button v-else class="col-xs uk-button uk-button-text uk-text-capitalize" @click="changeNotes(note)">
                            <span uk-icon="icon: pencil; ratio: 0.8" /> Edit
                        </button>

                        <button class="col-xs uk-button uk-button-text uk-text-capitalize" @click="startDelete(note)">
                            <span uk-icon="icon: trash; ratio: 0.8" /> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row center-xs newButton">
            <button class="col-xs-9 uk-button-default uk-icon-button" @click="changeNotes({id: null, body: ''})">
                <span uk-icon="icon: plus; ratio: 0.9"></span> New Note
            </button>
        </div>
    </div>

    <div class="col-xs row scrollSpace NoteEditor nomargin">
        <template v-if="mode === 'edit'">
            <textarea @input="debounce" v-model="currentNote.body" class="col-xs noteBody textBody fullWidth"></textarea>
            <hr v-if="showMark" class="uk-divider-vertical secondHR">
        </template>

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
            Swal.fire({
				position: 'top',

				title: 'Are you sure you want to delete this note?',
				text: 'This can\'t be undone!',
				icon: 'warning',

				showCancelButton: true,
				confirmButtonColor: '#f0506e',
				confirmButtonText: 'Yes, delete!',
				cancelButtonColor: '#222',
				cancelButtonText: 'No, cancel'
			}).then(res => {
                if (res.value) {
                    this.deleteNote(note).then(() => {
                        this.currentNote = this.notes[0]
                    })
                }
            })
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
    width: 100vw;

    background-color: #2A47BC;
    opacity: 80%;
}

.scrollSpace {
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
}

.NotesDisplay .uk-divider-vertical {
    height: 100vh;
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
    min-width: 250px;
    max-width: 250px;
}

.savedNotes {
    font-size: 20px;
    font-weight: 600;
    color: #BBC3D5;

    overflow-x: hidden;

    padding-top: 80px !important;

    position: relative;
}

.savedNote {
    padding: 10px 5px;
    margin: 0;
}

.savedNote:hover {
    background-color: rgba(200, 200, 200, 0.15);
}

.activeNote {
    color: #F0F0F2 !important;
    font-size: 22px;

    background-color: rgba(200, 200, 200, 0.25);
}

.controlButtons, .controlButtons button {
    color: #F0F0F2 !important;
    font-size: 16px;
    font-weight: 500;
}

.controlButtons button {
    margin: 15px 0px 0px;
}

.savedNotes hr {
    margin: 0;
}

.newButton {
    position: absolute;
    bottom: 10px;

    width: 100%;
}
.newButton button {
    font-size: 16px;
    color: white !important;
}
.newButton span {
    margin-right: 5px;
}

.NoteEditor, .noteBody {
    font-size: 22px !important;
    font-weight: 350 !important;
    color: black !important;
}
.NoteEditor {
    border-radius: 30px 0px 0px 30px;
    background-color: #F0F0F2;
    opacity: 80%;

    padding: 20px 30px;

}
.noteBody {
    border-width: 0px;
    /* background-color: #F0F0F2 !important; */
}

textarea:focus {
    /* background-color: rgba(0,0,0,0); */
}

.noteBody h1, .noteBody h2, .noteBody h3, .noteBody h4, .noteBody h5, .noteBody h6, .noteBody ul {
    color: black !important;
}
.noteBody p {
    margin: 0 !important;
}
.noteBody li {
    margin-bottom: 10px;
}
.noteBody li li {
    margin-bottom: 0px !important;
}
</style>
