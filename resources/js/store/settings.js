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
    mapsSettings: null,

    backgrounds: null,

    weather: null,

    news: null,
    categorys: null,

    notes: null,

    board: null,
    cards: null,

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
    getLocation: (state) => {return state.lat && state.lng ? state.lat+','+state.lng : null},

    // Settings
    getWidgets: (state) => state.widgets,
    getLocations: (state) => state.locations,
    getFavourites: (state) => state.favourites,
    getMapsSettings: (state) => state.mapsSettings,

    getBackgrounds: (state) => state.backgrounds,

    getWeather: (state) => state.weather,

    getNews: (state) => state.news,
    getCategorys: (state) => state.categorys,

    getNotes: (state) => state.notes,

    getBoard: (state) => state.board,
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
    setMapsSettings: (state, payload) => { state.mapsSettings = payload },

    setBackgrounds: (state, payload) => { state.backgrounds = payload },

    setWeather: (state, payload) => { state.weather = payload },

    setNews: (state, payload) => { state.news = payload },
    setCategorys: (state, payload) => { state.categorys = payload },

    setNotes: (state, payload) => { state.notes = payload },

    setBoard: (state, payload) => { state.board = payload },
    setCards: (state, payload) => { state.cards = payload },

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
        let user = window.localStorage.getItem('activeUser')

        if (!user || !(user = JSON.parse(user))) {
            UIkit.notification({message: "Failed to find active user from local storage", status:'danger'})
            return Promise.reject('user_not_found')
        } else {
            dispatch('setActiveUser', user)
            return axios.put('/users', user)
        }
    },

    setActiveUser: ({commit, dispatch}, payload) => {
        window.localStorage.setItem('activeUser', JSON.stringify(payload));
        return axios.put('/users', payload).then(() => {
            commit('setUser', payload)
        })
    },

    fetchUsers: ({commit}) => {
        return axios.get('/users').then(response => {
            // console.log('%c Users', 'background: #222; color: #bada55');
            // console.log(response.data);
            commit('setUsers', response.data)
        })
    },
    createUser: ({commit, dispatch}, payload) => {
        return axios.post('/users',payload).then(response => {
            console.log(response);
            payload.id = response.data
            dispatch('fetchUsers')
            dispatch('setActiveUser', payload)
        })
    },


    // Settings
    fetchWidgets: ({commit}) => {
        return axios.get('/widgets/').then(response => {
            util.trackResult('widgets', 2, response.data)

            commit('setWidgets', response.data)
        })
    },
    updateWidget: ({commit}, payload) => {
        return axios.put('/widgets/',payload)
    },


    // Location Controllers
    fetchLocations: ({commit}) => {
        return axios.get('/locations/').then(response => {
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

    // Update User's map settings
    fetchMapsSettings: ({commit, dispatch}) => {
        return axios.get('/locations/settings').then(response => {
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
    fetchFavourites: ({commit}) => {
        return axios.get('/favourites/').then(response => {
            util.trackResult('favourites', 2, response.data)

            commit('setFavourites', response.data)
        })
    },
    updateFavourite: ({commit, dispatch}, payload) => {
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
    fetchCategorys: ({commit}) => {
        return axios.get('/news/categorys/').then(response => {
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
    fetchNotes: ({commit}) => {
        return axios.get('/notes/').then(response => {
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
    fetchBoard: ({commit}) => {
        return axios.get(`https://api.trello.com/1/boards/5e0b302d93a3935125fd3503?key=${process.env.MIX_TRELLO_KEY}&token=${process.env.MIX_TELLO_TOKEN}`).then(board => {
            // axios.get(`https://api.trello.com/1/boards/5e0b302d93a3935125fd3503/actions?key=${process.env.MIX_TRELLO_KEY}&token=${process.env.MIX_TELLO_TOKEN}`).then(actions => {
                // board.data['actions'] = actions.data
                util.trackResult('trello boards', 1, board.data)

                commit('setBoard', board.data)
            // })
        })
    },
    fetchTrelloCards: ({commit}) => {
        return axios.get(`https://api.trello.com/1/boards/5e0b302d93a3935125fd3503/cards?key=${process.env.MIX_TRELLO_KEY}&token=${process.env.MIX_TELLO_TOKEN}`).then(response => {
            util.trackResult('trello cards', 1, response.data)

            commit('setCards', response.data)
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

    fetchAnalytics: ({commit}) => {
        return axios.get('/analytics').then(response => {
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
