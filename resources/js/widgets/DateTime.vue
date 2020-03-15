<template>
<div class="clock textBody uk-link-toggle clickable" @click="changeTZ">
    <a class="time uk-link-heading">
        {{time}}
    </a>
    <br>
    <a class="date uk-link-heading">
        {{date}}
    </a>

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
    },
    created() {
        this.updateTime();
        setInterval(this.updateTime, 1000);
    },
}
</script>

<style scoped>
    .clock {
        position: absolute;
        top: 0px;
        right: 10px;
    }

    .time {
        font-size: 1.7rem;
    }

    .date {
        font-size: 1.2rem;
    }

    div {
        padding: 0;
    }
</style>
