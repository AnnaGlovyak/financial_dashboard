<template>
    <div class="form">
        <h1 class="title">Login</h1>
        <div class="title is-vertical is-4">
            <b-field label="Email"><b-input icon="email" type="email" v-model="email"/></b-field>
            <b-field label="Password">
                <b-input type="password" password-reveal v-model="password" />
            </b-field>
            <b-message type="is-danger" v-if="error">
                {{ error }}
            </b-message>
            <b-button class="is-primary" @click="login">Login</b-button>
        </div>
    </div>
</template>
<script>

import {mapGetters} from 'vuex'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
    data(){
        return {
            email: 'test-vue@mail.com',
            password: 'testvue',
            error: null
        };
    },
    computed: {
        ...mapGetters(['user']),
        nextRoute(){
            return  this.$route.query.redirect || "/home";
        }
    },
    watch: {
        user(auth){
            if(auth){
                this.$router.push('/home')
            } else {
                this.$router.push('/login')
            }
        }
    },
    methods: {
        async login(){
            const auth = getAuth();
            signInWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
                // Signed in
                
                const user = userCredential.user;
                console.log(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });

        }
    }
}
</script>





<style lang="scss" scoped>
.form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 100px;
}
.button.is-primary{
    background-color: #0062FF;
}
.mdi{
    color: #0062FF;
}
////test-vue@mail.com
////testvue
</style>











<!-- <template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Users</div>
        </md-card-header>

        <md-card-content>
            <md-field :class="getValidationClass('email')">
                <label for="email">Email</label>
                <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
            </md-field>

            <md-field :class="getValidationClass('password')">
                <label for="password">Password</label>
                <md-input type="password" name="password" id="password" v-model="form.password" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.password.required">The email is required</span>
                <span class="md-error" v-else-if="!$v.form.password.minLength">Invalid email</span>
            </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Login</md-button>
        </md-card-actions>
      </md-card>
    </form> -->
  <!-- </div> -->
<!-- </template>

// <script>
// import { validationMixin } from 'vuelidate'
// import {
//     required,
//     email,
//     minLength,
// } from 'vuelidate/lib/validators'

// import axios from 'axios'

// export default {
//     name: 'FormValidation',
//     mixins: [validationMixin],
//     data: () => ({
//         form: {
//         email: 'test@test.com',
//         password: '123123123',
//         },
//         sending: false,
//     }),
//     validations: {
//         form: {
//             password: {
//                 required,
//                 minLength: minLength(3)
//             },
//             email: {
//                 required,
//                 email
//             }
//         }
//     },
//     methods: {
//         getValidationClass (fieldName) {
//             const field = this.$v.form[fieldName]

//             if (field) {
//                 return {
//                 'md-invalid': field.$invalid && field.$dirty
//                 }
//             }
//         },
//         clearForm () {
//             this.$v.$reset()
//             this.form.email = null
//             this.form.password = null
//         },
//         login () {
//         this.sending = true
//             axios('user.json')
//                 .then(response => {
//                     const { password, email, name } = response.data.user
//                     if (password === this.form.password && 
//                         email === this.form.email
//                     ) {
//                         this.sending = false
//                         this.clearForm()
//                         this.$store.dispatch('login', {
//                             name,
//                             email
//                         })
//                         this.$router.push('/home')
//                         this.$notify({
//                             group: 'error',
//                             text: 'Успешный вход',
//                             type: 'success ',
//                         });
//                     } else {
//                         this.$notify({
//                             group: 'error',
//                             title: 'ERROR',
//                             text: 'Неправильный пароль или почта',
//                             type: 'error',
//                         });
//                     }
//                 }).finally(() => {
//                     this.sending = false
//                 })
//         },
//         validateUser () {
//             this.$v.$touch()

//             if (!this.$v.$invalid) {
//                 this.login()
//             }
//         }
//     }
// }
// </script>

// <style lang="scss" scoped>
//   .md-progress-bar {
//     position: absolute;
//     top: 0;
//     right: 0;
//     left: 0;
//   }
// </style>-->