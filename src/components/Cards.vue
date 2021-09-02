<template>
    <div class="cards">
        <div class="cards__content">
            <header class="cards__header">
                <div class="content">
                    <h2 class="page__title">Overview</h2>
                    <button class="button--addProduct">+ Add product</button>
                </div>
                <div class="content">
                    <select name="popular" id="popular" class="button--popular">
                        <option value="popular" class="button--option">popular</option>
                    </select>
                    
                </div>
            </header>
            
            <ul class="cards-list">
                <li v-for="card in cards" :key="card.id" class="card">
                    <div class="card__name">{{ card.name }}</div>
                    <div class="card__currency">{{ card.currency }}</div>
                    <div class="card__total">{{ card.total }}</div>
                </li>
            </ul>
            <ul class="info-list"></ul>
            <ul class="fast-payment">
                <div class="fast-payment__title">Fast payment</div>
                <!-- <md-button class="md-primary md-raised" @click="showDialog = true">Show Dialog</md-button> -->
                <button class="fast-payment__button payment" @click="showDialog = true">+</button>
                <li v-for="payment in payments" :key="payment.id">
                    <div class="payment">{{ payment.name }} - {{ payment.sum }}</div>
                </li>
            </ul>
            <div>
                <md-dialog :md-active.sync="showDialog">
                    <md-dialog-title>New payment</md-dialog-title>
                        <label>Input type of payment</label>
                        <input type="text" v-model="typePayment">
                        <label>Input sum</label>
                        <input type="text" v-model="sumPayment">
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
import { db } from '../main.js'
import { collection, getDocs } from "firebase/firestore"; 



export default {
    data() {
        return {
            typePayment: '',
            sumPayment: 0,
            showDialog: false,
            cards: [],
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
    computed: {
       
    },
    created(){
        // this.fetchCards();
        
        var that = this

        async function func(){
            console.log(that.cards);
            
            return await getDocs(collection(db, "cards"))
            .then( docs => docs.forEach((doc) => {
                that.cards.push(doc.data());}))
                }
        
        func() 
    },
    mounted(){
  
    },
    methods: {
        createCard(){
            
        },
        // fetchCards(){
        //     axios.get('cards.json')
        //         .then(result => this.cards = result.data.cards);
        // },
        addPayment(typePayment, sumPayment){
            this.showDialog = true;
            // console.log(typePayment, sumPayment)
            let payment = {};
            payment.name = this.typePayment;
            payment.sum = this.sumPayment;
            payment !== undefined ? this.payments.push(payment) : console.log('error', payment)
            this.showDialog = false
            
        },
    }
}
</script>

<style lang="scss" scoped>

    .cards {
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        height: 554px;
        padding-top: 30px;
        max-width: 1600px;
        width: 100%;
        background: radial-gradient(67.22% 50% at 50% 50%, rgba(255, 100, 51, 0.15) 0%, rgba(245, 228, 255, 0) 100%);
        position: relative;
        
        z-index: 1;
        margin-bottom: 20px;
        overflow: hidden;
    }
    .cards::before{
        content: '';
        max-width: 1600px;
        width: 100%;
        height: 554px;
        position: absolute;
        background-color: #F2F3F7;
        background-image: radial-gradient(67.22% 50% at 50% 50%, rgba(51, 231, 255, 0.15) 0%, rgba(245, 228, 255, 0) 100%);
        
        opacity: 0.9;
        z-index: -1;
    }
    .cards__content {
        max-width: 1200px;
        width: 100%;
        margin: 0 auto;
        // display: flex;
        // justify-content: center;
    }
    .page__title {
        font-style: normal;
        font-weight: bold;
        font-size: 40px;
        line-height: 60px;
        color: #2E2E3A;
    }

    .cards__header {
        max-width: 1150px;
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        margin-bottom: 30px;
        
    }
    .content {
        display: flex;
        align-items: center;
        
    }
    button {
        height: 20px;
    }
    .button--addProduct {
        width: 166px;
        height: 36px;
        border: 1px solid #0062FF;
        box-sizing: border-box;
        border-radius: 6px;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 16px;
        color: #0062FF;
        margin: 0px 12px;
        margin: 0px 24px;
    }
    .button--popular {
        padding: 9px 20px;
        width: 130px;
        height: 36px;
        border: none;
    }
    .button--option {
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 16px;
    }
    .cards-list {
        display: flex;
        list-style: none;
        max-width: 1144px;
        width: 100%;
        font-size: 16px;
        justify-content: space-between;
        padding-left: 0;
        margin: 0 auto;
    }
    .card {
        width: 368px;
        height: 220px;
        box-shadow: inset 0px 1px 1px rgba(255, 255, 255, 0.25);
        border-radius: 20px;
        background: linear-gradient(90deg, #02AAB0 0%, #00CDAC 100%);
        -webkit-box-shadow: 5px 52px 32px -1px rgba(32, 190, 151, 0.14);
        -moz-box-shadow: 5px 52px 32px -1px rgba(33, 182, 145, 0.14);
        box-shadow: 5px 52px 32px -1px rgba(31, 161, 129, 0.14);
    }
    .card__total {
        font-style: normal;
        font-weight: 800;
        font-size: 36px;
        line-height: 35px;
        color: #FFFFFF;
    }
    // select {
    //     width: 130px;
    //     height: 36px;
    //     background: #FFFFFF;
    //     border-radius: 6px;
    //     padding: 9px 20px;
    // }
    .fast-payment {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        list-style: none;
        font-size: 16px;
        padding-left: 0;
        padding: 0 20px;
        height: 98px;
        border-top: 1px solid #E2E2EA;
    }
    .fast-payment__title {
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 18px;
    }
    .fast-payment__button {
        cursor: pointer;
    }
    .payment{
        width: 146px;
        height: 36px;
        background: #FFFFFF;
        border-radius: 100px;
        padding: 10px 16px;
        border: none;
    }
    
</style>