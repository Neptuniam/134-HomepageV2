<template>
<div class="uk-inline textBody clickable noselect" :class="componentClass">
    <button type="button">
        <div class="time clickable">
            {{time}}
        </div>
        <div class="date clickable">
            {{date}}
        </div>
    </button>
    <div uk-dropdown="mode: click">
        <div class="timezone fullWidth">
            <span>
                UTC:
            </span>

            <span>
                {{ toUTC() }}
            </span>
        </div>

        <hr v-if="!!timezones && !!timezones.length">

        <div v-for="timezone in timezones" class="timezone fullWidth">
            <span>
                {{ timezone.title }}:
            </span>
            
            <span>
                {{ toTimezone(timezone.value) }}
            </span>
        </div>
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
            time: null,
            date: null,

            timezones: [
                {
                    title: 'Toronto',
                    value: 'America/Toronto'
                },
                {
                    title: 'Newfies',
                    value: 'America/St_johns'
                },
                {
                    title: 'Britland',
                    value: 'Europe/London'
                }
            ]
        }
    },

    methods: {
        toTimezone(timezone) {
            return util.createTime(new Date(new Date().toLocaleString("en-US", {timeZone: timezone})))
        },
        toUTC() {
            return util.createTime(new Date(new Date().toISOString().replace("Z","")))
        },

        updateTime() {
            const cd = new Date();

            this.time = util.createTime(cd)
            this.date = util.createDisplayDate(cd)
        }
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

    button {
        padding-top: 5px;
        padding-right: 0px;
        background: none !important;
        border: none !important;
    }
    .uk-dropdown.uk-open.uk-dropdown-bottom-right {
        padding: 15px;
    }
    hr {
        margin: 30px 0px 10px !important;
    }


    .time {
        /* font-family: 'Orbitron', sans-serif !important; */
        font-size: 1.7rem;
    }

    .date {
        font-size: 1.2rem;
    }

    .timezone>span:first-of-type {
        float: left;
    }
    .timezone>span:last-of-type {
        float: right;
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
