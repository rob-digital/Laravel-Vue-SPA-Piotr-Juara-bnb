<template>
    <div class="card w-100" >
            <!-- <img src="..." class="card-img-top" alt="..."> -->
            <div class="card-body">
                <router-link :to="{ name: 'bookable', params: {id} }">
                <h5 class="card-title">{{ title }}</h5>
                </router-link>

                <p class="card-text">{{ description }}</p>
                <p class="card-text">£{{ id }}</p>
                <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
            </div>
        </div>
</template>

<script>
    export default {
        props: {
            title:  {
                type: String,
                // required: true
                },
            description: {
                type: String,
                // required: true
            },
            id: {
                type: Number,
                // required: true
            }

            }
    }
</script>

<style lang="scss" scoped>

</style>
