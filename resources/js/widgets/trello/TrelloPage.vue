<template>
<div v-if="board && cards" class="start-xs TrelloContainer">
    <a :href="board.shortUrl" target="_blank"><h1 class="textSpecial"> {{board.name}} </h1></a>

    <div v-if="comingUp" class="Container textBody">
        <div @click="showComingUp = !showComingUp" class="middle-xs">
            <span class="uk-icon" :uk-icon="`icon: ${showComingUp ? 'chevron-down' : 'chevron-right'}; ratio: 1.5;`" />
            <span class="listLabel textTitle">Coming Up ({{countList(comingUp)}})</span>
        </div>
        <hr>

        <div v-if="showComingUp" class="ListContainer">
            <div v-for="day in comingUp">
                <b> {{readableDay(day[0])}} </b>

                <div class="row fullWidth dayContainer">
                    <div v-for="card in day" class="col-xs-3 card">
                        {{card.name}}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-if="noDue" class="Container textBody">
        <div @click="showNoDue = !showNoDue" class="middle-xs">
            <span class="uk-icon" :uk-icon="`icon: ${showNoDue ? 'chevron-down' : 'chevron-right'}; ratio: 1.5;`" />
            <span class="listLabel textTitle">No Due Date ({{countList(noDue)}})</span>
        </div>
        <hr>

        <div v-if="showNoDue" class="ListContainer">
            <div class="row fullWidth dayContainer">
                <div v-for="card in noDue" class="col-xs-3 card">
                    {{card.name}}
                </div>
            </div>
        </div>
    </div>

    <div v-if="past" class="Container textBody">
        <div @click="showPast = !showPast" class="middle-xs">
            <span class="uk-icon" :uk-icon="`icon: ${showPast ? 'chevron-down' : 'chevron-right'}; ratio: 1.5;`" />
            <span class="listLabel textTitle">Past Cards ({{countList(past)}})</span>
        </div>
        <hr>

        <div v-if="showPast" class="ListContainer">
            <div v-for="day in past">
                <b> {{readableDay(day[0])}} </b>

                <div class="row fullWidth dayContainer">
                    <div v-for="card in day" class="col-xs-3 card">
                        {{card.name}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            today: new Date(),
            comingUp: null,
            noDue: null,
            past: null,

            showComingUp: true,
            showNoDue: false,
            showPast: false,
        }
    },

    computed: {

        ...mapGetters('settings', {
            board:  'getBoard',
            cards:  'getCards',
        })
    },

    methods: {
        numDaysAgo(due) {
            return Math.round((new Date(due) - this.today) / (86400000))
        },
        readableDay(day) {
            if (!day || !'due' in day)
                return "N/A"

            let daysTill = this.numDaysAgo(day.due)

            // Have more fitting text for FE
            if (daysTill >= 0) {
                switch(daysTill) {
                    case 0:
                        return "Today"
                    case 1:
                        return "Tomorrow"
                    default:
                        return `In ${daysTill} Days`
                }
            } else {
                daysTill = Math.abs(daysTill)
                switch(daysTill) {
                    case 1:
                        return "Yesterday"
                    default:
                        return `${daysTill} Days ago`
                }
            }
        },

        countList(list) {
            // No due is just a standard array
            if ('length' in list)
                return list.length

            // The lists with due dates are seperates in an object by days
            let count = 0
            for (let day in list)
                count += list[day].length
            return count
        },

        addToList(list, dayIndex, card) {
            // Initalize each day to an array starting with the card
            if (!list[dayIndex]) {
                list[dayIndex] = [card]
            } else {
                list[dayIndex].push(card)
            }
        },

        processCards() {
            this.comingUp = {}
            this.past = {}
            this.noDue = []

            for (let card of this.cards) {
                // Some cards don't have a due date
                if (card.due) {
                    let dayIndex = this.numDaysAgo(card.due)

                    if (dayIndex >= 0) {
                        this.addToList(this.comingUp, dayIndex, card)
                    } else {
                        this.addToList(this.past, Math.abs(dayIndex), card)
                    }
                } else {
                    this.noDue.push(card)
                }
            }

            console.log('By Due date', this.comingUp);
            console.log('past', this.past);
            console.log('no due date', this.noDue);
        },

        ...mapActions('settings', {
            fetchBoard: 'fetchBoard',
            fetchCards: 'fetchTrelloCards',
        })
    },

    mounted() {
        this.fetchBoard()
        this.processCards()
    },
}
</script>

<style scoped>
    .TrelloContainer {
        height: 85vh;
        width: 90vw;

        overflow-y: auto;
        overflow-x: hidden;

        padding: 0px 50px;

        /* color: rgb(245, 245, 245) !important; */
        /* background-color: rgba(75, 75, 75, 0.75); */

        /* border-radius: 10px;
        border: 1px grey solid; */
    }

    .listLabel {
        font-size: 25px;
        font-weight: 600;
    }
    hr {
        margin: 5px 0px 20px 0px;
    }

    .ListContainer {
        margin: 10px;

        max-height: 50vh;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .dayContainer {
        margin: 10px 10px 50px 10px;
    }

    .dayContainer .col-xs-3 {
        min-width: 300px;
        max-width: 19%;

        max-height: 200px;

        font-size: 2.5vh;

        margin: 0.5% !important;
    }
</style>
