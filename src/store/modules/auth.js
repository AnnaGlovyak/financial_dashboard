// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
    },
    mutations: {
        updateUser(state, { user }){
            state.user = user
        },
    }
}