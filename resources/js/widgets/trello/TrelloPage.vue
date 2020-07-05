<template>
<div v-if="board && cards" class="start-xs TrelloContainer">
    <div class="headerContainer">
        <a :href="board.shortUrl" target="_blank" class="center-xs">
            <h1 class="textTitle"> {{board.name}} </h1>
        </a>

        <ul uk-tab class="center-xs">
            <li v-for="tab in tabs" :class="{'uk-active': activeTab.title === tab.title}" @click="activeTab = tab">
                <a class="uk-text-capitalize">
                    {{ tab.title }}
                </a>
            </li>
        </ul>
    </div>

    <!-- {{activeTab}} -->

    <div v-if="activeTab && 'list' in activeTab && 'title' in activeTab" class="BuilderContainer">
        <CardBuilder :list="activeTab.list" :title="activeTab.title" />
    </div>


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
    computed: {
        tabs() {
            return [
                {title: 'Coming Up', list: this.comingUp},
                {title: 'No Due Date', list: this.noDue},
                {title: 'Past Cards', list: this.past},
                {title: 'Done', list: this.done}
            ]
        },
        ...mapGetters('settings', {
            board:  'getBoard',
            cards:  'getCards',
        })
    },

    data() {
        return {
            comingUp: null,
            done: null,
            past: null,
            noDue: null,

            activeTab: {},

            today: new Date(),
            DoneID: "5e0b302d93a3935125fd3506",
        }
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
        async processCards() {
            this.comingUp = {}
            this.past = {}
            this.done = {}
            this.noDue = []

            if (!this.cards)
                await this.fetchCards()

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

            this.activeTab = this.tabs[0]
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
    }

    .headerContainer {
        height: 17vh;
    }
    .BuilderContainer {
        height: 83vh;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .headerContainer a h1 {
        font-size: 5.5vh;
        font-weight: 600 !important;
    }

    .TrelloContainer button {
        position: fixed;
        top: 20px;
        right: 200px;
    }

    .uk-tab {
        margin-top: 0px;
    }
    .uk-tab>*>a {
        font-weight: 600;
        font-size: 3vh !important;
    }
    .uk-tab>*>a:hover {
        color: rgb(50, 50, 50) !important;
    }
</style>
