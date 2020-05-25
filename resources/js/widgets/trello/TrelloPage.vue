<template>
<div v-if="board && cards" class="start-xs TrelloContainer">
    <a :href="board.shortUrl" target="_blank">
        <h1 class="textSpecial nospacing"> {{board.name}} </h1>
    </a>

    <CardBuilder :list="comingUp" title='Coming Up' />
    <CardBuilder :list="noDue" title='No Due Date' />
    <!-- <CardBuilder :list="done" title='Done' /> -->
    <!-- <CardBuilder :list="past" title='Past Cards' /> -->


    <off-canvas-container v-if="board.actions && board.actions.length">
        <button class="uk-icon-button" uk-icon="list" uk-toggle="target: #offcanvas-flip" />

        <off-canvas id="offcanvas-flip" uk-offcanvas="flip: true; overlay: true">
            <div class="uk-offcanvas-bar">
                <h1 class="textSpecial"> Actions </h1>

                <div v-for="action in board.actions" class="card">
                    <div style="font-size: 18px;">
                        {{action.data.card.name}}
                    </div>

                    <div style="font-size: 14px;">
                        {{util.readableDay(action.date)}} - {{action.type}}
                    </div>
                </div>
            </div>
        </off-canvas>
    </off-canvas-container>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            today: new Date(),
            DoneID: "5e0b302d93a3935125fd3506",

            comingUp: null,
            done: null,
            past: null,
            noDue: null,
        }
    },

    computed: {
        ...mapGetters('settings', {
            board:  'getBoard',
            cards:  'getCards',
        })
    },

    methods: {
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
            this.done = {}
            this.noDue = []

            // Seperate cards into lists by due date
            for (let card of this.cards) {
                if (card.due) {
                    let dayIndex = util.numDaysAgo(card.due)

                    if (card.idList == this.DoneID) {
                        // Done cards are in their own list regardless of due date
                        this.addToList(this.done, Math.abs(dayIndex), card)
                    } else if (dayIndex >= 0) {
                        // Future cards
                        this.addToList(this.comingUp, dayIndex, card)
                    } else {
                        // Past cards
                        this.addToList(this.past, Math.abs(dayIndex), card)
                    }
                } else {
                    // Some cards don't have a due date
                    this.noDue.push(card)
                }
            }
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
        position: relative;

        height: 100%;
        width: 100vw;

        overflow-y: auto;
        overflow-x: hidden;

        margin: 60px 0px 0px 0px;
    }

    button {
        position: fixed;
        top: 20px;
        right: 200px;
    }
</style>
