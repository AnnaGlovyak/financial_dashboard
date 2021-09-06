import { db } from '../../main.js'
import { collection, getDocs, doc, setDoc, Timestamp, orderBy, limit, query, where, updateDoc} from "firebase/firestore"; 
// import { forEach } from 'core-js/core/array';

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
        async fetchTransactions({commit, dispatch}, col = 7){
            await dispatch('fetchCards');
            let transactions = []
            const q = query(collection(db, "transactions"), orderBy("date", "desc"), limit(col));
            await getDocs(q)
            .then( docs => docs.forEach((doc) => {
                    transactions.push(doc.data());}));
            commit('updateTransactions', transactions)
            commit('updateTransactions', transactions)
        },
        async clickFastPayment({commit, dispatch}, newTransaction){
            let ID =  await dispatch('idGenerator');
            console.log(ID)
            await setDoc(doc(db, "transactions", ID), {
                        sum: Number(newTransaction.sum),
                        company: newTransaction.name,
                        department: newTransaction.department,
                        date: Timestamp.now(),
                        cardNumber: newTransaction.cardNumber,
                        // cardId: newTransaction.cardId,
                        // fastPaymentId: newTransaction.paymentid
                        })
            dispatch('getCardByParametr', newTransaction)
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
        },
        async getCardByParametr({ dispatch}, transaction){
            let cardByParametr = null
            let ID = ''
            let newTotal = 0
            await getDocs(collection(db,"cards"), where("number", "==", "4995678936570320"))
            .then( docs => docs.forEach((doc) => {

                if(doc.data().number == transaction.cardNumber){
                    ID = doc.id
                    cardByParametr = doc.data()
                }
            }));
            console.log(cardByParametr, ID)
            if(cardByParametr.total < transaction.sum){
                alert("error");///здесь нужно прервать операцию
                }
            newTotal = cardByParametr.total - transaction.sum
            console.log(cardByParametr, ID);
            await updateDoc(doc(db, "cards", ID), {
                total: newTotal
                })
            dispatch('fetchCards')
        }
    },
    mutations: {
        updateTransactions(state, transactions){
            state.transactions = transactions
        }
    }
}