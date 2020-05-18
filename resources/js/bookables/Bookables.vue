<template>
    <div>
        Rows is {{ rows }}
        <h1>{{ pageTitle }}</h1>

        <div v-if="loading">Data is loading...</div>
        <div v-else>
            <div class="row mb-4"  v-for="(row, index) in rows" :key="'row'+row+index">
                <div class="col d-flex align-self-stretch"
                v-for="(bookable,index) in bookablesInRow(row)"
                :key="'row'+row+index"
                >
                    <BookableListItem

                    v-bind="bookable"

                    ></BookableListItem>
                </div>

            <div class="col d-flex align-self-stretch" v-for="p in placeholdersInRow(row)" :key="'p'+ p"></div>
            </div>

        </div>




    </div>
</template>

<script>
import BookableListItem from './BookableListItem'

    export default {
        components: {
            BookableListItem
        },
        data() {
            return {
                pageTitle: 'Main Page',
                bookables: null,
                loading: false,
                columns: 3
            }
        },
        computed: {
            rows() {
                return this.bookables === null ? 0 : Math.ceil(this.bookables.length / this.columns)
            }
        },
        methods: {
            bookablesInRow(row) {
               return this.bookables.slice((row - 1) * this.columns, row * this.columns)
            },
            placeholdersInRow(row) {
                return this.columns - this.bookablesInRow(row).length
            }
        },
        created() {
            this.loading = true;

            const request = axios.get("api/bookables")
                .then(response => {
                    this.bookables = response.data.data
                    this.loading = false
                })


        }
    }

</script>

<style lang="scss" scoped>

</style>
