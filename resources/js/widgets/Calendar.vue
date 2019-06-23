<template>
    <div class="row center-xs middle-xs Calendar">
        <div class="col-xs-8">
            <div class="row center-xs middle-xs Calendar">
                <div v-for="day in days" :class="['col-xs date', day.todos.length > 0 ? 'selected' : '']" :uk-tooltip="day.todos">
                    <div class="count textBody">
                        <span v-if="day.todos.length > 0">
                            {{day.todos.length}}
                        </span>
                    </div>
                    <div class="day textBody">
                        {{weekDays[day.date]}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            weekDays: ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
            today: new Date(),
            days: [{
                date: 5,
                todos: ['Homepage']
            }, {
                date: 6,
                todos: []
            }, {
                date: 0,
                todos: ['Homepage']
            }, {
                date: 1,
                todos: ['Homepage', 'Homepage']
            }, {
                date: 2,
                todos: []
            }, {
                date: 3,
                todos: ['Homepage', 'Homepage', 'Homepage']
            }, {
                date: 4,
                todos: []
            },
        ]
        }
    },
}
</script>

<style scoped>
    .Calendar {
        /* height: 10vh; */
        text-align: center;
    }

    .date {
        margin: 1vw;
    }

    .count {
        height: 5vh;
        font-size: 4vh;
    }

    .day {
        font-size: 2vh;
    }

    .selected {
        background: rgba(75,0,130,0.3);
        border-radius: 20px;
        /* background-color: lightblue; */
    }
</style>
