const state = {
    lat: null,
    lng: null,
    travelObj: null,
    address: null,
}
const getters = {
    getLat:  (state) => state.lat,
    getLng:  (state) => state.lng,
    getLocation: (state) => state.lat+','+state.lng,

    getTravelObj: (state) => state.travelObj,
    getAddress: (state) => state.address,
}
const mutations = {
    setLat: (state, payload) => { state.lat = payload; },
    setLng: (state, payload) => { state.lng = payload; },
    setTravelObj: (state, payload) => { state.travelObj = payload; },
    setAddress: (state, payload) => { state.address = payload; }
}
const actions = {
    setLocation: ({commit}, payload) => {
        commit('setLat', payload.lat);
        commit('setLng', payload.lng);
    },

    setTravelObj: ({commit}, payload) => {
        commit('setTravelObj', payload);
    },

    setAddress: ({commit}, payload) => {
        commit('setAddress', payload);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
