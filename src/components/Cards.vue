<template>
    <div class="cards">
        <div class="cards__content">
            <header class="cards__header">
                <div class="content">
                    <h2 class="page__title">Overview</h2>
                    <button class="button--addCard" @click="showDialogCard = true">+ Add card</button>
                </div>
                <div class="content">
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
            <ul class="info-list" v-if="allCurrency">
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
                <li class="info-list__currency-table">
                    <div class="info-list__currency" v-for="currency in allCurrency" :key="currency.id">
                        <!-- <p class="info-list__title">Spending trend</p> -->
                        <p class="info-list__currency-name">{{ currency.ccy + ' / ' + currency.base_ccy}}</p>
                        <div class="info-list__currency-price">
                            <p class="info-list__currency-price--buy">{{ currency.buy.substring(0,5) }}</p>
                            <div>
                                <div></div>
                                <p class="info-list__computed-date">sale <span class="info-list__currency-price--sale">{{ currency.sale.substring(0,5) }}</span></p>
                            </div>
                            
                        </div>
                        
                    </div>
                    <!-- <div class="info-list__item">
                        <p class="info-list__title">Income</p>
                        <div class="info-list__cash">
                            <p class="info-list__sum">$32,134</p>
                            <p class="info-list__trend">↑2.5%</p>
                        </div>
                        <p class="info-list__computed-date">Compared to $890 last month</p>
                    </div> -->
                </li>
            </ul>
            <div class="fast-payment">
                <div class="fast-payment__title">Fast payment</div>
                <!-- <md-button class="md-primary md-raised" @click="showDialog = true">Show Dialog</md-button> -->
                <button class="fast-payment__button" @click="showDialog = true">+</button>
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
            <div><!--dialog for payments-->
                <md-dialog :md-active.sync="showDialog" class="cards__modal modal">
                    <md-dialog-title class="modal__title">New payment</md-dialog-title>
                    <div class="modal__conteiner">
                        <label class="modal__input-label">Input name of payment</label>
                        <input type="text" v-model="typePayment" required class="modal__input">
                        
                        <select class="modal__select" name="selectDepartment" id="selectDepartment" v-on:change="selectOptionDepartment" required>
                            <option value="" disabled selected hidden>Choose category</option>
                            <option class="modal__option" value="Cafe"> Cafe </option>
                            <option class="modal__option" value="Pharmacy"> Pharmacy </option>
                            <option class="modal__option" value="Food"> Food </option>
                            <option class="modal__option" value="Other"> Other </option>
                        </select>
                        <label class="modal__input-label">Input sum</label>
                        <input type="text" v-model="sumPayment" required class="modal__input">
                        <select class="modal__select" name="selectCard" id="selectCard" v-on:change="selectOptionCard" required>
                            <option value="" disabled selected hidden>Choose card</option>
                            <option class="modal__option" v-for="card in allCards" :key="card.number" :value="card.number"> {{ card.name }}, {{ card.currency }}, {{ card.total }}</option>
                        </select>
                    </div>
                        

                    <md-dialog-actions>
                        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
                        <md-button class="md-primary" @click="addPayment()">Save</md-button>
                    </md-dialog-actions>
                </md-dialog>  
            </div>
            <div><!-- dialog for new card -->
                <md-dialog :md-active.sync="showDialogCard" class="cards__modal modal">
                    <md-dialog-title class="modal__title">Create new card</md-dialog-title>
                    <div class="modal__conteiner">
                        <label class="modal__input-label">Input card number</label>
                        <input type="text" v-model="newCardNumber" required class="modal__input">
                        <label class="modal__input-label">Input card password</label>
                        <input type="text" v-model="newCardPassword" required class="modal__input">
                        <select class="modal__select" name="selectNewCardCurrency" id="selectNewCardCurrency" v-on:change="selectOptionNewCardCurrency" required>
                            <option value="" disabled selected hidden>Choose currency</option>
                            <option class="modal__option" value="rub"> rub </option>
                            <option class="modal__option" value="usd"> usd </option>
                            <option class="modal__option" value="eur"> eur </option>
                        </select>
                        <select class="modal__select" name="selectNewCardType" id="selectNewCardType" v-on:change="selectOptionNewCardType" required>
                            <option value="" disabled selected hidden>Choose card type</option>
                            <option class="modal__option" value="debit"> debit </option>
                            <option class="modal__option" value="saving"> saving </option>
                            <option class="modal__option" value="credit"> credit </option>
                        </select>
                        <select class="modal__select" name="selectNewCardName" id="selectNewCardName" v-on:change="selectOptionNewCardName" required>
                            <option value="" disabled selected hidden>Choose card name</option>
                            <option class="modal__option" value="master card"> master card </option>
                            <option class="modal__option" value="viza"> viza </option>
                        </select>
                        <label class="modal__input-label">Input holder</label>
                        <input type="text" v-model="newCardHolder" required class="modal__input">
                        <label class="modal__input-label">Input total sum</label>
                        <input type="text" v-model="newCardTotal" required class="modal__input">
                        <!-- <select class="modal__select" name="selectCard" id="selectCard" v-on:change="selectOptionCard" required>
                            <option value="" disabled selected hidden>Choose card</option>
                            <option class="modal__option" v-for="card in allCards" :key="card.number" :value="card.number"> {{ card.name }}, {{ card.currency }}, {{ card.total }}</option>
                        </select> -->
                    </div>
                        

                    <md-dialog-actions>
                        <md-button class="md-primary" @click="showDialogCard = false">Close</md-button>
                        <md-button class="md-primary" @click="addNewCard()">Add</md-button>
                    </md-dialog-actions>
                </md-dialog>  
            </div>
        </div>  
    </div>  
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'ProgressSpinnerSizes',
    data() {
        return {
            typePayment: null,
            sumPayment: null, 
            showDialog: false, 
            showDialogCard: false,
            selectDepartment: null,
            selectCard: null,

            newCardNumber: null,
            newCardPassword: null,
            newCardCurrency: null,
            newCardType: null,
            newCardName: null,
            newCardHolder: null,
            newCardTotal: 0,

            paymentColor: ['red', 'blue', 'coral','yellow', 'green', 'pink','aqua', 'blueviolet', 'brown', 'chocolate', 'grey', 'crimson']
            }     
    },
    computed: mapGetters(['allCards', 'allPayments','allCurrency']),
    created(){
        this.fetchCards();
        this.fetchPayments();
        this.getCurrency()
        console.log(this.allCurrency)
    },
    mounted(){
        // this.$store.dispatch('fetchCards')
        
    },
    methods: {
        ...mapActions(['fetchCards', 'fetchPayments', 'clickFastPayment', 'addPaymentFromDialog', 'addCard','getCurrency']),
        createCard(){
        },
        addPayment(){
            this.showDialog = true;
            let payment = {};
            payment.name = this.typePayment;
            payment.sum = Number(this.sumPayment);
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
        addNewCard(){
            this.showDialogCard = true;
            let newCard = {};
            newCard.number = this.newCardNumber,
            newCard.password = this.newCardPassword,
            newCard.currency = this.newCardCurrency,
            newCard.type = this.newCardType,
            newCard.name = this.newCardName,
            newCard.holder = this.newCardHolder,
            newCard.total = Number(this.newCardTotal)

            if(this.newCardType == 'viza'){
                newCard.logo = '../assets/viza.png'
            } else {
                newCard.logo = '../assets/master-card.png'
            }
            this.addCard(newCard);
            this.showDialogCard = false

        },
        selectOptionDepartment: function(e){
            this.selectDepartment = e.target.value;
            return this.selectDepartment;
        },
        selectOptionCard: function(e){
            this.selectCard = e.target.value;
            return this.selectCard;
        },
        selectOptionNewCardCurrency: function(e){
            this.newCardCurrency = e.target.value;
            return this.newCardCurrency;
        },
        selectOptionNewCardType: function(e){
            this.newCardType = e.target.value;
            return this.newCardType;
        },
        selectOptionNewCardName: function(e){
            this.newCardName = e.target.value;
            return this.newCardName;
        }
    }
}
</script>

<style lang="scss" scoped>
    .modal{
        display: flex;
    }
    

</style>