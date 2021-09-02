<template>
    <div class="operations">
        <h2>Last transaction</h2>
        <p>Operations content</p>
        <ul>
             <li v-for="transaction in transactions" :key="transaction.number">
                 <div class="transactions__company">{{ transaction.company }} </div>
                <div class="transactions__sum">{{ transaction.sum }} </div>
                <div class="transactions__date">{{ transaction.date }} </div>
             </li>
        </ul>
        <button @click="addTransaction"> Add transaction </button>
        
    </div>
</template>

<script>
import axios from 'axios'
import { db } from '../main.js'
import { collection, getDocs, setDoc, doc} from "firebase/firestore"; 

export default {
    
    data(){
        return{
             transactions: []
        }
        
    },
    created(){
        // this.fetchTransactions()
        var that = this

        async function func(){
            console.log(that.transactions);
            
            return await getDocs(collection(db, "transactions"))
            .then( docs => docs.forEach((doc) => {
                that.transactions.push(doc.data());}))
                }
        
        func() 
    },
    mounted(){       
    },
    methods: {
        // fetchTransactions(){
        //     // console.log('generate transactions')
        //     axios.get('cards.json')
        //         .then((result) => {
        //             // console.log(result.data.transactions)
        //             this.transactions = result.data.transactions
        //             //  console.log(this.transactions)
        //         } );
        // },
        addTransaction(){
            console.log('add transactions')

            var that = this

            async function func(){
                console.log(that.transactions);

                return await setDoc(doc(db, "transactions", "ID"), {///здесь нужно передать именно те параметры куда нажали, и нужо вообще эту функцию прописать в другое есто
                    company: that.transaction.company,
                    sum: that.transaction.sum,
                    date: that.transaction.date
                    })
                
                // return await getDocs(collection(db, "transactions"))
                // .then( docs => docs.forEach((doc) => {
                //     that.transactions.push(doc.data());}))
                    }
            
            func() 

        }
    }
}
</script>

<style>

.operations {
        width: 50%;
        display: inline-block;
        background-color: #ff5252;
        /* float: left; */

    }
</style>
