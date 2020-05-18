<template>
  <div>
    <h6 class="text-uppercase text-secondary font-weight-bolder">Check Availability
        <transition name="fade">
            <span v-if="noAvailability" class="text-danger" >(NOT AVAILABLE)</span>
            <span v-if="hasAvailability" class="text-success">(AVAILABLE)</span>
        </transition>

    </h6>

    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="from">From</label>
        <input
          type="text"
          name="from"
          class="form-control form-control-sm"
          placeholder="Start date"
          v-model="from"
          @keyup.enter="check"
          :class="[{'is-invalid': errorFor('from')}]"
        />
        <validation-errors :errors="errorFor('from')"></validation-errors>
      </div>

      <div class="form-group col-md-6">
        <label for="to">To</label>
        <input
          type="text"
          name="to"
          class="form-control form-control-sm"
          placeholder="End date"
          v-model="to"
          @keyup.enter="check"
          :class="[{'is-invalid': errorFor('to')}]"
        />
        <validation-errors :errors="errorFor('to')"></validation-errors>
      </div>
    </div>

    <button class="btn btn-secondary btn-block" @click="check" :disabled="loading">
        <span v-if="!loading">Check</span>
        <loading-state v-if="loading">Checking...</loading-state>
    </button>
  </div>
</template>

<script>
import validationErrorsMixin from '../shared/mixins/ValidationErrorsMixin'

export default {
    mixins: [validationErrorsMixin],
    props: {
        bookableId: [String, Number]
    },
  data() {
    return {
      from: this.$store.state.lastSearch.from,
      to: this.$store.state.lastSearch.to,
      loading: false,
      status: null,

    };
  },
  methods: {
  async check() {
      this.loading = true;
      this.errors = null;

        // this.$store.commit('setLastSearchMut', {         // mutation
        //     from: this.from,
        //     to: this.to
        // })

        this.$store.dispatch('setLastSearchAction', {
            from: this.from,
            to: this.to
        })

        try {
           this.status = (await axios
            .get(
            `/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`
            )).status
            this.$emit('availability', this.hasAvailability)

        } catch (error) {
            if (422 === error.response.status) {
                this.errors = error.response.data.errors;
            }
            this.status = error.response.status;
            this.$emit('availability', this.hasAvailability)
        }
        this.loading = false


    //   axios
    //     .get(
    //       `/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`
    //     )
    //     .then(response => {
    //       this.status = response.status;
    //     })
    //     .catch(error => {
    //       if (422 === error.response.status) {
    //         this.errors = error.response.data.errors;
    //       }
    //       this.status = error.response.status;
    //     })
    //     .then(() => (this.loading = false));
    },
  },
  computed: {
    hasErrors() {
      return 422 === this.status && this.errors !== null;
    },
    hasAvailability() {
      return 200 === this.status;
    },
    noAvailability() {
      return 404 === this.status;
    }
  }
};
</script>

<style lang="scss" scoped>
label {
    font-size: 0.7rem;
    text-transform: uppercase;
    color: gray;
    font-weight: bolder;
}
</style>
