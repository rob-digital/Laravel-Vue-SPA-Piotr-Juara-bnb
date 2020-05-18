<template>
    <div>
         <h6 class="text-uppercase text-secondary font-weight-bolder">PRICE BREAKDOWN</h6>

        <div
          v-for="(days, price) in price.breakdown"
          :key="price"
          class="pt-2 pb-2 border-bottom border-top d-flex justify-content-between"
        >
            <span>Total: {{ days }} x ${{ price }}</span>
            <span> ${{ days * price }} </span>
        </div>

        <div class="pt-2 font-weight-bolder d-flex justify-content-between">
            <span>Total</span>
            <span>${{ price.total }}</span>
        </div>

        <!-- <div>Total {{ price.breakdown }}</div> -->
    </div>
</template>

<script>
    export default {
        props: {
            price: Object
        }
    }
</script>

<style lang="scss" scoped>

</style>
