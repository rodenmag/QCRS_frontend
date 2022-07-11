<template>
  <q-card style="width: 700px; max-width: 80vw;">
    <q-card-section>
      <div class="text-h6">New Transaction</div>
    </q-card-section>

    <q-separator />

    <q-card-section style="max-height: 80vh" class="scroll">
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
import { date } from 'quasar'
const timeStamp = Date.now()
const dateToday = date.formatDate(timeStamp, 'YYYY-MM-DD')
export default {
  data () {
    return {
      student_data: [],
      data: {
        sponsor_id: '',
        date: dateToday,
        description: '',
        debit: '',
        credit: '',
        posted_by: '',
        date_created: dateToday
      }
    }
  },
  async created () {
     var self = this
     self.student_data = JSON.parse(JSON.stringify(self.$store.getters['SponsorPayment/getData']))
     self.data.sponsor_id = self.student_data.id
  },
  methods: {
    submit () {
      var self = this
      if (self.data.debit === '') {
        self.data.debit = 0
      }
      if (self.data.credit === '') {
        self.data.credit = 0
      }
      self.data.posted_by = self.$store.state.user_info.id
      self.data.date_posted = dateToday
      self.$store.commit('SponsorPayment/setPost', self.data)
      self.$store.dispatch('SponsorPayment/createData')
        .then(res => {
          // self.showNotif()
          var balance = parseFloat(self.$store.getters['SponsorPayment/getBalance']) - parseFloat(self.data.credit) + parseFloat(self.data.debit)
          self.$store.commit('SponsorPayment/setBalance', balance)
          self.$store.commit('SponsorPayment/pushList', res.data)
          self.reset()
          self.$router.push('/PMSView')
        }).catch(err => {
          console.log(err)
        })
    },
    reset () {
      var self = this
      self.$store.commit('SponsorPayment/setPost', '')
      self.$emit('close')
    },
    showNotif () {
      var self = this
      self.$q.notify({
        color: 'black',
        message: 'Saved Successfully!',
        icon: 'save'
      })
    }
  }
}
</script>
