<template>
    <div class="w-50 m-auto">
        <h2>Login</h2>
        <div class="card card-body">
            <form action="">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      class="form-control"
                      placeholder="Enter you email"
                      v-model="email"
                      :class="{'is-invalid' : errorFor('email')}"
                    >
                    <validation-errors :errors="errorFor('email')"></validation-errors>
                </div>
                 <div class="form-group">
                    <label for="password">Email</label>
                    <input
                      type="text"
                      name="password"
                      class="form-control"
                      placeholder="Enter you password"
                      v-model="password"
                      :class="{'is-invalid' : errorFor('password')}"
                    >
                    <validation-errors :errors="errorFor('password')"></validation-errors>
                </div>
                <button
                  class="btn btn-primary btn-large btn-block"
                  :disabled="loading"
                  @click.prevent="login"
                >Log-in</button>
                <hr/>

                <div class="text-nowrap">
                    No account yet?
                    <router-link :to="{name: 'register'}">Register</router-link>
                </div>
                <div class="text-nowrap">
                    Forgot Password?
                    <router-link :to="{name: 'home'}">Reset Password</router-link>
                </div>
            </form>
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
                email: null,
                password: null,
                loading: false
            }
        },
        methods: {
            async login() {
                this.errors = null
                this.loading = true

                try {
                    await axios.get('/sanctum/csrf-cookie')
                    await axios.post('/login', {
                        email: this.email,
                        password: this.password
                    })
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

<style lang="scss" scoped>

</style>
