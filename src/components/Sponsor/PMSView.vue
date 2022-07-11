<template>
  <q-page padding class="page-showcase">
    <div class="q-px-lg q-pb-md">
      <q-page-sticky position="top-right" :offset="[30, 15]">
        <q-btn flat label="Back" color="negative" to="/PaymentManagement" icon="keyboard_backspace" />
      </q-page-sticky>
      <q-timeline color="secondary">
        <q-timeline-entry
          :title="student_name"
          subtitle="Sponsor"
          icon="person"
          color="primary"
        >
          <div>
            <q-table
              :dense="$q.screen.lt.md"
              :rows="data_list"
              :columns="columns"
              row-key="id"
              :filter="filter"
              separator="cell"
              :pagination="paginationControl"
            >
              <template v-slot:top-left>
                <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>

              <template v-slot:top-right>
                <q-btn color="primary" icon-right="payment" label="Transact" @click="createDialog = true" />
              </template>

              <template v-slot:header="props">
                <q-tr :props="props">
                  <q-th
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    {{ col.label }}
                  </q-th>
                  <q-th auto-width>
                    <div align="center">
                      Action
                    </div>
                  </q-th>
                </q-tr>
              </template>

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td align="left">
                    {{ props.row.date }}
                  </q-td>
                  <q-td align="left">
                    {{ props.row.description }}
                  </q-td>
                  <q-td align="left">
                    {{ props.row.student_name }}
                  </q-td>
                  <q-td align="left">
                    {{ props.row.debit }}
                  </q-td>
                  <q-td align="left">
                    {{ props.row.credit }}
                  </q-td>
                  <q-td align="left">
                    {{ props.row.date_created }}
                  </q-td>
                  <q-td align="left">
                    {{ props.row.posted_by_name }}
                  </q-td>
                  <q-td auto-width>
                    <!-- q-btn size="sm" color="primary" round dense icon="add" style="margin-right: 5px;" @click="getPayload(props.row)" to="/PMView"/ -->
                    <q-btn size="sm" color="secondary" round dense icon="edit" :disable="update_button_disable" style="margin-right: 5px;" @click="getPayload(props.row), updateDialog = true" />
                    <q-btn size="sm" color="negative" round dense icon="delete" :disable="delete_button_disable" @click="getPayloadDelete(props.row), deleteDialog = true" />
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          :title="balance"
          subtitle="Balance"
          icon="exit_to_app"
          color="primary"
        >
        </q-timeline-entry>

      </q-timeline>
    </div>
  </q-page>
  <q-dialog persistent v-model="createDialog" auto-width>
    <create-payment @close="createDialog = false"></create-payment>
  </q-dialog>
  <q-dialog persistent v-model="updateDialog" auto-width>
    <update-payment @close="updateDialog = false"></update-payment>
  </q-dialog>
  <q-dialog persistent v-model="deleteDialog" auto-width>
    <delete-payment @close="updateDialog = false"></delete-payment>
  </q-dialog>
</template>

<script>
import { ref } from 'vue'
import { date } from 'quasar'
const timeStamp = Date.now()
const dateToday = date.formatDate(timeStamp, 'YYYY-MM-DD')

export default {
  data () {
    return {
      debit: 0,
      credit: 0,
      balance: 0,
      student_data: [],
      student_name: '',
      create_button_disable: false,
      update_button_disable: false,
      delete_button_disable: false,
      maximizedToggle: true,
      createDialog: false,
      updateDialog: false,
      deleteDialog: false,
      tab: 'list',
      data_list: [],
      columns: [
        // { name: 'student_id_college', label: 'College Id', field: 'student_id_college', sortable: true, align: 'left' },
        // { name: 'student_id_shs', label: 'SHS Id', field: 'student_id_shs', sortable: true, align: 'left' },
        { name: 'date', label: 'Date', field: 'date', align: 'left' },
        { name: 'description', label: 'Description', field: 'description', align: 'left', sortable: true },
        { name: 'student_name', label: 'Student', field: 'student_name', align: 'left', sortable: true },
        { name: 'debit', label: 'Debit', field: 'debit', align: 'left', sortable: true },
        { name: 'credit', label: 'Credit', field: 'credit', align: 'left', sortable: true },
        { name: 'date_created', label: 'Date Posted', field: 'date_created', align: 'left', sortable: true },
        { name: 'posted_by_name', label: 'Posted By', field: 'posted_by_name', align: 'left', sortable: true }
      ],
      paginationControl: { rowsPerPage: 5000, page: 1, sortBy: 'last_name' },
      filter: '',
      step: ref(1),
      data: {
        name: '',
        year: '',
        remarks: 'None',
        posted_by: '',
        date_posted: dateToday
      },
    }
  },
  async created () {
    var self = this
    self.student_data = JSON.parse(JSON.stringify(self.$store.getters['SponsorPayment/getData']))
    self.student_name = self.student_data.sponsor_name
    self.getCreated()
  },
  watch: {
    createDialog: function () {
      var self = this
      self.getCreated()
    },
    updateDialog: function () {
      var self = this
      self.getCreated()
    },
    deleteDialog: function () {
      var self = this
      self.getCreated()
    }
  },
  methods: {
    getCreated() {
      var self = this
      self.data_list = []
      self.$store.dispatch('SponsorPayment/searchData')
        .then(res => {
          self.$store.commit('SponsorPayment/setList', res.data)
          self.data_list = self.$store.getters['SponsorPayment/getList']
          self.$store.commit('SponsorPayment/setBalance', self.data_list.reduce((n, {debit}) => n + debit, 0) - self.data_list.reduce((n, {credit}) => n + credit, 0))
          self.balance = self.$store.getters['SponsorPayment/getBalance'].toString()
        }).catch(err => {
          console.log(err)
        })
    },
    getPayload (data) {
      var self = this
      self.$store.commit('SponsorPayment/setPut', data)
    },
    getPayloadDelete (data) {
      var self = this
      self.$store.commit('SponsorPayment/setDelete', data)
    },
    submit () {
    },
    reset () {
    },
    showNotif () {
    }
  },
  components: {
    'create-payment': require('components/Sponsor/PMSAdd.vue').default,
    'update-payment': require('components/Sponsor/PMSUpdate.vue').default,
    'delete-payment': require('components/Sponsor/PMSDelete.vue').default
  }
}
</script>
