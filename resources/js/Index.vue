<template>
    <div>
        <nav class="navbar bg-white border-bottom navbar-light">

            <router-link
            class="navbar-brand mr-auto"
            :to="{name: 'home'}">LaravelBNB
            </router-link>

            <router-link
              v-if="itemsInBasket"
              class="btn nav-button"
              :to="{ name: 'basket' }"
            >
                Basket
                <span class="badge badge-secondary">{{ itemsInBasket }}</span>
            </router-link>

        </nav>

        <div class="container mt-4 mb-4 pr-4 pl-4">
            <router-view></router-view>
        </div>

    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

    export default {
        data() {
            return {
                lastSearch: this.$store.state.lastSearch
            }
        },
        computed: {             // all Vuex store functions can be combined with local computed functions
            ...mapState({                   // Vuex store functions go here
                trackLastSearch: state => state.lastSearch
            }),
            ...mapGetters({
                itemsInBasket: 'itemsInBasket'      // shorthand alias instead state => state.basket.items
            }),
            countOneMore() {            // local computed function
                return 1 + 1
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
