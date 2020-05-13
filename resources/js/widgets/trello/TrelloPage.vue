<template>
<div v-if="board && cards" class="start-xs TrelloContainer">
    <a :href="board.shortUrl" target="_blank"><h1 class="textSpecial"> {{board.name}} </h1></a>

    <CardBuilder :list="comingUp" title='Coming Up' />
    <CardBuilder :list="noDue" title='No Due Date' />
    <CardBuilder :list="done" title='Done' />
    <CardBuilder :list="past" title='Past Cards' />


    <div v-if="board.actions && board.actions.length">
        <button class="uk-icon-button" uk-icon="list" uk-toggle="target: #offcanvas-flip" />

        <div id="offcanvas-flip" uk-offcanvas="flip: true; overlay: true">
            <div class="uk-offcanvas-bar">
                <h1 class="textSpecial"> Actions </h1>

                <div v-for="action in board.actions" class="card">
                    <div style="font-size: 18px;">
                        {{action.data.card.name}}
                    </div>

                    <div style="font-size: 14px;">
                        {{readableDay(action.date)}} - {{action.type}}
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
            DoneID: "5e0b302d93a3935125fd3506",

            comingUp: null,
            noDue: null,
            done: null,
            past: null,
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
        numDaysAgo(due) {
			return Math.round((new Date(due) - this.today) / (86400000))
		},
		readableDay(date) {
			if (!date)
				return "N/A"

			let daysTill = this.numDaysAgo(date)

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

        processCards() {
            this.comingUp = {}
            this.past = {}
            this.done = {}
            this.noDue = []

            for (let card of this.cards) {
                if (card.due) {
                    let dayIndex = this.numDaysAgo(card.due)

                    if (card.idList == this.DoneID)
                        this.addToList(this.done, Math.abs(dayIndex), card)
                    else if (dayIndex >= 0) {
                        this.addToList(this.comingUp, dayIndex, card)
                    } else {
                        this.addToList(this.past, Math.abs(dayIndex), card)
                    }
                } else {
                    // Some cards don't have a due date
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
    }

    button {
        position: fixed;
        top: 20px;
        right: 200px;
    }
</style>
