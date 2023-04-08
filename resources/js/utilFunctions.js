import axios from 'axios'

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


	formatNum(num){
		if (num < 10)
			return "0"+num
		return num
	},
	/*
		Description: Ensures the value is a Date object so you can use functions like .getDate() without worring about js errors
		In: <String/Date/Number> toConvert: The value to be converted into a Date Object (if not already)
		Out: <Date> toConvert
		Error: toConvert must be either a Date already or a string/epoch. Can't convert anything else
	*/
	ensureDateObject(toConvert) {
		if (toConvert) {
			// Determine if we recieved a Date object or just string/epoch
			if (typeof toConvert.getTime == 'function') {
				// Is already a Date Object. Nothing needs to be done
				return toConvert
			} else if (typeof toConvert == 'string') {
				// Make the string date follow ISO standards to create local time properlly
				if (toConvert.includes("T"))
					return new Date(toConvert)
				else
					return new Date(toConvert.replace(" ", "T")+"Z")
			} else if (typeof toConvert == 'number') {
				// Epoch date value
				return new Date(toConvert)
			} else {
				console.error('Cannot convert Date', toConvert);
				return null
			}

		} else {
			return null
		}
	},

	/*
		Description: Pads numbers, mainly used for times to ensure it's two digits (but is dynamic)
		In: <Number/String> num - to pad, <Number> digit - Numbers of digits to return the number with
		Out: <String> paddedNumber
		Error: digit should be positive
	*/
	zeroPadding(num, digit) {
		var zero = '';
		for (var i = 0; i < digit; i++)
			zero += '0';
		return (zero + num).slice(-digit);
	},

	/*
		Description: Converts 24 hour times to 12
		In: <Number/String> num
		Out: <Number> convertedNum
	*/
	convert24To12(num) {
		return num >= 13 ? num - 12 : num
	},

	/*
		Description: Creates a very human readable Time String
		In: <Date/String> Time
		Out: <String> HumanReadableTime
		Error: Time must be a date in some format
		Function Dependencies: ensureDateObject, convert24To12, zeroPadding
	*/
	createTime(time) {
		time = util.ensureDateObject(time)

		if (time)
			return `${util.convert24To12(time.getHours())}:${util.zeroPadding(time.getMinutes(), 2)}:${util.zeroPadding(time.getSeconds(), 2)} ${time.getHours() < 12 ? 'am' : 'pm'}`
	},

	/*
        Description: Creates a very human readable Date String
        In: <Date/String> Date
        Out: <String> HumanReadableDate
        Error: Date must be a date in some format
        Function Dependencies: ensureDateObject, formatNum
    */
    createDisplayDate(date) {
        date = util.ensureDateObject(date)

        if (date) {
            let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
            let year  = date.getFullYear()
            let month = date.getMonth()
            let day   = date.getDate()

            if (year && month != undefined && day != undefined)
                return `${months[month]} ${util.formatNum(day)}, ${year}`
        }
    },


	trackResult(api, hit_source, result) {
		let source = ''
		if (hit_source == 0)
			source = 'Cached'
		else if (hit_source == 1)
			source = 'Fetched'
		else if (hit_source == 2)
			source = 'In house'

		console.log(`%c ${source} service: ${api} `, 'background: #222; color: #bada55');
		console.log(result);

		axios.post('/analytics/add_event', { api, hit_source}).catch(error => {
			console.error('Error while recording event');
			console.error(error);
		})
	}
}
