<template>
<div v-if="fileType" class="row center-xs middle-xs nospacing fullScreen FilePreviewer"
     :class="{fullScreen: fullScreen, preview: !fullScreen}" @click="togglePreview" id="Previewer">
    <img v-if="fileType === 'img'" :src="getPath(file)" alt="Image Preview">

    <video v-else-if="fileType === 'vid'" :src="getPath(file)" autoplay muted></video>

    <div v-else-if="fileType === 'str' && text" v-html="text" class="textDisplay" id="scrollSpace" />

    <div v-else-if="fileType === 'text' && text" class="textDisplay">
        <textarea id="scrollSpace" readonly v-html="text"></textarea>
    </div>

    <embed v-else-if="fileType === 'pdf'" :src="getPath(file)" :type="'application/'+fileType">


    <a v-if="fullScreen" class="uk-icon-button closeButton" uk-icon="close" uk-tooltip="Close" id="close" />
</div>
</template>

<script>
export default {
    // props: ['file'],
    data() {
        return {
            file: null,
            type: null,
            fullScreen: false,
            text: null
        }
    },
    computed: {
        fileType() {
            if (!this.file)
                return null

            if (this.file.length > 100) {
                this.text = this.file
                this.fullScreen = true

                return 'str'
            }

            switch (this.file.split('.').pop().toLowerCase()) {
                case "png":
                case "jpg":
                case "jpeg":
                    return 'img'
                case "mp4":
                    return 'vid'
                case "pdf":
                    return 'pdf'
                case "gz":
                case "tar":
                case "zip":
                    console.log({
                        message: 'Cannot preview compressed files!',
                        status: 'warning'
                    })
                    return "Compressed (Cannot Preview)"
                default:
                    this.readFile(this.file)
                    return 'text'
            }
        },
    },
    methods: {
        readFile(file) {
            this.text = null
            fetch(file).then(response => response.text()).then(text => this.text = text )
        },

        hidePreview(event) {
            if (event.target.id == 'action') {
                event.target.onclick(this)
            }

            // Only hide if the user didn't click the text area to allow for highlighting
            if (!this.text || event.target.id == 'Previewer' || event.target.parentNode.id == 'close') {
                this.fullScreen = false
                this.file = null
            }
        },
        togglePreview(event) {
            // If in fullscreen mode, we need to check the click zone before closing
            if (this.fullScreen) {
                this.hidePreview(event)
            } else {
                this.fullScreen = true
            }
        },

        getPath(src) {
            if (util.imageExists(src))
                return util.noCachePath(src)

            UIkit.notification({
                message: `<span uk-icon="close"></span>Path: ${src} could not be found!`,
                status: 'danger'
            })
        },
    },

    mounted() {
        this.$bus.$on('showPreview', toPreview => {
            this.file = toPreview
        })
    },
}
</script>

<style scoped>
    .FilePreviewer {
        max-height: 100%;
        max-width: auto;
    }

    textarea {
        resize: none !important;
    }

    .fullScreen {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh !important;
        width: 100vw !important;
        z-index: 1;

        overflow: auto;

        background-color: rgba(0, 0, 0, 0.95);
    }

    .fullScreen img, .fullScreen video {
        max-height: 80vh;
        width:  auto;
        z-index: 1;
    }
    .fullScreen textarea, .fullScreen embed {
        height: 80vh;
        width:  80vw;
        max-width: 1500px;
        z-index: 1;
    }
    .fullScreen textarea {
        font-size: 16px;

        padding: 10px;
        cursor: pointer;
    }
    .fullScreen .textDisplay {
        color: white !important;
    }

    .closeButton {
        position: fixed;
        top: 25px;
        right: 25px;

        z-index: 2;
    }
</style>
