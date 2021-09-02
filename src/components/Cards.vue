<template>
    <div class="cards">
        <div class="cards__content">
            <header class="cards__header">
                <div class="content">
                    <h2 class="page__title">Overview</h2>
                    <button class="button--addCard">+ Add card</button>
                </div>
                <div class="content">
                    <select name="popular" id="popular" class="button--popular">
                        <option value="popular" class="button--option">popular</option>
                    </select>
                </div>
            </header>  
            <ul class="cards-list">
                <li v-for="card in allCards" :key="card.id" class="card">
                    <div class="card__currency">{{ card.currency }}</div>
                    <img class="card__chip" src="../assets/Chip.png" alt="chip">
                    <div class="card__name">{{ card.name }}</div>
                    <div class="card__total">{{ card.total }}</div>
                    <div class="card__holder">Card holder <span class="card__holder--name">{{ card.holder }}</span></div>
                </li>
            </ul>
            <ul class="info-list"></ul>
            <ul class="fast-payment">
                <div class="fast-payment__title">Fast payment</div>
                <!-- <md-button class="md-primary md-raised" @click="showDialog = true">Show Dialog</md-button> -->
                <button class="fast-payment__button payment" @click="showDialog = true">+</button>
                <li v-for="payment in payments" :key="payment.id" @click="clickFastPayment(payment)">
                    <div class="payment">{{ payment.name }} - {{ payment.sum }}</div>
                </li>
            </ul>
            <div>
                <md-dialog :md-active.sync="showDialog">
                    <md-dialog-title>New payment</md-dialog-title>
                        <label>Input type of payment</label>
                        <input type="text" v-model="typePayment" required>
                        <label>Input sum</label>
                        <input type="text" v-model="sumPayment" required>
                    <md-dialog-actions>
                        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
                        <md-button class="md-primary" @click="addPayment">Save</md-button>
                    </md-dialog-actions>
                </md-dialog>  
            </div>
        </div>  
    </div>  
</template>

<script>
// import axios from 'axios'
// import { db } from '../main.js'
// import { collection, getDocs } from "firebase/firestore"; 
import {mapGetters, mapActions} from 'vuex'

export default {
    data() {
        return {
            typePayment: null,
            sumPayment: null, 
            showDialog: false,   
            payments: [{
                    id: '12345',
                    name: 'cinema',
                    sum: 200,
                    cardId: '4991355787699056'
                },
                {
                    id: '12346',
                    name: 'dress',
                    sum: 1500,
                    cardId: '4991355787699056'
                },
                {
                    id: '12347',
                    name: 'avia',
                    sum: 7000,
                    cardId: '4991355787699056'
                },],
            }      
    },
    computed: mapGetters(['allCards']),
    async created(){
        this.fetchCards();
    },
    mounted(){
        // this.$store.dispatch('fetchCards')
    },
    methods: {
        ...mapActions(['fetchCards']),
        createCard(){
        },
        addPayment(){
            this.showDialog = true;
            let payment = {};
            payment.name = this.typePayment;
            payment.sum = this.sumPayment;
            if (payment.name !== null && payment.sum !== null) {
                this.payments.push(payment)
                this.showDialog = false
             }
             else alert('Please, fill the form!');
        },
        clickFastPayment(payment){
            this.$emit('do-fats-payment', payment)
        },
    }
}
</script>

<style lang="scss" scoped>

</style>