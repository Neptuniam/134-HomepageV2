<template>
<div class="clock textBody">
    <div class="time">
        {{time}}
    </div>
    <div class="date">
        {{date}}
    </div>
</div>
</template>

<script>
export default {
    data: function() {
        return {
            time: null,
            date: null,
            months: ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'],
        }
    },
    methods: {
        updateTime() {
            var cd = new Date();
            this.time = this.convert24To12(cd.getHours()) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2)
            this.time += cd.getHours < 12 ? ' am' : ' pm'
            this.date = this.months[cd.getMonth()] + ' ' + this.zeroPadding(cd.getDate(), 2) + ', ' + this.zeroPadding(cd.getFullYear(), 4)
        },

        convert24To12(num) {
            return num > 12 ? num -12 : num
        },

        zeroPadding(num, digit) {
            var zero = '';
            for (var i = 0; i < digit; i++)
                zero += '0';
            return (zero + num).slice(-digit);
        },
    },
    created: function() {
        var timerID = setInterval(this.updateTime, 1000);
        this.updateTime();
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
