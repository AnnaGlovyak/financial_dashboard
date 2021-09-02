<template>
    <div class="operations">
        <div class="operations__content">
            <div class="transactions">
            <h2 class="transactions__title">Last transaction</h2>
            <ul class="transactions__list">
                <li class="transactions__item" v-for="transaction in allTransactions" :key="transaction.number">
                    <div class="transactions__date">{{ transaction.date }}</div>
                    <!-- <div class="transaction__card">{{ transaction.cardId }}</div> -->
                    <div class="transactions__company">{{ transaction.company }} </div>
                    <div class="transactions__department">{{ transaction.department }}</div>
                    <div class="transactions__sum">{{ transaction.sum }} </div>
                    <!-- <div class="transactions__date"> </div> -->
                </li>
            </ul>
            <button @click="addTransaction(payload)"> Add transaction </button> 
            </div>
            <div class="statistic">
                <h2 class="statistic__title">Statistic</h2>
            </div>
        </div> 
    </div>
</template>

<script>
// import axios from 'axios'
// import { db } from '../main.js'
// import { collection, getDocs, setDoc, doc} from "firebase/firestore"; 
import {mapGetters, mapActions} from 'vuex'

export default {
    
    data(){
        return{
        }  
    },
    computed: mapGetters(['allTransactions']),
    async created(){
        this.fetchTransactions()     
    },
    mounted(){    
    },
    methods: {
        ...mapActions(['fetchTransactions']),
        addTransaction(payload){
            this.$emit('new-transaction', payload)
            console.log('new transaction from Operations')
            

            // var that = this

            // async function func(){
            //     console.log(that.transactions);

            //     return await setDoc(doc(db, "transactions", "ID"), {///здесь нужно передать именно те параметры куда нажали, и нужо вообще эту функцию прописать в другое есто
            //         company: that.transaction.company,
            //         sum: that.transaction.sum,
            //         date: that.transaction.date
            //         })



                
                // return await getDocs(collection(db, "transactions"))
                // .then( docs => docs.forEach((doc) => {
                //     that.transactions.push(doc.data());}))
                    // }
            
            // func() 

        },
        
    }
}
</script>

<style lang="scss" scoped>

</style>>

