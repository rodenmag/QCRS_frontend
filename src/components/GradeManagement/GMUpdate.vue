<template>
  <q-page padding class="page-showcase">
    <q-form @submit="submit" autocomplete="off">
    <div class="q-px-lg q-pb-md">
      <q-page-sticky position="top-right" :offset="[30, 15]">
        <q-btn flat label="Back" color="negative" to="/GradeManagement" icon="keyboard_backspace" />
      </q-page-sticky>
      <q-timeline color="secondary">
        <q-timeline-entry
          title="Grades"
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
                    <q-input dense readonly debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required', val => val.length < 50 || 'Maximum of 150 character' ]" name="year" type="text" v-model="data.full_name" class="text-primary" label="Year">
                      <template v-slot:append>
                        <q-icon color="black" name="info" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required', val => val.length < 50 || 'Maximum of 150 character' ]" name="year" type="text" v-model="data.year" class="text-primary" label="Year">
                      <template v-slot:append>
                        <q-icon color="black" name="info" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required', val => val.length < 50 || 'Maximum of 150 character' ]" name="trimester" type="text" v-model="data.trimester" class="text-primary" label="Trimester">
                      <template v-slot:append>
                        <q-icon color="black" name="info" />
                      </template>
                    </q-input>
                  </div>
                </div>
                <br>
                <div class="row q-gutter-md row items-start">
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" readonly lazy-rules :rules="[ val => !!val || 'Field is Required', val => val.length < 50 || 'Maximum of 150 character' ]" name="subject_code" type="text" v-model="data.subject_code" class="text-primary" label="Subject Code">
                      <template v-slot:append>
                        <q-icon color="black" name="info" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" readonly lazy-rules :rules="[ val => !!val || 'Field is Required', val => val.length < 50 || 'Maximum of 150 character' ]" name="subject_name" type="text" v-model="data.subject_name" class="text-primary" label="Subject Name">
                      <template v-slot:append>
                        <q-icon color="black" name="info" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" readonly name="unit" type="text" v-model="data.unit" class="text-primary" label="Unit">
                      <template v-slot:append>
                        <q-icon color="black" name="info" />
                      </template>
                    </q-input>
                  </div>
                </div>
                <br>
                <div class="row q-gutter-md row items-start">
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required', val => val.length < 50 || 'Maximum of 150 character' ]" name="percentage" type="text" v-model="data.percentage_grade" class="text-primary" label="Percentage Grade">
                      <template v-slot:append>
                        <q-icon color="black" name="grade" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required', val => val.length < 50 || 'Maximum of 150 character' ]" name="numerical" type="text" v-model="data.numerical_grade" class="text-primary" label="Numerical Grade">
                      <template v-slot:append>
                        <q-icon color="black" name="grade" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" name="remarks" type="text" v-model="data.remarks" class="text-primary" label="Remarks">
                      <template v-slot:append>
                        <q-icon color="black" name="grade" />
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
      stringOptions: [],
      stringOptionsSub: [],
      student_list: [],
      subject_list: [],
      selected_student: [],
      selected_subject: [],
      step: ref(1),
      data: [],
    }
  },
  async created () {
    var self = this
    self.data = JSON.parse(JSON.stringify(self.$store.getters['GradeManagement/getPut']))
    self.subject_list = []
    await self.$api.get('subject_management/subject_list/').then(function (response) {
      self.stringOptionsSub = response.data
      self.subject_list = self.stringOptionsSub
    }).catch(function (error) {
      self.error = error
    })
    self.student_list = []
    await self.$api.get('student_management/student_list/').then(function (response) {
      self.stringOptions = response.data
      self.student_list = self.stringOptions
    }).catch(function (error) {
      self.error = error
    })
  },
  watch: {
    selected_student: function () {
      var self = this
      self.data.student_id = self.selected_student.id
    },
    selected_subject: function () {
      var self = this
      self.data.subject_code = self.selected_subject.code
      self.data.subject_name = self.selected_subject.subject_name
      self.data.unit = self.selected_subject.unit
    }
  },
  methods: {
    submit () {
      var self = this
      self.data.posted_by = self.$store.state.user_info.id
      self.$store.commit('GradeManagement/setPut', self.data)
      self.$store.dispatch('GradeManagement/updateData')
        .then(res => {
          // self.showNotif()
          self.$store.commit('GradeManagement/modifyList', res.data)
          self.reset()
          self.$router.push('/GradeManagement')
        }).catch(err => {
          console.log(err)
        })
    },
    reset () {
      var self = this
      self.$store.commit('GradeManagement/setPut', '')
      self.$emit('close')
    },
    showNotif () {
    },
    filterFn (val, update, abort) {
      var self = this
      update(() => {
        const needle = val.toLowerCase()
        self.student_list = self.stringOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    filterFnSubject (val, update, abort) {
      var self = this
      update(() => {
        const needle = val.toLowerCase()
        self.subject_list = self.stringOptionsSub.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
</script>
