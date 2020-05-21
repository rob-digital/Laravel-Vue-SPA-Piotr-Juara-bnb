<template>
    <div>
    <div class="w-50 m-auto">

        <div class="card card-body">
         <form action="">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      placeholder="Enter you name"
                      v-model="user.name"
                      :class="{'is-invalid' : errorFor('name')}"
                    >
                    <validation-errors :errors="errorFor('name')"></validation-errors>
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      class="form-control"
                      placeholder="Enter you email"
                      v-model="user.email"
                      :class="{'is-invalid' : errorFor('email')}"
                    >
                    <validation-errors :errors="errorFor('email')"></validation-errors>
                </div>

                 <div class="form-group">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      class="form-control"
                      placeholder="Enter your password"
                      v-model="user.password"
                      :class="{'is-invalid' : errorFor('password')}"
                    >
                    <validation-errors :errors="errorFor('password')"></validation-errors>
                </div>

                <div class="form-group">
                    <label for="password_confirmation">Re-type Password</label>
                    <input
                      type="password"
                      name="password_confirmation"
                      class="form-control"
                      placeholder="Confirm your password"
                      v-model="user.password_confirmation"
                      :class="{'is-invalid' : errorFor('password_confirmation')}"
                    >
                    <validation-errors :errors="errorFor('password')"></validation-errors>
                </div>

                <button
                  class="btn btn-primary btn-large btn-block"
                  :disabled="loading"
                  @click.prevent="register"
                >Register</button>
                <hr/>

                <div class="text-nowrap">
                    Already have an account?
                    <router-link :to="{name: 'login'}">Login</router-link>
                </div>

            </form>
    </div>
    </div>
    </div>
</template>

<script>
import ValidationErrorsMixin from '../shared/mixins/ValidationErrorsMixin'
import { logIn } from "./../shared/utils/auth"

    export default {
        mixins: [ValidationErrorsMixin],
        data() {
            return {
                user:{
                name: null,
                email: null,
                password: null,
                password_confirmation: null
                },
                loading: false,
            }
        },
        methods: {
            async register() {
                this.errors = null
                this.loading = true

                try {
                    await axios.post('/register', this.user)

                    logIn()
                    this.$store.dispatch('loadUser')
                    this.$router.push({name: 'home'})

                } catch (error) {
                    this.errors = error.response && error.response.data.errors
                }

                this.loading = false
            }
        }
    }
</script>
