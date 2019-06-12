const state = {
    lat: null,
    lng: null,
}
const getters = {
    getLat:  (state) => state.lat,
    getLng:  (state) => state.lng,
    getLocation: (state) => state.lat+','+state.lng,
}
const mutations = {
    setLat: (state, payload) => { state.lat = payload; },
    setLng: (state, payload) => { state.lng = payload; },
}
const actions = {
    setLocation: ({commit}, payload) => {
        commit('setLat', payload.lat);
        commit('setLng', payload.lng);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
