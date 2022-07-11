<template>
  <q-page padding class="page-showcase">
    <div class="showcase-top text-center">
      <img src="~assets/report.png" style="width: 90px;">
      <p class="caption">
        Report List
      </p>
    </div>
    <br>
    <div class="row justify-center">
      <div style="width: 850px; max-width: 90vw;" class="row">
        <div class="col-xs-6 col-sm-4 col-lg-3">
          <div class="card text-center category-link text-primary">
            <q-btn flat color="teal" to="/billing">
              <q-icon left size="3em" name="credit_card" />
              <div> Billing </div>
            </q-btn>
          </div>
        </div>
        <div class="col-xs-6 col-sm-4 col-lg-3">
          <div class="card text-center category-link text-primary">
            <q-btn flat color="teal" to="/browse_grades">
              <q-icon left size="3em" name="stacked_line_chart" />
              <div> Evaluation </div>
            </q-btn>
          </div>
        </div>
        <div class="col-xs-6 col-sm-4 col-lg-3">
          <div class="card text-center category-link text-primary">
            <q-btn flat color="teal" to="/transcript">
              <q-icon left size="3em" name="folder_special" />
              <div> Transcript </div>
            </q-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- div class="row justify-center">
      <div style="width: 850px; max-width: 90vw;" class="row">
        <div
          v-for="category in list"
          :key="category.hash"
          class="col-xs-6 col-sm-4 col-lg-3"
        >
          <div class="card text-center category-link text-primary" @click="show(category)">
            <q-icon :name="category.icon" />
            <p class="caption">{{ category.title }}</p>
          </div>
        </div>
      </div>
    </div>

    <q-page-sticky v-show="category" position="bottom-right" :offset="[18, 18]">
      <q-btn round color="secondary" @click="category = false" class="animate-pop">
        <q-icon name="keyboard_backspace" />
      </q-btn>
    </q-page-sticky -->
  </q-page>
</template>

<script>
export default {
  data () {
    // :disable="disable_save"
    return {
    }
  },
  async created () {
  },
  computed: {
  },
  watch: {
  },
  methods: {
  },
  components: {
  }
}
</script>
<style lang="sass">
$title-color: $grey-14
.doc-card-title
  margin-left: -24px
  padding: 2px 10px 2px 24px
  background: $title-color
  color: $grey-2
  position: relative
  border-radius: 3px 5px 5px 0
  &:after
    content: ''
    position: absolute
    top: 100%
    left: 0
    width: 0
    height: 0
    border: 0 solid transparent
    border-top-color: scale-color($title-color, $lightness: -15%)
    border-width: 9px 0 0 11px

.doc-example
  &__toolbar
    background: white
    color: $grey-8
    > .q-btn
      color: $grey-7
  &__tabs
    background: $grey-3
    color: $grey-7
  &--dark
    .doc-example__toolbar
      background: $grey-10
      color: #fff
      > .q-btn
        color: $grey-3
    .doc-example__separator
      background-color: $grey-8
    .doc-example__tabs
      background: $grey-9
      color: $grey-5
  &__content
    position: relative
    &--scrollable
      height: 500px
</style>
