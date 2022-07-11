<template>
  <q-card style="width: 700px; max-width: 80vw;">
    <q-card-section>
      <div class="text-h6">Update Transaction</div>
    </q-card-section>

    <q-separator />

    <q-card-section style="max-height: 80vh" class="scroll">
      <q-select
        dense
        v-model="selected_sponsor"
        use-input
        label="Sponsor"
        name="Name"
        fill-input
        hide-selected
        square
        input-debounce="0"
        @filter="filterFn"
        class="text-primary"
        :options="sponsor_list"
      >
        <template v-slot:append>
          <q-icon color="black" name="person" />
        </template>
      </q-select>
      <br>
      <q-select
        dense
        v-model="selected_student"
        use-input
        label="Student"
        name="student_search"
        fill-input
        hide-selected
        square
        input-debounce="0"
        @filter="filterFnStudent"
        class="text-primary"
        :options="student_list"
      >
        <template v-slot:append>
          <q-icon color="black" name="search" />
        </template>
      </q-select>
      <br>

      <q-input dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required', val => val.length < 50 || 'Maximum of 50 character' ]" name="date" type="date" v-model="data.date" class="text-primary" label="Date">
      </q-input>

      <q-input dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required', val => val.length < 50 || 'Maximum of 50 character' ]" name="description" type="text" v-model="data.description" class="text-primary" label="Description">
        <template v-slot:append>
          <q-icon color="black" name="info" />
        </template>
      </q-input>

      <q-input dense debounce="500" name="debit" type="text" v-model="data.debit" class="text-primary" label="Debit">
        <template v-slot:append>
          <q-icon color="black" name="credit_card" />
        </template>
      </q-input>

      <br>

      <q-input dense debounce="500" name="credit" type="text" v-model="data.credit" class="text-primary" label="Credit">
        <template v-slot:append>
          <q-icon color="black" name="credit_card" />
        </template>
      </q-input>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn flat label="CANCEL" color="negative" v-close-popup />
      <q-btn flat label="POST" color="primary" @click="submit()"  />
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref } from 'vue'
import { date } from 'quasar'
const timeStamp = Date.now()
const dateToday = date.formatDate(timeStamp, 'YYYY-MM-DD')

export default {
  data () {
    return {
      student_list: [],
      selected_student: [],
      sponsor_list: [],
      selected_sponsor: [],
      step: ref(1),
      data: [],
    }
  },
  async created () {
    var self = this
    self.data = JSON.parse(JSON.stringify(self.$store.getters['SponsorPayment/getPut']))
    self.student_list = []
    await self.$api.get('student_management/student_list/').then(function (response) {
      self.stringOptionsStudent = response.data
      self.student_list = self.stringOptionsStudent
      if (self.data.student_id === null) {
      } else {
        const test = response.data.filter(x => x.id === self.data.student_id)
        self.selected_student = test[0]
      }
    }).catch(function (error) {
      self.error = error
    })
    self.sponsor_list = []
    await self.$api.get('payment_management/sponsor_list/').then(function (response) {
      self.stringOptions = response.data
      self.sponsor_list = self.stringOptions
      if (self.data.sponsor_id === null) {
      } else {
        const test = response.data.filter(x => x.id === self.data.sponsor_id)
        self.selected_sponsor = test[0]
      }
    }).catch(function (error) {
      self.error = error
    })
  },
  watch: {
    selected_sponsor: function () {
      var self = this
      self.data.sponsor_id = self.selected_sponsor.id
    },
    selected_student: function () {
      var self = this
      self.data.student_id = self.selected_student.id
    }
  },
  methods: {
    submit () {
      var self = this
      self.data.posted_by = self.$store.state.user_info.id
      self.data.date_posted = dateToday
      self.$store.commit('SponsorPayment/setPut', self.data)
      self.$store.dispatch('SponsorPayment/updateData')
        .then(res => {
          // self.showNotif()
          var balance = parseFloat(self.$store.getters['SponsorPayment/getBalance']) - parseFloat(self.data.credit) + parseFloat(self.data.debit)
          self.$store.commit('SponsorPayment/setBalance', balance)
          self.$store.commit('SponsorPayment/modifyList', res.data)
          self.reset()
          self.$router.push('/PMSView')
        }).catch(err => {
          console.log(err)
        })
    },
    filterFn (val, update, abort) {
      var self = this
      update(() => {
        const needle = val.toLowerCase()
        self.sponsor_list = self.stringOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    filterFnStudent (val, update, abort) {
      var self = this
      update(() => {
        const needle = val.toLowerCase()
        self.student_list = self.stringOptionsStudent.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    reset () {
      var self = this
      self.$store.commit('SponsorPayment/setPut', '')
      self.$emit('close')
    },
    showNotif () {
    }
  }
}
</script>
