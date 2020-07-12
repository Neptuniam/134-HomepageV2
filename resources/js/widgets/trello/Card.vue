<template>
	<div class="card color-overlay uk-box-shadow-hover-large" @click="openPreview(card)"
		:class="{
			'clickable': hasDesc,
			/* 'uk-box-shadow-hover-large': hasDesc */
		}" >

		<div class="row middle-xs">
			<span v-if="hasDesc" class="uk-icon" uk-icon="icon: info; ratio:1" />

			<span v-if="members" v-for="member in members" class="uk-badge"
				 :style="`background-color: ${util.avatar_color(member.fullName)}`">
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

	computed: {
	    hasDesc() {
	        return this.card && (this.card.desc || this.card.idChecklists && this.card.idChecklists.length)
	    }
	},

	methods: {
		async openPreview(card) {
			console.log(card);

			let desc = card.desc.replace('↵', '<br>')

			if (card.idChecklists && card.idChecklists.length) {
				let response = await this.axios.get(`https://api.trello.com/1/cards/${card.id}/checklists?key=${process.env.MIX_TRELLO_KEY}&token=${process.env.MIX_TELLO_TOKEN}`)

				for (let checklist of response.data) {
					for (let checkItem of checklist.checkItems) {
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

					<p class="start-xs"> Due: ${util.readableDay(card.due)}
					<p class="start-xs"> Last Updated: ${util.readableDay(card.dateLastActivity)}
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
	span {
		font-size: 14px;
		margin: 0px 0px 10px 5px;
	}
</style>
