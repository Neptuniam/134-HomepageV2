<template>
	<table class="FavsSettings uk-table uk-table-striped">
		<thead>
			<tr>
				<th class="uk-text-capitalize">
					Board ID
				</th>
			</tr>
		</thead>

	    <tbody>
			<TrelloRow v-for="trello in trellos" :key="trello.id" :trello="trello" />

	        <TrelloRow :trello="blankObject" />
	    </tbody>
	</table>
</template>

<script>
export default {
	data() {
	    return {
	        trellos: [{id: 1, board: '5e0b302d93a3935125fd3503'}],
			blankObject: {id: 0, board: null}
	    }
	},
}
</script>

<style scoped>

</style>
