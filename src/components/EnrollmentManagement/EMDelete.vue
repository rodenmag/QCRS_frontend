<template>
    <q-card style="width: 400px; max-width: 90vw;">
      <q-card-section class="bg-negative text-white">
        <div class="text-h6"> Confirmation </div>
      </q-card-section>

      <q-card-section class="q-pa-md">
        <div class="text-p">Are you sure you want to delete ( <b> {{ delete_data.full_name }} </b> ) ? </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="negative" v-close-popup />
        <q-btn flat label="Confirm" @click="Delete" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
</template>

<script>
export default {
  data () {
    return {
      delete_data: [],
      data: []
    }
  },
  created () {
    var self = this
    self.data = JSON.parse(JSON.stringify(self.$store.getters['EnrollmentManagement/getPut']))
    self.delete_data = JSON.parse(JSON.stringify(self.$store.getters['EnrollmentManagement/getDelete']))
    // console.log(self.delete_data)
  },
  methods: {
    Delete () {
      var self = this
      self.$store.commit('EnrollmentManagement/setDelete', self.delete_data)
      self.$store.dispatch('EnrollmentManagement/deleteData')
        .then(res => {
          self.$store.commit('EnrollmentManagement/deleteList', self.delete_data)
        }).catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
