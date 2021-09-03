import { db } from '../../main.js'
import { collection, getDocs, setDoc, doc } from "firebase/firestore"; 
// import { push } from 'core-js/core/array';

export default {
    state: {
        cards: [],
        payments: [],
    },
    getters: {
        allPayments(state){
            return state.payments
        },
        allCards(state){
            return state.cards
        },
    },
    actions: {
        async fetchCards(context){
            let cards = []
            await getDocs(collection(db, "cards"))
            .then( docs => docs.forEach((doc) => {
                cards.push(doc.data());}));
            context.commit('updateCards', cards)
        },
        async fetchPayments(context){
            let payments = []
            await getDocs(collection(db, "payments"))
            .then( docs => docs.forEach((doc) => {
                payments.push(doc.data());}));
            context.commit('updatePayments', payments)
        },
        // addPaymentFromDialog(context, payment){
        //     let payments = []
        //     console.log('Hi from Vuex Payment', payment)
        //     console.log(payments)
        //     payments.push(payment)
        //     context.commit('updatePayments', payments)
        // },
        async addPaymentFromDialog({commit, dispatch}, payment){
            let ID =  await dispatch('idGenerator');
            console.log(ID)
            await setDoc(doc(db, "payments", ID), {
                        sum: payment.sum,
                        name: payment.name,
                        department: payment.department,
                        cardNumber: payment.cardNumber,
                        })
            dispatch('fetchPayments')
            commit('updatePayments')
        },
    },
    mutations: {
        updateCards(state, cards){
            state.cards = cards
        },
        updatePayments(state, payments){
            state.payments = payments
        }
    }
}