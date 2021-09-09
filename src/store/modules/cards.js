import { db } from '../../main.js'
import { collection, getDocs, setDoc, doc } from "firebase/firestore"; 
import axios from 'axios';

export default {
    state: {
        cards: [],
        payments: [],
        currency: []
    },
    getters: {
        allPayments(state){
            return state.payments
        },
        allCards(state){
            return state.cards
        },
        allCurrency(state){
            return state.currency
        }
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
        async addCard({commit, dispatch}, newCard){
            console.log('Hi from addCard')
            let ID = await dispatch('idGenerator')
            await setDoc(doc(db, "cards", ID), {
                currency: newCard.currency,
                holder: newCard.holder,
                logo: newCard.logo,
                name: newCard.name,
                number: newCard.number,
                password: newCard.password,
                total: newCard.total,
                type: newCard.type
                })
            dispatch('fetchCards')
            commit('updateCards')
        },
        async getCurrency(context){
            let currency = []
            await axios
            .get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
            .then(response => {
                response.data
                .forEach(resp => {currency.push(resp) })
            })
            currency.pop()
            context.commit('updateCurrency', currency)
        }
        
    },
    mutations: {
        updateCards(state, cards){
            state.cards = cards
        },
        updatePayments(state, payments){
            state.payments = payments
        },
        updateCurrency(state, currency){
            state.currency = currency
        }
    }
}