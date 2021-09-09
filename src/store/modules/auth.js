export default {
    state: {
        user: null,
    },
    getters: {
        user(state){
            return state.user
        }
    },
    actions: {
        logutUser(context, user){
            context.commit('updateUser', user);
        }
    },
    mutations: {
        updateUser(state, { user }){
            state.user = user
        },
    }
}