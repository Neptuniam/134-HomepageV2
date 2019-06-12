<template>
    <div class="homepage">
        <div class="row">
            <div class="col-xs-6">
                <weather />
            </div>
            <div class="col-xs-6">
                <WidgetsDisplay />
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data: function() {
        return {
            locationOptions: {
                enableHighAccuracy: true,
                timeout: 5000,
            },
        }
    },
    methods: {
        ...mapActions({
            setLocation: 'settings/setLocation'
        })
    },
    created: function() {
        // Retrieve the users location on created
        this.$getLocation(this.locationOptions).then(coordinates => {
            console.log(coordinates);
            this.setLocation(coordinates)
        });
    },
}
</script>

<style scoped>
    .homepage {
        height: 100vh;
        width: 100vw;
        overflow: hidden;

        background: url('../../images/backgrounds/earthPorn.jpg');
    }
</style>
