const state = {
    lat: null,
    lng: null,
    travelObj: null,
}
const getters = {
    getLat:  (state) => state.lat,
    getLng:  (state) => state.lng,
    getLocation: (state) => state.lat+','+state.lng,

    getTravelObj: (state) => state.travelObj,
}
const mutations = {
    setLat: (state, payload) => { state.lat = payload; },
    setLng: (state, payload) => { state.lng = payload; },
    setTravelObj: (state, payload) => { state.travelObj = payload; },
}
const actions = {
    setLocation: ({commit}, payload) => {
        commit('setLat', payload.lat);
        commit('setLng', payload.lng);
    },

    setTravelObj: ({commit}, payload) => {
        commit('setTravelObj', payload);
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
