<template>
    <div>
         <div
            class="invalid-feedback"
            v-for="(error, index) in errors"
            :key="key(index)"
            >{{ error }}
        </div>
    </div>
</template>

<script>
    export default {
        props: ['errors'],
        methods: {
            key(index) {
                return `Math.floor((Math.random() * 1000)_${index})`
            }
        }
    }
</script>

<style lang="scss" scoped>
    .form-control.is-invalid ~ div > .invalid-feedback {
        display: block;
    }
</style>
