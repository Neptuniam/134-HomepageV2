<template>
<div v-if="list" class="Container textBody">
    <div @click="showBuilder = !showBuilder" class="listLabel color-overlay clickable">
        <span class="uk-icon" :uk-icon="`icon: ${showBuilder ? 'chevron-down' : 'chevron-right'}; ratio: 1.5;`" />

        <span class="textTitle">
			{{title}} ({{countList(list)}})
		</span>
    </div>

	<!-- <hr> -->

    <div v-if="showBuilder" class="listContainer color-overlay">
		<div v-if="title == 'No Due Date'" class="row fullWidth dayContainer">
            <Card v-for="card in list" :key="card.id" class="col-xs-3" :card="card" />
        </div>

        <div v-for="day in list" v-else>
            <b> {{util.readableDay(day[0].due)}} </b>

            <div class="row fullWidth dayContainer">
                <Card v-for="card in day" :key="card.id" class="col-xs-3" :card="card" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	props: ['list', 'title'],

	data() {
	    return {
			today: new Date(),
	        showBuilder: false,
	    }
	},

	methods: {
        hasDesc(card) {
            return card && (card.desc || card.idChecklists && card.idChecklists.length)
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
	},

	mounted() {
		// Show coming up cards by default
	    if (this.title == 'Coming Up')
			this.showBuilder = true
	},
}
</script>

<style scoped>
    .Container {
        background-color: #121212;
        color: grey;
    }

    .listLabel {
        font-size: 22px;
        font-weight: 600;
        color: rgb(255, 255, 255);

        padding: 10px 15px;
    }
    .listLabel::before {
        background: #4BB2F9;
        opacity: 17%;
        width: 100vw;
    }
    hr {
        margin: 0px 0px 0px 0px;
    	/* margin: 5px 0px 20px 0px; */
    }

    .listContainer {
    	padding: 5px 10px;

    	max-height: 60vh;
    	overflow-y: auto;
    	overflow-x: hidden;
    }
    .listContainer:before {
        background: #4BB2F9;
        opacity: 8%;
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
