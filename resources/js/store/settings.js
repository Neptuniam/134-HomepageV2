import axios from "axios";

const state = {
    showHome: true,
    address: null,
    lat: null,
    lng: null,

    // Settings
    widgets: null,
    locations: null,
    favourites: null,
    mapsSettings: null,

    // Users
    users: null,
    user: null,
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
    getMapsSettings: (state) => state.mapsSettings,

    // Users
    getUsers: (state) => state.users,
    getUser: (state) => state.user,
}
const mutations = {
    setShowHome: (state, payload) => { state.showHome = payload; },
    setAddress: (state, payload) => { state.address = payload; },

    setLat: (state, payload) => { state.lat = payload; },
    setLng: (state, payload) => { state.lng = payload; },

    // Settings
    setWidgets: (state, payload) => { state.widgets = payload },
    setLocations: (state, payload) => { state.locations = payload },
    setFavourites: (state, payload) => { state.favourites = payload },
    setMapsSettings: (state, payload) => { state.mapsSettings = payload },

    //Users
    setUsers: (state, payload) => {state.users = payload; },
    setUser: (state, payload) => { state.user = payload; }
}
const actions = {
    setShowHome: ({commit}, payload) => {
        commit('setShowHome', payload);
    },

    setAddress: ({commit}, payload) => {
        commit('setAddress', payload);
    },

    setLocation: ({commit}, payload) => {
        console.log('%c Location', 'background: #222; color: #bada55');
        console.log(payload);

        commit('setLat', payload.lat);
        commit('setLng', payload.lng);
    },

    changeLocation: ({commit}, payload) => {
    },


    fetchUser: ({commit, dispatch}) => {
        let user = JSON.parse(window.localStorage.getItem('activeUser'))

        axios.put('/settings/users', user).then(() => {
            dispatch('setActiveUser', user)
        })
    },

    setActiveUser: ({commit, dispatch}, payload) => {
        window.localStorage.setItem('activeUser', JSON.stringify(payload));
        axios.put('/settings/users', payload).then(() => {
            commit('setUser', payload)

            dispatch('fetchWidgets')
            dispatch('fetchMapsSettings')
            dispatch('fetchFavourites')
        })
    },

    fetchUsers: ({commit}) => {
        axios.get('/settings/users').then(response => {
            console.log('%c Users', 'background: #222; color: #bada55');
            console.log(response.data);
            commit('setUsers', response.data)
        })
    },
    createUser: ({commit, dispatch}, payload) => {
        axios.post('/settings/users',payload).then(response => {
            console.log(response);
            payload.id = response.data
            dispatch('fetchUsers')
            dispatch('setActiveUser', payload)
        })
    },


    // Settings
    fetchWidgets: ({commit}) => {
        axios.get('/settings/widgets/').then(response => {
            console.log('%c Widgets ', 'background: #222; color: #bada55');
            console.log(response.data);

            commit('setWidgets', response.data)
        })
    },
    updateWidget: ({commit}, payload) => {
        axios.put('/settings/widgets/',payload)
    },


    // Location Controllers
    fetchLocations: ({commit}) => {
        axios.get('/settings/locations/').then(response => {
            console.log('%c Locations ', 'background: #222; color: #bada55');
            console.log(response.data);

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
        axios.put('/settings/locations/delete',payload).then(response => {
            dispatch('fetchLocations')
        })
    },

    // Update User's map settings
    fetchMapsSettings: ({commit, dispatch}) => {
        axios.get('/settings/locations/settings').then(response => {
            console.log('%c Maps Settings ', 'background: #222; color: #bada55');
            console.log(response.data);
            commit('setMapsSettings', response.data[0])
            dispatch('fetchLocations')
        })
    },
    updateMapSettings: ({commit, dispatch}, payload) => {
        console.log(payload);
        axios.put('/settings/locations/settings',payload).then(response => {
            dispatch('fetchMapsSettings')
        })
    },


    // Favourites Controllers
    fetchFavourites: ({commit}) => {
        axios.get('/settings/favourites/').then(response => {
            console.log('%c Favourites ', 'background: #222; color: #bada55');
            console.log(response.data);

            commit('setFavourites', response.data)
        })
    },
    updateFavourite: ({commit, dispatch}, payload) => {
        // If id is 0, we are creating a new location
        if (payload.id == null) {
            axios.post('/settings/favourites/',payload).then(response => {
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
