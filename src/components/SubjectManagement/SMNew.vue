<template>
  <q-page padding class="page-showcase">
    <q-form @submit="submit" autocomplete="off">
    <div class="q-px-lg q-pb-md">
      <q-page-sticky position="top-right" :offset="[30, 15]">
        <q-btn flat label="Back" color="negative" to="/SubjectManagement" icon="keyboard_backspace" />
      </q-page-sticky>
      <q-timeline color="secondary">
        <q-timeline-entry
          title="Subject Information"
          subtitle="Required"
          icon="person"
          color="primary"
        >
          <div>
            <q-card class="my-card">
              <q-card-section>
                <br>
                <div class="row q-gutter-md row items-start">
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required', val => val.length < 50 || 'Maximum of 150 character' ]" name="code" type="text" v-model="data.code" class="text-primary" label="Code">
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
                    <q-input dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required', val => val.length < 50 || 'Maximum of 150 character' ]" name="subject_name" type="text" v-model="data.subject_name" class="text-primary" label="Subject Name">
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
                    <q-input dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required' ]" name="unit" type="number" v-model="data.unit" class="text-primary" label="Unit">
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
                <div class="row q-gutter-md row items-start">
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" name="pre_requisite" type="text" v-model="data.pre_requisite" class="text-primary" label="Pre-Requisite">
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
          color="primary"
        >
          <div>
            <div class="row q-gutter-md row items-start">
              <q-page-sticky position="bottom-right" :offset="[30, 15]">
                <q-btn fab icon="send" type="submit" color="primary">
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
      data: {
        code: '',
        subject_name: '',
        unit: '',
        pre_requisite: '',
        posted_by: '',
        date_posted: dateToday
      },
    }
  },
  async created () {
    /* var self = this
    self.employee_level_list = []
    await self.$axios.get('employee_level_map_label_value_list/').then(function (response) {
      self.employee_level_list = response.data
    }).catch(function (error) {
      self.error = error
    }) */
  },
  methods: {
    submit () {
      var self = this
      self.data.posted_by = self.$store.state.user_info.id
      self.$store.commit('SubjectManagement/setPost', self.data)
      self.$store.dispatch('SubjectManagement/createData')
        .then(res => {
          // self.showNotif()
          self.$store.commit('SubjectManagement/pushList', res.data)
          console.log(res.data)
          self.reset()
          self.$router.push('/SubjectManagement')
        }).catch(err => {
          console.log(err)
        })
    },
    reset () {
      var self = this
      self.$store.commit('SubjectManagement/setPost', '')
      self.$emit('close')
    },
    showNotif () {
    }
  }
}
</script>
