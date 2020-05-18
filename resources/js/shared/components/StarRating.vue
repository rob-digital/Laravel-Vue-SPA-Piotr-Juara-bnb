<template>
    <div class="d-flex">
        <i
        class="fas fa-star"
        v-for="star in fullStar"
        :key="'full'+star"
        @click="$emit('input', star)"
        ></i>

        <i class="fas fa-star-half-alt" v-if="halfStar"></i>

        <i
        class="far fa-star"
        v-for="star in emptyStar"
        :key="'empty'+star"
        @click="$emit('input', fullStar + star)"
        ></i>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: Number,
            },
        },
        computed: {
            halfStar() {
                const fraction = Math.round((this.value - Math.floor(this.value)) * 100)
                return fraction > 0 && fraction < 50
            },
            fullStar() {
                return Math.round(this.value)
            },
            emptyStar() {
                return 5 - Math.ceil(this.value)
            }
        },
        // created() {
        //     const numbers = [0.9, 4.0, 4.4, 4.5, 4.6, 4.9]

        //     numbers.forEach(n => {
        //         console.log('------------------------------------');
        //         console.log(`round for ${n} is ${Math.round(n)}`);
        //         console.log('------------------------------------');
        //         console.log('------------------------------------');
        //         console.log(`floor for ${n} is ${Math.floor(n)}`);
        //         console.log('------------------------------------');
        //          console.log('------------------------------------');
        //         console.log(`ceil for ${n} is ${Math.ceil(n)}`);
        //         console.log('------------------------------------');
        //     })
        // }
    }
</script>

<style lang="scss" scoped>

</style>
