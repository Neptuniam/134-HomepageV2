const state = {
    showHome: true,
    address: null,
    lat: null,
    lng: null,
}
const getters = {
    getShowHome: (state) => state.showHome,
    getAddress: (state) => state.address,

    getLat:  (state) => state.lat,
    getLng:  (state) => state.lng,
    getLocation: (state) => state.lat+','+state.lng,
}
const mutations = {
    setShowHome: (state, payload) => { state.showHome = payload; },
    setAddress: (state, payload) => { state.address = payload; },
    setLat: (state, payload) => { state.lat = payload; },
    setLng: (state, payload) => { state.lng = payload; },
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
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
