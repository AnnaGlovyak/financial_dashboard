<template>
    <div class="operations">
        <div class="operations__content">
            <div class="transactions">
                <h2 class="transactions__title">Last transaction</h2>
                <ul class="transactions__list">
                    <li class="transactions__item" v-for="(transaction, index) in allTransactions" :key="transaction.number">
                        <div class="transactions__category">
                            <div class="transactions__department">
                                <template >
                                    <div class="transactions__card-logo-conteiner" v-if="(transaction.department === 'Other')"> 
                                        <img src="../assets/electronica.png">
                                    </div> 
                                    <div class="transactions__card-logo-conteiner" v-if="(transaction.department === 'Pharmacy')"> 
                                        <img src="../assets/pharmacy.png">
                                    </div>
                                    <div class="transactions__card-logo-conteiner" v-if="(transaction.department === 'Cafe')"> 
                                        <img src="../assets/resto.png">
                                    </div>
                                    <div class="transactions__card-logo-conteiner" v-if="(transaction.department === 'Food')"> 
                                        <img src="../assets/food.png">
                                    </div>
                                </template>
                            </div>
                            <div class="transactions__direction">
                                <div class="transactions__company">{{ transaction.company }} </div>
                                <div class="transactions__date">{{ transaction.date.toDate().toLocaleString().split(',')[0] }}</div>
                            </div> 
                        </div>
                        <div class="transactions__card-info">
                            <template >
                                <div class="transactions__card-logo-conteiner" v-if="(showCardLogo[index].type === 'saving')" style="background: blue; box-shadow: 0px 27px 58px rgba(43, 83, 255, 0.21), 0px 11.28px 24.231px rgba(43, 83, 255, 0.150959), 0px 6.0308px 12.9551px rgba(43, 83, 255, 0.125183), 0px 3.38082px 7.2625px rgba(43, 83, 255, 0.105), 0px 1.79553px 3.85706px rgba(43, 83, 255, 0.0848175), 0px 0.747159px 1.60501px rgba(43, 83, 255, 0.0590406);"> 
                                    <img src="../assets/viza.png" class="transactions__card-logo">
                                </div> 
                                <div class="transactions__card-logo-conteiner" v-if="(showCardLogo[index].type ==='debit')" style="background: red; box-shadow: 0px 27px 58px rgba(206, 21, 21, 0.16), 0px 11.28px 24.231px rgba(206, 21, 21, 0.115017), 0px 6.0308px 12.9551px rgba(206, 21, 21, 0.0953772), 0px 3.38082px 7.2625px rgba(206, 21, 21, 0.08), 0px 1.79553px 3.85706px rgba(206, 21, 21, 0.0646228), 0px 0.747159px 1.60501px rgba(206, 21, 21, 0.0449833);"> 
                                    <img src="../assets/viza.png" class="transactions__card-logo">
                                </div>
                                <div class="transactions__card-logo-conteiner" v-if="(showCardLogo[index].type ==='credit')" style="background: black; box-shadow: 0px 13px 8px rgba(0, 0, 0, 0.08);"> 
                                    <img  src="../assets/master-card.png"  class="transactions__card-logo">
                                </div>
                            </template>
                            <!-- <div class="transactions__card-logo">{{ findCardLogo(transaction.cardNumber) }} </div> -->
                            <div class="transactions__card-number" >{{ '*' + transaction.cardNumber.replace(/.(?=.{4})/g, '') }}</div>
                        </div>
                        <div class="transactions__sum">{{ transaction.sum }}</div>
                    </li>
                    <!-- <button @click="moreTransactions(3)" class="transactions__button-more">Load more</button> -->
                </ul>
                
            </div>
            <div class="statistic">
                <div class="statistic__header">
                    <h2 class="statistic__title">Statistic</h2>
                    <select name="popular" id="popular" class="button--popular">
                        <option value="popular" class="button--option">date</option>
                        <option value="popular" class="button--option">categories</option>
                    </select>
                </div>
                <div class="statistic__chart" >
                   <!-- <doughnut-chart :chartdata="chartData" :options="chartOptions"/> -->
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import { Doughnut } from 'vue-chartjs'

export default {
    extends: Doughnut,
    data(){
       
        return{
            showDialog: false,
            depImg: '',
            departmentImages: [
                {
                    name: 'Other',
                    src: '../assets/electronica.png'
                },
                {
                    name: 'Pharmacy',
                    src: '../assets/pharmacy.png'
                },
                {
                    name: 'Cafe',
                    src: '../assets/resto.png'
                },
                {
                    name: 'Food',
                    src: '../assets/food.png'
                },
            ],
            n: 6,
        }  
    },
    computed: {
        ...mapGetters(['allTransactions', 'allCards', 'loading']),
        showCardLogo(){
            let arr = [];
            for(let i = 0; i < this.allTransactions.length; i++){
                for(let j = 0; j < this.allCards.length; j++)
                    if(this.allTransactions[i].cardNumber == this.allCards[j].number){
                        arr.push({
                            transaction: this.allTransactions[i].company,
                            logo: this.allCards[j].logo,
                            name: this.allCards[j].name,
                            number: this.allCards[j].number,
                            type: this.allCards[j].type})
                    }
            }
            return arr
        },
        showTransactionDepartment(){
            let arr = []
            for(let i = 0; i < this.allTransactions.length; i++){
                for(let j = 0; j < this.departmentImages.length; j++){
                    if(this.allTransactions[i].department === this.departmentImages[j].name ){
                        console.log(this.departmentImages[i].src);
                        arr.push({
                            str: '<img src="'+ this.departmentImages[i].src + '">',
                            name: this.departmentImages[j].name,
                        }) 
                    }
                }
            } console.log(arr)
            return arr
        }
        
    },
    created(){
           
    },
    async mounted(){     
        await this.fetchTransactions(),
        await this.setupChart(this.departmentImages);
    },
    methods: {
        ...mapActions(['fetchTransactions', 'idGenerator']),

        addTransaction(payload){
            this.$emit('new-transaction', payload)
            console.log('new transaction from Operations')
        },
        setupChart(departmentImages){
            if(this.loading){
                this.renderChart({
                labels: departmentImages.map(department => department.name),
                datasets: [{
                    label: 'Total expenses',
                    data: departmentImages.map(d => {
                        return this.allTransactions.reduce((total, tr) => {
                            if(tr.department === d.name){
                                total += tr.sum
                            } return total
                        }, 0)
                    }),
                    backgroundColor: [
                        'rgba(10, 175, 125, 1)',
                        'rgba(10, 175, 255, 1)',
                        'rgba(255, 122, 47, 1)',
                        'rgba(161, 98, 247, 1)'
                    ],
                    // borderWidth: 1,

                }],
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                        position: 'bottom',
                        }
                    },
                    layout: {
                        padding: {
                            left: 50
                        }
                    }
                    
                }
            })
            }
            
        },
        moreTransactions(b){
            console.log('moreTransactions')
            this.n = this.n + b;
            this.fetchTransactions(this.n)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>>

