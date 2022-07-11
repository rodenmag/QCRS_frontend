<template>
  <q-page padding class="page-showcase">
    <q-form @submit="submit">
    <div class="q-px-lg q-pb-md">
      <q-page-sticky position="top-right" :offset="[30, 15]">
        <q-btn flat label="Back" color="negative" to="/EnrollmentSettings" icon="keyboard_backspace" />
      </q-page-sticky>
      <q-timeline color="secondary">

        <q-timeline-entry
          title="Subject Information"
          subtitle="Required"
          icon="person"
          color="secondary"
        >
          <div>
            <q-card class="my-card">
              <q-card-section>
                <br>
                <div class="row q-gutter-md row items-start">
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" name="miscellaneous" type="text" v-model="data.miscellaneous" class="text-primary" label="Miscellaneous">
                      <template v-slot:append>
                        <q-icon color="black" name="info" />
                      </template>
                    </q-input>
                  </div>
                </div>
              </q-card-section>
            </q-card>
            <br>
            <q-card class="my-card">
              <q-card-section>
                <br>
                <div class="row q-gutter-md row items-start">
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" name="tuition_fee" type="text" v-model="data.tuition_fee" class="text-primary" label="Tuition Fee">
                      <template v-slot:append>
                        <q-icon color="black" name="info" />
                      </template>
                    </q-input>
                  </div>
                </div>
              </q-card-section>
            </q-card>
            <br>
            <q-card class="my-card">
              <q-card-section>
                <br>
                <div class="row q-gutter-md row items-start">
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" name="nstp" type="text" v-model="data.nstp" class="text-primary" label="Nstp">
                      <template v-slot:append>
                        <q-icon color="black" name="info" />
                      </template>
                    </q-input>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          title=""
          subtitle=""
          icon="exit_to_app"
          color="secondary"
        >
          <div>
            <div class="row q-gutter-md row items-start">
              <q-page-sticky position="bottom-right" :offset="[30, 15]">
                <q-btn fab icon="send" type="submit" color="secondary">
                  <q-tooltip content-class="bg-black" :offset="[10, 10]">
                    Submit!
                  </q-tooltip>
                </q-btn>
              </q-page-sticky>
            </div>
          </div>
        </q-timeline-entry>

      </q-timeline>
    </div>
    </q-form>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { date } from 'quasar'
const timeStamp = Date.now()
const dateToday = date.formatDate(timeStamp, 'YYYY-MM-DD')

export default {
  data () {
    return {
      step: ref(1),
      data: [],
    }
  },
  async created () {
    var self = this
    self.data = JSON.parse(JSON.stringify(self.$store.getters['Settings/getPut']))
  },
  methods: {
    submit () {
      var self = this
      self.data.posted_by = self.$store.state.user_info.id
      self.$store.commit('Settings/setPut', self.data)
      self.$store.dispatch('Settings/updateData')
        .then(res => {
          // self.showNotif()
          self.$store.commit('Settings/modifyList', res.data)
          console.log(res.data)
          self.reset()
          self.$router.push('/EnrollmentSettings')
        }).catch(err => {
          console.log(err)
        })
    },
    reset () {
      var self = this
      self.$store.commit('Settings/setPut', '')
      self.$emit('close')
    },
    showNotif () {
    }
  }
}
</script>
