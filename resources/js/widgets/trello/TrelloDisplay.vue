<template>
<span class="TrelloDueToday">
    {{dueToday}}
</span>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            today: new Date(),
            dueToday: null,
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

        async processCards() {
            await this.fetchCards()

            this.dueToday = 0

            for (let card of this.cards) {
                // Some cards don't have a due date
                if (card.due) {
                    let dayIndex = this.numDaysAgo(card.due)

                    if (dayIndex == 0)
                        this.dueToday++
                }
            }

            console.log('Due Today', this.dueToday);
        },

        ...mapActions('settings', {
            fetchCards: 'fetchTrelloCards',
        })
    },

    mounted() {
        this.processCards()
    },
}
</script>

<style scoped>
.TrelloDueToday {
    z-index: 0;
    
	position: absolute;
	top: -15px;
	right: 0px;

	font-weight: 700;
	font-size: 20px;

    color: black;
}
</style>
