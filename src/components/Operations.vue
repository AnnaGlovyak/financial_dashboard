<template>
    <div class="operations">
        <div class="operations__content">
            <div class="transactions">
            <h2 class="transactions__title">Last transaction</h2>
            <ul class="transactions__list">
                <li class="transactions__item" v-for="transaction in allTransactions" :key="transaction.number">
                    <div class="transactions__category">
                        <div class="transactions__department">{{ transaction.department }}</div>
                        <div>
                            <div class="transactions__company">{{ transaction.company }} </div>
                            <div class="transactions__date">{{ transaction.date.toDate().toLocaleString().split(',')[0] }}</div>
                        </div> 
                    </div>
                    <div class="transactions__card-info">
                        <div class="transactions__card-logo">card logo </div>
                        <div class="transactions__card-number" >{{ transaction.cardNumber }}</div>
                    </div>
                    <div class="transactions__sum">{{ transaction.sum }} </div>
                </li>
            </ul>
            <button @click="idGenerator"> geterate ID </button> 
            </div>
            <div class="statistic">
                <h2 class="statistic__title">Statistic</h2>
            </div>
        </div> 
    </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
    
    data(){
        return{
            showDialog: false,
        }  
    },
    computed: {
        ...mapGetters(['allTransactions']),
        shortCardNumber(str){
            return str.substring(str.length - 5, str.length - 1)
        },
    },
    created(){
           
    },
    async mounted(){     
        this.fetchTransactions() 
    },
    async update(){
        this.fetchTransactions()
    },
    methods: {
        ...mapActions(['fetchTransactions', 'idGenerator']),
        addTransaction(payload){
            this.$emit('new-transaction', payload)
            console.log('new transaction from Operations')
        },
        
    }
}
</script>

<style lang="scss" scoped>

</style>>

