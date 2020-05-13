<template>
	<div class="card" @click="openPreview(card)"
		:class="{
			'clickable': hasDesc(card),
			'uk-box-shadow-hover-large': hasDesc(card)
		}" >

		<div class="row middle-xs">
			<span v-if="hasDesc(card)" class="uk-icon" uk-icon="icon: info; ratio:1" />

			<span v-if="members" v-for="member in members" class="uk-badge" :style="`background-color: #${numberFromText(member.fullName)}`">
			    {{member.initials}}
			</span>

			<span v-if="card.labels" v-for="label in card.labels" class="uk-badge"
				 :style="`background-color: ${label.color}`">
				{{label.name}}
			</span>
		</div>

		{{card.name}}
	</div>
</template>

<script>
export default {
	props: ['card'],
	data() {
	    return {
	        members: null
	    }
	},

	methods: {
		hasDesc(card) {
			return card && (card.desc || card.idChecklists && card.idChecklists.length)
		},

		hashCode(str) { // java String#hashCode
		    var hash = 0;
		    for (var i = 0; i < str.length; i++) {
		       hash = str.charCodeAt(i) + ((hash << 5) - hash);
		    }
		    return hash;
		},
		numberFromText(text) {
			let hashed = this.hashCode(text)
		    let RGB = (hashed & 0x00FFFFFF)
		        .toString(16)
		        .toUpperCase();

		    return "00000".substring(0, 6 - RGB.length) + RGB;
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
		async openPreview(card) {
			console.log(card);

			let desc = card.desc.replace('↵', '<br>')

			if (this.hasDesc(card)) {
				let response = await this.axios.get(`https://api.trello.com/1/cards/${card.id}/checklists?key=${process.env.MIX_TRELLO_KEY}&token=${process.env.MIX_TELLO_TOKEN}`)

				for (let checklist in response.data) {
					for (let index in response.data[checklist].checkItems) {
						let checkItem = response.data[checklist].checkItems[index]
						desc += `<input type="checkbox" disabled="true" ${checkItem.state == 'complete' ? 'checked' : ''}> ${checkItem.name} <br>`
					}
				}
			}

			// Emit a signal to the FilePreviewer component located in Main.vue to preview the card contents
			this.$bus.$emit('showPreview', `
				<div style="max-width: 1000px">
					<a href="${card.shortUrl}" target="_blank">
						<h1 class="blueText"> ${card.name} </h1>
					</a>
					<hr>

					<h3 class="start-xs invertedText"> ${desc} </h3>

					<br>
					<br>
					<br>

					<p class="start-xs"> Due: ${this.readableDay(card.due)}
					<p class="start-xs"> Last Updated: ${this.readableDay(card.dateLastActivity)}
				</div>
			`)
		},
	},

	async created() {
		if (this.card.idMembers && this.card.idMembers.length) {
			this.members = []

			for (let memberID in this.card.idMembers) {
				let member = await this.axios.get(`https://api.trello.com/1/members/${this.card.idMembers[memberID]}?key=${process.env.MIX_TRELLO_KEY}&token=${process.env.MIX_TELLO_TOKEN}`)
				this.members.push(member.data)
			}
		}
	},
}
</script>

<style scoped>
	.uk-icon {
	}
	span {
		font-size: 14px;
		margin: 0px 0px 0px 5px;
	}
</style>
