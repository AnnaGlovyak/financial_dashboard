import { db } from '../../main.js'
import { collection, getDocs, doc, setDoc, Timestamp, orderBy, limit, query} from "firebase/firestore"; 

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
            const q = query(collection(db, "transactions"), orderBy("date", "desc"), limit(15));
            await getDocs(q)
            .then( docs => docs.forEach((doc) => {
                    transactions.push(doc.data());}));
                context.commit('updateTransactions', transactions)
            context.commit('updateTransactions', transactions)
        },
        async clickFastPayment({commit, dispatch}, newTransaction){
            let ID =  await dispatch('idGenerator');
            console.log(ID)
            await setDoc(doc(db, "transactions", ID), {
                        sum: newTransaction.sum,
                        company: newTransaction.name,
                        department: newTransaction.department,
                        date: Timestamp.now(),
                        cardNumber: newTransaction.cardNumber,
                        // cardId: newTransaction.cardId,
                        // fastPaymentId: newTransaction.paymentid
                        })
            dispatch('fetchTransactions')
            commit('updateTransactions')
        },
        async idGenerator(){
            let newId = '';
            let words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
            let max_position = words.length - 1
            for(let i = 0; i < 20; i++){
                let position = Math.floor(Math.random() * max_position);
                newId = newId + words.substring(position - 1, position)
            }
            return newId;
        }
    },
    mutations: {
        updateTransactions(state, transactions){
            state.transactions = transactions
        }
    }
}