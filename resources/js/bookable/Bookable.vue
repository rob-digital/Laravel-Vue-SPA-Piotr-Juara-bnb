<template>
    <div class="row">

    <div class="col-md-8 pb-4">
      <div class="card">
        <div class="card-body">
          <div v-if="!loading">
            <h2>{{ bookable.title }}</h2>
            <hr />
            <article>{{ bookable.description }}</article>
          </div>
          <div v-else><loading-state>Loading your expirence...</loading-state></div>
        </div>
      </div>
      <review-list :bookable-id="this.$route.params.id"></review-list>
    </div>
    <div class="col-md-4 pb-4">
        <Availability
          :bookable-id="this.$route.params.id"
          @availability="checkPrice($event)"
          class="mb-4"
        ></Availability>

        <transition name="fade">
            <price-breakdown :price="price" v-if="price"></price-breakdown>
        </transition>

        <transition name="fade">
            <button
              class="btn btn-outline-secondary btn-block mt-4"
              v-if="price"
              @click="addToBasket"
              :disabled="inBasketAlready"
            >Book Now</button>
        </transition>

        <transition name="fade">
            <button
              class="btn btn-outline-secondary btn-block mt-4"
              v-if="inBasketAlready"
              @click="removeFromBasket"

            >Remove from Basket</button>
        </transition>

        <div v-if="inBasketAlready" class="mb-4">
            Seems that you already booked this object
        </div>

    </div>
  </div>

</template>

<script>
import Availability from './Availability'
import ReviewList from './RevirewList'
import PriceBreakdown from './PriceBreakDown'
import { mapState } from 'vuex'

    export default {
        components: {
            Availability,
            ReviewList,
            PriceBreakdown
        },
        data() {
            return {
                bookable: null,
                loading: false,
                price: null
            }
        },
        created() {
            this.loading = true;
            axios.get(`/api/bookables/${this.$route.params.id}`).then(response => {
                this.bookable = response.data.data
                this.loading = false
            })
        },
        computed: {
            ...mapState({
            myLastSearch: state => state.lastSearch,
            // inBasketAlready(state) {
            //     if (null === this.bookable) {
            //         return false
            //     }
            //     return state.basket.items.reduce(
            //         (result, item) => result || this.bookable.id === item.bookable.id, false
            //     )
            // }
        }),
        inBasketAlready() {
            if (null === this.bookable) {
                    return false
                }
            return this.$store.getters.inBasketAlready(this.bookable.id)
        }
        },
     methods: {
      async checkPrice(hasAvailability) {
            if(!hasAvailability) {
                this.price = null
                return
            }

            try {
              this.price =(await axios.get(`/api/bookables/${this.bookable.id}/price?from=${this.myLastSearch.from}&to=${this.myLastSearch.to}`))
              .data.data
            } catch(err) {
                this.price = null
            }
        },
        addToBasket() {

            this.$store.dispatch('addToBasket', {
                bookable: this.bookable,
                dates: this.myLastSearch,
                price: this.price
            })
        },
        removeFromBasket() {
            this.$store.dispatch('removeFromBasket', this.bookable.id)
        }
  }

    }
</script>

<style lang="scss" scoped>

</style>
