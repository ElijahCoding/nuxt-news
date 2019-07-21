import Vuex from "vuex";
import md5 from 'md5';

const createStore = () => {
    return new Vuex.Store({
        state: {
            headlines: [],
            loading: false,
            category: '',
            country: 'us',
            token: '',
            user: null
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
            },

            setUser (state, user) {
                state.user = user;
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
                    const avatar = `http://gravatar.com/avatar/${md5(authUserData.email)}?d=identicon`;
                    const user = { email: authUserData.email, avatar };
                    commit('setUser', user);
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
            isAuthenticated: state => !!state.token,
            user: state => state.user
        },
    })
}

export default createStore;
