import axios from "axios";

const state = {
    activePage: 'Home',
    address: null,
    lat: null,
    lng: null,

    // Settings
    widgets: null,
    locations: null,
    favourites: null,

    travelText: null,
    mapsSettings: null,

    backgrounds: null,

    weather: null,

    news: null,
    categorys: null,

    notes: null,

    trelloCreds: null,
    boards: [],
    cards: [],

    // Users
    users: null,
    user: null,

    events: null,
}
const getters = {
    getActivePage: (state) => state.activePage,
    getAddress: (state) => state.address,

    getLat:  (state) => state.lat,
    getLng:  (state) => state.lng,
    getLocation: (state) => state.lat && state.lng ? state.lat+','+state.lng : null,

    // Settings
    getWidgets: (state) => state.widgets,
    getLocations: (state) => state.locations,
    getFavourites: (state) => state.favourites,

    getTravelText: (state) => state.travelText,
    getMapsSettings: (state) => state.mapsSettings,

    getBackgrounds: (state) => state.backgrounds,

    getWeather: (state) => state.weather,

    getNews: (state) => state.news,
    getCategorys: (state) => state.categorys,

    getNotes: (state) => state.notes,

    getTrelloCreds: (state) => state.trelloCreds,
    getBoards: (state) => state.boards,
    getCards: (state) => state.cards,

    // Users
    getUsers: (state) => state.users,
    getUser: (state) => state.user,

    getEvents: (state) => state.events
}
const mutations = {
    setActivePage: (state, payload) => { state.activePage = payload; },
    setAddress: (state, payload) => { state.address = payload; },

    setLat: (state, payload) => { state.lat = payload; },
    setLng: (state, payload) => { state.lng = payload; },

    // Settings
    setWidgets: (state, payload) => { state.widgets = payload },
    setLocations: (state, payload) => { state.locations = payload },
    setFavourites: (state, payload) => { state.favourites = payload },

    setTravelText: (state, payload) => { state.travelText = payload },
    setMapsSettings: (state, payload) => { state.mapsSettings = payload },

    setBackgrounds: (state, payload) => { state.backgrounds = payload },

    setWeather: (state, payload) => { state.weather = payload },

    setNews: (state, payload) => { state.news = payload },
    setCategorys: (state, payload) => { state.categorys = payload },

    setNotes: (state, payload) => { state.notes = payload },

    setTrelloCreds: (state, payload) => { state.trelloCreds = payload },
    pushBoard: (state, payload) => { state.boards.push(payload) },
    pushCards: (state, payload) => { state.cards = [...state.cards, ...payload] },

    //Users
    setUsers: (state, payload) => { state.users = payload; },
    setUser: (state, payload) =>  { state.user = payload; },

    setEvents: (state, payload) => { state.events = payload }
}
const actions = {
    setActivePage: ({commit}, payload) => {
        commit('setActivePage', payload);
    },

    setAddress: ({commit}, payload) => {
        commit('setAddress', payload);
    },

    setLocation: ({commit}, payload) => {
        commit('setLat', payload.lat);
        commit('setLng', payload.lng);

        if (payload.geocode && payload.geocode.length)
            commit('setAddress', payload.geocode[0])
    },

    fetchUser: ({commit, dispatch}) => {
        let user = JSON.parse(window.localStorage.getItem('activeUser'))

        if (user) {
            return dispatch('setActiveUser', user)
        } else {
            UIkit.notification({
                message: "Failed to find active user from local storage",
                status: 'danger'
            })

            return Promise.reject('user_not_found')
        }
    },

    setActiveUser: ({commit, dispatch}, payload) => {
        window.localStorage.setItem('activeUser', JSON.stringify(payload));

        return axios.put(`/users/${payload.id}`).then(() => {
            commit('setUser', payload)
        })
    },

    fetchUsers: ({commit}) => {
        return axios.get('/users').then(response => {
            commit('setUsers', response.data)
        })
    },
    createUser: ({commit, dispatch}, payload) => {
        // All other settings pages are rows tied to the current user. This one is different
        delete payload.user_id

        return axios.post('/users',payload).then(response => {
            payload.id = response.data
            dispatch('fetchUsers')
            // dispatch('setActiveUser', payload)
        })
    },
    updateUser: ({commit}, payload) => {
        return axios.put('/users/', payload)
    },
    deleteUser: ({commit}, payload) => {
        return axios.delete(`/users/${payload.id}`)
    },


    // Settings
    fetchWidgets: ({commit, getters}) => {
        return axios.get(`/widgets/${getters.getUser.id}`).then(response => {
            util.trackResult('widgets', 2, response.data)

            commit('setWidgets', response.data)
        })
    },
    updateWidget: ({commit}, payload) => {
        return axios.put('/widgets/',payload)
    },


    // Location Controllers
    fetchLocations: ({commit, getters}) => {
        return axios.get(`/locations/${getters.getUser.id}`).then(response => {
            util.trackResult('locations', 2, response.data)

            commit('setLocations', response.data)
        })
    },
    updateLocation: ({commit, dispatch}, payload) => {
        // If id is 0, we are creating a new location
        if (payload.id == null) {
            return axios.post('/locations/',payload).then(response => {
                dispatch('fetchLocations')
            })
        } else {
            return axios.put('/locations/',payload).then(response => {
                dispatch('fetchLocations')
            })
        }
    },
    deleteLocation: ({commit, dispatch}, payload) => {
        return axios.put('/locations/delete',payload).then(response => {
            dispatch('fetchLocations')
        })
    },


    setTravelText: ({commit}, payload) => {
        commit('setTravelText', payload)
    },
    // Update User's map settings
    fetchMapsSettings: ({commit, getters, dispatch}) => {
        return axios.get(`/locations/settings/${getters.getUser.id}`).then(response => {
            util.trackResult('maps settings', 2, response.data)

            commit('setMapsSettings', response.data[0])
        })
    },
    updateMapSettings: ({commit, dispatch}, payload) => {
        return axios.put('/locations/settings',payload).then(response => {
            dispatch('fetchMapsSettings')
        })
    },


    // Favourites Controllers
    fetchFavourites: ({commit, getters}) => {
        return axios.get(`/favourites/${getters.getUser.id}`).then(response => {
            util.trackResult('favourites', 2, response.data)

            commit('setFavourites', response.data)
        })
    },
    updateFavourite: ({commit, dispatch}, payload) => {
        console.log('updateFavourite', payload.id);
        // If id is 0, we are creating a new location
        if (payload.id == null) {
            return axios.post('/favourites/',payload).then(response => {
                dispatch('fetchFavourites')
            })
        } else {
            return axios.put('/favourites/',payload).then(response => {
                dispatch('fetchFavourites')
            })
        }
    },
    deleteFavourite: ({commit, dispatch}, payload) => {
        return axios.put('/favourites/delete',payload).then(response => {
            dispatch('fetchFavourites')
        })
    },

    setWeather: ({commit}, payload) => {
        commit('setWeather', payload)
    },

    // News Controllers
    fetchNews: ({commit, dispatch}, payload) => {
        const dt = new Date()
        const dateStr = `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}`

        return axios.get(`https://content.guardianapis.com/search?q=${payload}&from-date=${dateStr}&api-key=${process.env.MIX_GAURDIAN_KEY}`).then(response => {
            util.trackResult('news', 1, response.data.response.results)

            commit('setNews', response.data.response.results)
        })
    },
    fetchCategorys: ({commit, getters}) => {
        return axios.get(`/news/categorys/${getters.getUser.id}`).then(response => {
            util.trackResult('categorys', 2, response.data)

            commit('setCategorys', response.data)
        })
    },
    updateCategory: ({commit, dispatch}, payload) => {
        // If id is 0, we are creating a new location
        if (payload.id == null) {
            return axios.post('/news/categorys/create',payload).then(response => {
                dispatch('fetchCategorys')
            })
        } else {
            return axios.put('/news/categorys/',payload).then(response => {
                dispatch('fetchCategorys')
            })
        }
    },
    deleteCategory: ({commit, dispatch}, payload) => {
        return axios.put('/news/categorys/delete',payload).then(response => {
            dispatch('fetchCategorys')
        })
    },


    // Notes Controllers
    fetchNotes: ({commit, getters}) => {
        return axios.get(`/notes/${getters.getUser.id}`).then(response => {
            util.trackResult('notes', 2, response.data)

            commit('setNotes', response.data)
        })
    },
    updateNote: ({commit, dispatch}, payload) => {
        // If id is 0, we are creating a new location
        // if (payload.id == null) {
        //     return axios.post('/notes/',payload).then(response => {
        //         dispatch('fetchNotes')
        //     })
        // } else {
            return axios.put('/notes/',payload).then(response => {
                dispatch('fetchNotes')
            })
        // }
    },
    deleteNote: ({commit, dispatch}, payload) => {
        return axios.put('/notes/delete',payload).then(response => {
            dispatch('fetchNotes')
        })
    },


    // Trello Controllers
    fetchTrelloCredentials: ({ commit, getters }) => {
        return axios.get(`/trello/${getters.getUser.id}`).then(trelloCreds => {
            util.trackResult('trello credentials', 2, trelloCreds.data)

            commit('setTrelloCreds', trelloCreds.data)
        })
    },
    updateTrelloCredentials: ({commit, dispatch}, payload) => {
        // If id is 0, we are creating a object
        if (payload.id == null) {
            return axios.post('/trello/',payload).then(response => {
                dispatch('fetchTrelloCredentials')
            })
        } else {
            return axios.put('/trello/',payload).then(response => {
                dispatch('fetchTrelloCredentials')
            })
        }
    },
    deleteTrelloCredentials: ({commit, dispatch}, payload) => {
        return axios.put('/trello/delete', payload).then(response => {
            dispatch('fetchTrelloCredentials')
        })
    },
    fetchBoard: ({commit, getters}) => {
        for (let credential of getters.getTrelloCreds) {
            return axios.get(`https://api.trello.com/1/boards/${credential.board_id}?key=${credential.developer_key}&token=${credential.token}`).then(board => {
                util.trackResult('trello boards', 1, board.data)

                commit('pushBoard', board.data)
            })
        }
    },
    fetchTrelloCards: ({commit}) => {
        state.cards = []

        return axios.get(`https://api.trello.com/1/boards/5e0b302d93a3935125fd3503/cards?key=${process.env.MIX_TRELLO_KEY}&token=${process.env.MIX_TELLO_TOKEN}`).then(response => {
            util.trackResult('trello cards', 1, response.data)

            commit('pushCards', response.data)
        })
    },

    fetchBackgrounds: ({commit}) => {
        return axios.get('/background/all').then(response => {
            util.trackResult('background', 2, response.data)

            commit('setBackgrounds', response.data)
        })
    },

    uploadFile: ({commit}, payload) => {
        if (payload.route && payload.file) {
            var fileReader = new FileReader()
            fileReader.readAsDataURL(payload.file)

            fileReader.onload = (e) => {
                let data = {
                    object: payload.object,
                    file: {
                        'src':  e.target.result,
                        'name': payload.file.name,
                        'type': payload.file.type,
                        'size': payload.file.size
                    }
                }

                return axios.post(payload.route, data)
            }
        }
    },

    fetchAnalytics: ({commit}, payload) => {
        // Clear the events to show the spinner during request
        commit('setEvents', null)

        return axios.post('/analytics', payload).then(response => {
            util.trackResult('analytics', 2, response.data)

            commit('setEvents', response.data)

            return response
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
