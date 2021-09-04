<template>
    <div class="cards">
        <div class="cards__content">
            <header class="cards__header">
                <div class="content">
                    <h2 class="page__title">Overview</h2>
                    <button class="button--addCard">+ Add card</button>
                </div>
                <div class="content">
                    <!-- <select name="popular" id="popular" class="button--popular">
                        <option value="popular" class="button--option">popular</option>
                    </select> -->
                </div>
            </header>  
            <ul class="cards-list">
                <li v-for="card in allCards" :key="card.id" class="card">
                    <img v-if="(card.type==='saving')" src="../assets/bg-saving.png" class="card__background">
                    <img v-if="(card.type==='credit')" src="../assets/bg-credit.png" class="card__background">
                    <img v-if="(card.type==='debit')" src="../assets/bg-debit.png" class="card__background">
                    
                    <div class="card__currency">{{ card.currency }}</div>
                    <img class="card__chip" src="../assets/Chip.png" alt="chip">
                    <img v-if="(card.name==='visa')" src="../assets/viza.png" class="card__logo">
                    <img v-if="(card.name==='master card')" src="../assets/master-card.png"  class="card__logo">
                    <div class="card__total">{{ card.total }}</div>
                    <div class="card__holder">Card holder <span class="card__holder--name">{{ card.holder }}</span></div>
                </li>
            </ul>
            <ul class="info-list">
                <li class="info-list__item">
                    <p class="info-list__title">Income</p>
                    <div class="info-list__cash">
                        <p class="info-list__sum">$32,134</p>
                        <p class="info-list__trend">↑2.5%</p>
                    </div>
                    <p class="info-list__computed-date">Compared to $890 last month</p>
                </li>
                <li class="info-list__item">
                    <p class="info-list__title">Spend this week</p>
                    <div class="info-list__cash">
                        <p class="info-list__sum">2307</p>
                        <p class="info-list__trend">-2.5%</p>
                    </div>
                    <p class="info-list__computed-date">Compared to $890 last month</p>
                </li>
                <li class="info-list__item">
                    <p class="info-list__title">Cashback</p>
                    <div class="info-list__cash">
                        <p class="info-list__sum">$1,324</p>
                        <p class="info-list__trend">+4.5%</p>
                    </div>
                    <p class="info-list__computed-date">Compared to $890 last month</p>
                </li>
                <li class="info-list__item">
                    <p class="info-list__title">Spending trend</p>
                    <div class="info-list__cash">
                        <p class="info-list__sum">87%</p>
                        <p class="info-list__trend">+4.5%</p>
                    </div>
                    <p class="info-list__computed-date">Compared to $890 last month</p>
                </li>
            </ul>
            <div class="fast-payment">
                <div class="fast-payment__title">Fast payment</div>
                <!-- <md-button class="md-primary md-raised" @click="showDialog = true">Show Dialog</md-button> -->
                <button class="fast-payment__button payment" @click="showDialog = true">+</button>
                <ul class="fast-payment__list">
                    <li v-for="(payment, index) in allPayments" :key="payment.id" @click="clickFastPayment(payment)">
                        <div class="payment">
                            <span class="payment__point" v-bind:style="{ 'background-color': paymentColor[index]}"></span>
                            <span class="payment__name">{{ payment.name }}</span>
                            <span class="payment__sum">{{ payment.sum }}</span>
                        </div>
                    </li>
                </ul>
                
            </div>
            <div>
                <md-dialog :md-active.sync="showDialog">
                    <md-dialog-title>New payment</md-dialog-title>
                        <label>Input type of payment</label>
                        <input type="text" v-model="typePayment" required>
                        <select name="selectDepartment" id="selectDepartment" v-on:change="selectOptionDepartment">Department
                            <option value="Close"> Close </option>
                            <option value="Events"> Events </option>
                            <option value="Cafe"> Cafe </option>
                            <option value="Shop"> Shop </option>
                            <option value="Food"> Food </option>
                            <option value="Other"> Other </option>
                        </select>
                        <label>Input sum</label>
                        <input type="text" v-model="sumPayment" required>
                        <select name="selectCard" id="selectCard" v-on:change="selectOptionCard">From card
                            <option v-for="card in allCards" :key="card.number" :value="card.number"> {{ card.name }}, {{ card.currency }}, {{ card.total }}</option>
                        </select>

                    <md-dialog-actions>
                        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
                        <md-button class="md-primary" @click="addPayment()">Save</md-button>
                    </md-dialog-actions>
                </md-dialog>  
            </div>
        </div>  
    </div>  
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
    data() {
        return {
            typePayment: null,
            sumPayment: null, 
            showDialog: false, 
            selectDepartment: null,
            selectCard: null,
            paymentColor: ['red', 'blue', 'coral','yellow', 'green', 'pink','aqua', 'blueviolet', 'brown', 'chocolate', 'grey', 'crimson']
            }      
    },
    computed: mapGetters(['allCards', 'allPayments']),
    async created(){
        this.fetchCards();
        this.fetchPayments();
    },
    mounted(){
        // this.$store.dispatch('fetchCards')
    },
    methods: {
        ...mapActions(['fetchCards', 'fetchPayments', 'clickFastPayment', 'addPaymentFromDialog']),
        createCard(){
        },
        addPayment(){
            this.showDialog = true;
            let payment = {};
            payment.name = this.typePayment;
            payment.sum = this.sumPayment;
            payment.cardNumber = this.selectCard;
            payment.department = this.selectDepartment;
            payment.paymentid = 10;
            payment.cardId = '';
            if (payment.name !== null && payment.sum !== null) {
                this.addPaymentFromDialog(payment);
                this.showDialog = false
             }
             else alert('Please, fill the form!');
        },
        selectOptionDepartment: function(e){
            this.selectDepartment = e.target.value;
            return this.selectDepartment;
        },
        selectOptionCard: function(e){
            this.selectCard = e.target.value;
            return this.selectCard;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>