<template>
<div id="QueryAnalytics" class="row start-xs">
  <div class="col-xs-3 dateInput">
      <date-picker class="textBody" range v-model="dateSelection" :lang="{}" :not-after="today" :shortcuts="shortcuts" />
      <div class="noselect dateLabel">Date Range</div>
  </div>

  <div class="col-xs">
      <CustomButton
          title="Generate"
          color="primary"
          :click="generateRequest"
          fitWidth
          normalHeight
      />
  </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
    data() {
        return {
            dateSelection: null,
            today: new Date(),
            shortcuts: [
                {
                    text: 'Last Month',
                    onClick: () => {
                        this.dateSelection = [ new Date(this.today.getFullYear(), this.today.getMonth()-1, 1), new Date(new Date(this.today.getFullYear(), this.today.getMonth(), 1)-1) ]
                    }
                }, {
                    text: 'Last Week',
                    onClick: () => {
                        var start = new Date()
                        var day = start.getDay()  // Get current day number
                        start.setHours(-24 * (day+7)) // Set the hours to day number minus 1 * negative 24

                        var end = new Date(start)
                        end.setDate(start.getDate()+6)
                        this.dateSelection = [ start, end ]
                    }
                }, {
                    text: 'Today',
                    onClick: () => {
                        this.dateSelection = [ this.today, this.today ]
                    }
                }, {
                    text: 'This Week',
                    onClick: () => {
                        var start = new Date()
                        var day = start.getDay() // Get current day number
                        start.setHours(-24 * (day)) // Set the hours to day number minus 1 * negative 24
                        this.dateSelection = [ start, this.today ]
                    }
                }, {
                    text: 'This Month',
                    onClick: () => {
                        this.dateSelection = [ new Date(this.today.getFullYear(), this.today.getMonth(), 1), this.today ]
                    }
                }
            ],
        }
    },

    methods: {
        formatDate(date) {
            return date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()
        },
        generateRequest() {
            this.fetchAnalytics({
                'from': this.formatDate(this.dateSelection[0])+" 00:00:00",
                'to':   this.formatDate(this.dateSelection[1])+" 23:59:59",
            })
        },

        ...mapActions('settings', {
            fetchAnalytics: 'fetchAnalytics',
        })
    },

    mounted() {
        console.log('mounted');
        // Default the date range to this month
        this.dateSelection = [ new Date(this.today.getFullYear(), this.today.getMonth(), 1), this.today ]

        this.generateRequest()
    },
}
</script>

<style>
    .dateInput {
        position: relative;
        padding: 10px 20px 20px;
    }
    .dateInput input {
        height: 44px !important;
    }
    .dateInput .dateLabel {
        position: absolute;
        top: 5px !important;
        left: 25px !important;
        font-size: 10px !important;
        line-height: 10px !important;
        background-color: white;
        margin: 0px 0px !important;
        padding: 0px 5px !important;
    }

    #QueryAnalytics button {
        position: relative;
        top: 10px;
        left: 30px;
    }
</style>
