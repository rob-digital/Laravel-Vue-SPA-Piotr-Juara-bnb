export default {
    state: {
        lastSearch: {
            from: null,
            to: null
        },
        basket: {
            items: []
        }
    },
    mutations: {
        setLastSearchMut (state, payload ) {
            state.lastSearch = payload
        },
        addToBasket(state, payload) {
            state.basket.items.push(payload)
        },
        removeFromBasket(state, payload) {
            state.basket.items = state.basket.items.filter(item => item.bookable.id !== payload)
        },
        setBasket(state, payload) {
            state.basket = payload
        }
    },
    actions: {
        setLastSearchAction(context, payload) {
            context.commit('setLastSearchMut', payload)
            localStorage.setItem('myLastSearch', JSON.stringify(payload))
        },
        loadStoredState(context) {
            const lastSearch = localStorage.getItem('myLastSearch')
            if(lastSearch) {
                context.commit('setLastSearchMut', JSON.parse(lastSearch))
            }
            const basket = localStorage.getItem('basket')
            if(basket) {
                context.commit('setBasket', JSON.parse(basket))
            }
        },
        addToBasket({commit, state}, payload) {
            commit('addToBasket', payload)
            localStorage.setItem('basket', JSON.stringify(state.basket))
        },
        removeFromBasket({commit, state}, payload) {
            commit('removeFromBasket', payload)
            localStorage.setItem('basket', JSON.stringify(state.basket))
        },
        emptyBasket({commit, state}, payload) {
            commit('setBasket', {items: []})
            localStorage.setItem(JSON.stringify(state.basket))
        }
    },
    getters: {
        itemsInBasket: state => {
            return state.basket.items.length
        },
        inBasketAlready(state) {
            return function(id) {
                return state.basket.items.reduce(
                    (result, item) => result || id === item.bookable.id, false
                )
            }
        }
    }
}
