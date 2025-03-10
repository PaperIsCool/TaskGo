import { createStore } from 'vuex'

export default createStore({
    state: {
        user: null
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        },
        CLEAR_USER(state) {
            state.user = null
        }
    },
    actions: {
        async login({ commit }, details) {
            commit('SET_USER', user)
        },

        async logout({ commit }) {
            commit('CLEAR_USER')
        },

        async register({ commit }, details) {
            commit('SET_USER', user)
        }
    },
})