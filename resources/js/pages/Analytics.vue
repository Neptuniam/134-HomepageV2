<template>
<div class="Analytics fullWidth">
    <QueryAnalytics />


    <div v-if="events == null">
        <div uk-spinner="ratio: 5"></div>
    </div>
    <div v-else-if="!events.length" class="row center-xs fullWidth" style="padding-top: 100px">
        <h2>No events to show</h2>
    </div>
    <div v-else="events">
        <h1>
            Total Requests made: {{events.length}}
        </h1>

        <DistinctApi />

        <div class="row fullWidth nopadding" style="margin-left: 0px !important;">
            <div class="col-xs">
                <AverageUsage />

                <SourceType />
            </div>

            <div class="col-xs">
                <ApiUsage />

                <Details />
            </div>
        </div>

        <Timeline />

        <div class="row fullWidth nopadding" style="margin-left: 0px !important;">
            <div class="col-xs">
                <DayUsage />
            </div>

            <div class="col-xs">
                <UserUsage />
            </div>
        </div>

        <HourUsage />
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters('settings', {
            events: 'getEvents',
        })
    }
}
</script>

<style>
    .Analytics {
        height: calc(100vh - 70px);
        overflow-y: auto;

        margin-top: 70px;
    }

    .Analytics h1 {
        position: fixed;
        top: 10px;

        width: 100vw;
    }

    .Analytics h2 {
        text-align: left;
    }

    .Analytics .row .card {
        margin: 10px 0px !important;
    }
</style>
