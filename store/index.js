import Vuex from "vuex";

const createStore = () => {
    return new Vuex.Store({
        state: {
            headlines: [],
            loading: false
        },

        mutations: {
            setHeadlines (state, headlines) {
                state.headlines = headlines;
            },

            setLoading(state, loading) {
                state.loading = loading;
            },
        },

        actions: {
            async loadHeadlines ({ commit }, apiUrl) {
                commit('setLoading', true);
                const { articles } = await this.$axios.$get(apiUrl);
                commit('setLoading', false);
                commit("setHeadlines", articles);
            }
        },

        getters: {
            headlines: state => state.headlines,
            loading: state => state.loading,
        },
    })
}

export default createStore;
