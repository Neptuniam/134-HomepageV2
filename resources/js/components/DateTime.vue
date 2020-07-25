<template>
<div class="clock textBody clickable noselect" @click="changeTZ" :uk-tooltip="tooltip()">
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
    data() {
        return {
            utcTime: false,

            time: null,
            date: null,
            months: ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'],
        }
    },
    methods: {
        updateTime() {
            var cd = new Date();

            // If the user has clicked the time, convert TO UTC
            if (this.utcTime)
                cd = new Date(cd.toISOString().replace("Z",""))

            this.time = `${this.convert24To12(cd.getHours())}:${this.zeroPadding(cd.getMinutes(), 2)}:${this.zeroPadding(cd.getSeconds(), 2)} ${cd.getHours() < 12 ? 'am' : 'pm'}`
            this.date = `${this.months[cd.getMonth()]} ${this.zeroPadding(cd.getDate(), 2)}, ${this.zeroPadding(cd.getFullYear(), 4)}`
        },

        changeTZ() {
            this.utcTime = !this.utcTime

            this.updateTime()
        },

        convert24To12(num) {
            return num > 12 ? num-12 : num
        },

        zeroPadding(num, digit) {
            var zero = '';
            for (var i = 0; i < digit; i++)
                zero += '0';
            return (zero + num).slice(-digit);
        },

        tooltip() {
            return `Showing time in <i>${this.utcTime ? 'UTC' : 'Local'} Time </i>.<br>Click to switch.`
        },
    },
    created() {
        this.updateTime();
        setInterval(this.updateTime, 1000);
    },
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

    /* div {
        padding: 0;
    } */
</style>
