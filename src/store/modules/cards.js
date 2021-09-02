import { db } from '../../main.js'
import { collection, getDocs } from "firebase/firestore"; 

export default {
    state: {
        cards: []
    },
    getters: {
        allCards(state){
            return state.cards
        }
    },
    actions: {
        async fetchCards(context){
            let cards = []
            await getDocs(collection(db, "cards"))
            .then( docs => docs.forEach((doc) => {
                cards.push(doc.data());}));
            context.commit('updateCards', cards)
        }
    },
    mutations: {
        updateCards(state, cards){
            state.cards = cards
        }
    }
}