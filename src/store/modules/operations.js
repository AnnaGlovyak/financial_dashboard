import { db } from '../../main.js'
import { collection, getDocs } from "firebase/firestore"; 

export default {
    state: {
        transactions: []
    },
    getters: {
        allTransactions(state){
            return state.transactions
        }
    },
    actions: {
        async fetchTransactions(context){
            let transactions = []
            await getDocs(collection(db, "transactions"))
            .then( docs => docs.forEach((doc) => {
                transactions.push(doc.data());}));
            context.commit('updateTransactions', transactions)
        }
    },
    mutations: {
        updateTransactions(state, transactions){
            state.transactions = transactions
        }
    }
}