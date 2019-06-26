import axios from "axios";

const state = {
    showHome: false,
    address: null,
    lat: null,
    lng: null,

    // Settings
    widgets: null,
    locations: null,
    favourites: null,
    // location: null,
}
const getters = {
    getShowHome: (state) => state.showHome,
    getAddress: (state) => state.address,

    getLat:  (state) => state.lat,
    getLng:  (state) => state.lng,
    getLocation: (state) => state.lat+','+state.lng,

    // Settings
    getWidgets: (state) => state.widgets,
    getLocations: (state) => state.locations,
    getFavourites: (state) => state.favourites,
}
const mutations = {
    setShowHome: (state, payload) => { state.showHome = payload; },
    setAddress: (state, payload) => { state.address = payload; },

    setLat: (state, payload) => { state.lat = payload; },
    setLng: (state, payload) => { state.lng = payload; },

    // Settings
    setWidgets: (state, payload) => { state.widgets = payload; },
    setLocations: (state, payload) => { state.locations = payload; },
    setFavourites: (state, payload) => { state.favourites = payload; },
}
const actions = {
    setShowHome: ({commit}, payload) => {
        commit('setShowHome', payload);
    },

    setAddress: ({commit}, payload) => {
        commit('setAddress', payload);
    },

    setLocation: ({commit}, payload) => {
        commit('setLat', payload.lat);
        commit('setLng', payload.lng);
    },


    // Settings
    fetchWidgets: ({commit}) => {
        axios.get('/settings/widgets/').then(response => {
            commit('setWidgets', response.data)
        })
    },
    updateWidget: ({commit}, payload) => {
        axios.put('/settings/widgets/',payload).then(response => {
            console.log('Updated Widget');
            console.log(response);
            // dispatch('fetchWidgets')
        })
    },


    // Location Controllers
    fetchLocations: ({commit}) => {
        axios.get('/settings/locations/').then(response => {
            commit('setLocations', response.data)
        })
    },
    updateLocation: ({commit, dispatch}, payload) => {
        // If id is 0, we are creating a new location
        if (payload.id == null) {
            axios.post('/settings/locations/',payload).then(response => {
                dispatch('fetchLocations')
            })
        } else {
            axios.put('/settings/locations/',payload).then(response => {
                dispatch('fetchLocations')
            })
        }
    },
    deleteLocation: ({commit, dispatch}, payload) => {
        console.log(payload);
        axios.put('/settings/locations/delete',payload).then(response => {
            console.log(response.data);
            dispatch('fetchLocations')
        })
    },


    // Favourites Controllers
    fetchFavourites: ({commit}) => {
        axios.get('/settings/favourites/').then(response => {
            commit('setFavourites', response.data)
        })
    },
    updateFavourite: ({commit, dispatch}, payload) => {
        // If id is 0, we are creating a new location
        if (payload.id == null) {
            axios.post('/settings/favourites/',payload).then(response => {
                console.log(response);
                dispatch('fetchFavourites')
            })
        } else {
            axios.put('/settings/favourites/',payload).then(response => {
                dispatch('fetchFavourites')
            })
        }
    },
    deleteFavourite: ({commit, dispatch}, payload) => {
        axios.put('/settings/favourites/delete',payload).then(response => {
            dispatch('fetchFavourites')
        })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
