import Vuex from "vuex";

const createStore = () => {
    return new Vuex.Store({
        state: {
            headlines: [],
            loading: false,
            category: '',
            country: 'us',
            token: ''
        },

        mutations: {
            setHeadlines (state, headlines) {
                state.headlines = headlines;
            },

            setLoading(state, loading) {
                state.loading = loading;
            },

            setCategory (state, category) {
                state.category = category;
            },

            setCountry (state, country) {
                state.country = country;
            },

            setToken (state, token) {
                state.token = token;
            }
        },

        actions: {
            async loadHeadlines ({ commit }, apiUrl) {
                commit('setLoading', true);
                const { articles } = await this.$axios.$get(apiUrl);
                commit('setLoading', false);
                commit("setHeadlines", articles);
            },

            async authenticateUser ({ commit }, userPayload) {
                try {
                    commit('setLoading', true);
                    const authUserData = await this.$axios.$post(
                        "/register/",
                        userPayload
                    );
                    commit('setToken', authUserData.idToken);
                    commit('setLoading', false);
                } catch (e) {
                    console.error(e);
                    commit('setLoading', true);
                }
            }
        },

        getters: {
            headlines: state => state.headlines,
            loading: state => state.loading,
            category: state => state.category,
            loading: state => state.loading,
            country: state => state.country,
            isAuthenticated: state => !!state.token
        },
    })
}

export default createStore;
