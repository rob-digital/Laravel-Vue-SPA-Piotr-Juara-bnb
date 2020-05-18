<template>
    <div>
        <div class="row">
            <div class="col-md-8" v-if="itemsInBasket">

                <div class="form-row">
                    <div class="col-md-6 form-group">
                        <label for="first_name">First Name</label>
                        <input
                          type="text"
                          name="first_name"
                          v-model="customer.first_name"
                          class="form-control"
                          :class="[{'is-invalid': errorFor('customer.first_name')}]"
                        >
                        <validation-errors :errors="errorFor('customer.first_name')"></validation-errors>
                    </div>
                    <div class="col-md-6 form-group">
                        <label for="last_name">Last Name</label>
                        <input
                          type="text"
                          name="last_name"
                          v-model="customer.last_name"
                          class="form-control"
                          :class="[{'is-invalid': errorFor('customer.last_name')}]"
                        >
                        <validation-errors :errors="errorFor('customer.last_name')"></validation-errors>
                    </div>
                </div>

                <div class="form-row">
                    <div class="col-md-12 form-group">
                        <label for="email">Email</label>
                        <input
                          type="text"
                          name="email"
                          v-model="customer.email"
                          class="form-control"
                          :class="[{'is-invalid': errorFor('customer.email')}]"
                        >
                        <validation-errors :errors="errorFor('customer.email')"></validation-errors>
                    </div>
                </div>

                <div class="form-row">
                    <div class="col-md-6 form-group">
                        <label for="street">Street</label>
                        <input
                          type="text"
                          name="street"
                          v-model="customer.street"
                          class="form-control"
                          :class="[{'is-invalid': errorFor('customer.street')}]"
                        >
                        <validation-errors :errors="errorFor('customer.street')"></validation-errors>
                    </div>
                    <div class="col-md-6 form-group">
                        <label for="city">City</label>
                        <input
                          type="text"
                          name="city"
                          v-model="customer.city"
                          class="form-control"
                          :class="[{'is-invalid': errorFor('customer.city')}]"
                        >
                        <validation-errors :errors="errorFor('customer.city')"></validation-errors>
                    </div>
                </div>

                <div class="form-row">
                    <div class="col-md-4 form-group">
                        <label for="counrty">Country</label>
                        <input
                          type="text"
                          name="counrty"
                           v-model="customer.country"
                          class="form-control"
                          :class="[{'is-invalid': errorFor('customer.country')}]"
                        >
                        <validation-errors :errors="errorFor('customer.country')"></validation-errors>
                    </div>
                    <div class="col-md-4 form-group">
                        <label for="state">State</label>
                        <input type="text" name="state" id="" class="form-control">
                    </div>
                    <div class="col-md-4 form-group">
                        <label for="post_code">Post Code</label>
                        <input
                          type="text"
                          name="post_code"
                           v-model="customer.post_code"
                          class="form-control"
                          :class="[{'is-invalid': errorFor('customer.post_code')}]"
                        >
                        <validation-errors :errors="errorFor('customer.post_code')"></validation-errors>
                    </div>
                </div>

                <hr/>

                <div class="form-row">
                    <div class="col-md-12 form-group">
                        <button
                          type="submit"
                          @click.prevent="book"
                          :disabled="loading"
                          class="btn btn-primary btn-large btn-block"
                        >Book Now!</button>
                    </div>
                </div>
            </div>

            <div class="col-md-8" v-else>
                <div class="jumbotron jumbotron-fluid text-center">Basket is empty
                <success v-if="transactionSeccessed">Your purchase was succesfull</success>
            </div>
            </div>



            <div class="col-md-4">
                <div class="d-flex justify-content-between">
                    <h6 class="text-uppercase text-secondary font-weight-bolder">YOUR CARD</h6>
                    <h6 class="badge badge-secondary text-uppercase">
                        <span v-if="itemsInBasket">Items {{ itemsInBasket }}</span>
                        <span v-else>Basket Empty</span>
                    </h6>
                </div>

                <transition-group name="fade">
                    <div v-for="item in whatIsInTheBasket" :key="item.bookable.id">
                    <div class="pt-2 pb-2 border-top d-flex justify-content-between">
                        <router-link :to="{name: 'bookable', params: {id: item.bookable.id}}">
                            <span>{{ item.bookable.title }}</span>
                        </router-link>

                        <span>
                            ${{ item.price.total }}
                        </span>
                    </div>

                    <div class="pt-2 pb-2  d-flex justify-content-between">
                        <span>From: {{ item.dates.from}}</span>
                        <span>To: {{ item.dates.to }}</span>
                    </div>

                    <div class="pt-2 pb-2 text-right">
                        <button class="btn btn-sm"
                        @click="$store.dispatch('removeFromBasket', item.bookable.id)"
                        >
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>

                </div>
                </transition-group>


            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import validationErrors from '../shared/mixins/ValidationErrorsMixin'

export default {
    mixins: [validationErrors],
    data() {
        return {
            loading: false,
            bookingAttempted: false,
            customer: {
                first_name: null,
                last_name: null,
                email: null,
                street: null,
                city: null,
                country: null,
                post_code: null
            }
        }
    },
    computed: {
        ...mapGetters(['itemsInBasket']),
        ...mapState({
            whatIsInTheBasket: state => state.basket.items
        }),
        transactionSeccessed() {
            return !this.loading && this.itemsInBasket === 0 && this.bookingAttempted
        }
    },
    methods: {
        async book() {
        this.loading = true
        this.errors = null
        this.bookingAttempted = false

        try {
            await axios.post('/api/checkout', {
                customer: this.customer,
                bookings: this.whatIsInTheBasket.map(itemBasket => ({
                    bookable_id: itemBasket.bookable.id,
                    from: itemBasket.dates.from,
                    to: itemBasket.dates.to
                }))
            })
           this.$store.dispatch('emptyBasket')
        } catch (error) {
            this.errors = error.response && error.response.data.errors
        }
        this.loading = false
        this.bookingAttempted = true
    }
    }
}

</script>

<style lang="scss" scoped>
h6.badge {
    font-size: 100%;
}
</style>
