window.util = {
	today: new Date(),

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

	avatar_color(name, s=30, l=40) {
		let hash = 0
		for (var i = 0; i < name.length; i++)
			hash = name.charCodeAt(i) + ((hash << 5) - hash)
		return 'hsl(' + hash % 360 + ', ' + s + '%, ' + l + '%)'
	},

}
