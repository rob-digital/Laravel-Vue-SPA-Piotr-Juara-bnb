require('./bootstrap');

import VueRouter from 'vue-router'
import router from './routes'
import Vuex from 'vuex'
import Index from './Index'
import moment from 'moment'
import StarRating from './shared/components/StarRating'
import FatalError from './shared/components/FatalError'
import ValidationErrors from './shared/components/ValidationErrors'
import Success from './shared/components/Success'
import storeDefinition from './store'
import LoadingState from './shared/components/LoadingState'

window.Vue = require('vue');

//les.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.config.devtools = true

Vue.use(VueRouter);
Vue.use(Vuex)
Vue.filter('fromNow', value => moment(value).fromNow())
Vue.component('star-rating', StarRating)
Vue.component('fatal-error', FatalError)
Vue.component('success', Success)
Vue.component('validation-errors', ValidationErrors)
Vue.component('loading-state', LoadingState)

const store = new Vuex.Store(storeDefinition)

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        'index': Index
    },
    beforeCreate() {
        this.$store.dispatch('loadStoredState')
    }
});




