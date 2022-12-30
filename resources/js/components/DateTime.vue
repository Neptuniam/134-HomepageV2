<template>
<div class="textBody clickable noselect" :class="componentClass" @click="changeTZ" :uk-tooltip="tooltip()">
    <div class="time clickable">
        {{time}}
    </div>
    <div class="date clickable">
        {{date}}
    </div>

    <div v-if="utcTime">
        UTC Time
    </div>
</div>
</template>

<script>
export default {
    props: {
        componentClass: {
            type: String,
            default: 'clock'
        }
    },

    data() {
        return {
            utcTime: false,

            time: null,
            date: null,
        }
    },

    methods: {
        updateTime() {
            var cd = new Date();

            // If the user has clicked the time, convert TO UTC
            if (this.utcTime)
                cd = new Date(cd.toISOString().replace("Z",""))

            this.time = util.createTime(cd)
            this.date = util.createDisplayDate(cd)
        },

        changeTZ() {
            this.utcTime = !this.utcTime

            this.updateTime()
        },

        tooltip() {
            return `<i>${this.utcTime ? 'UTC' : 'Local'} Time</i>.<br>Click to switch.`
        },
    },

    created() {
        this.updateTime();
        setInterval(this.updateTime, 1000);
    }
}
</script>

<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Orbitron&display=swap'); */

    .clock {
        position: absolute;
        top: 0px;
        right: 10px;
    }
    .clock:hover {
        color: white;
    }



    .time {
        /* font-family: 'Orbitron', sans-serif !important; */
        font-size: 1.7rem;
    }

    .date {
        font-size: 1.2rem;
    }

    .center-idle .time {
        font-size: 4rem !important
    }
    .center-idle .date {
        font-size: 2.5rem !important;
    }
    /* div {
        padding: 0;
    } */
</style>
