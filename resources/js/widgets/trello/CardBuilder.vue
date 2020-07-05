<template>
<div v-if="list" class="listContainer color-overlay textBody">
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

	// methods: {
    //     hasDesc(card) {
    //         return card && (card.desc || card.idChecklists && card.idChecklists.length)
    //     },
    //
	// 	countList(list) {
	// 		// No due is just a standard array
	// 		if ('length' in list)
	// 			return list.length
    //
	// 		// The lists with due dates are seperates in an object by days
	// 		let count = 0
	// 		for (let day in list)
	// 			count += list[day].length
	// 		return count
	// 	},
	// },

	mounted() {
		// Show coming up cards by default
	    if (this.title == 'Coming Up')
			this.showBuilder = true
	},
}
</script>

<style scoped>
    .listLabel {
        padding: 10px 15px;
    }
    .listLabelText {
        font-size: 30px;
        font-weight: 500 !important;
    }

    .listContainer {
    	padding: 5px 10px;
    }

    .dayContainer {
    	margin: 0px 10px 50px 0px;
    }

    .dayContainer .col-xs-3 {
    	min-width: 300px;
    	max-width: 19%;

    	max-height: 200px;

    	font-size: 2.5vh;

    	margin: 0px 0.5% 0.5% 0px !important;
    }
</style>
