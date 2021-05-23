import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// Make Axios play nice with Django CSRF
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default new Vuex.Store({
    state: {
        user: [],
        notes: [],
        isAuthenticated: false,
        jwt: localStorage.getItem('token'),
        endpoints: {
            // TODO: Remove hardcoding of dev endpoints
            baseUrl: 'https://nesaweb.xyz/'
        }
    },
    getters: {
        notes: state => state.notes,
        user: state => state.user,
        isAuthenticated: state => state.isAuthenticated,
        jwt: state => state.jwt
    },
    mutations: {
        setAuthUser(state, isAuthenticated) {
            Vue.set(state, 'isAuthenticated', isAuthenticated)
        },
        updateToken(state, newToken) {
            // TODO: For security purposes, take localStorage out of the project.
            localStorage.setItem('token', newToken);
            state.jwt = newToken;
        },
        removeToken(state) {
            // TODO: For security purposes, take localStorage out of the project.
            localStorage.removeItem('token');
            state.jwt = null;
        },
        ADD_NOTE(state, note) {
            state.notes = [note, ...state.notes]
        },
        REMOVE_NOTE(state, {id}) {
            state.notes = state.notes.filter(note => {
                return note.id !== id
            })
        },
        SET_NOTES(state, {notes}) {
            state.notes = notes
        },

        GET_INFO_USER(state, {user}) {
            state.user = user
        },
    }
})
