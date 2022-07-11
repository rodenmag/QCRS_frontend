<template>
  <q-page padding class="page-showcase">
    <q-form @submit="submit" autocomplete="off">
    <div class="q-px-lg q-pb-md">
      <q-page-sticky position="top-right" :offset="[30, 15]">
        <q-btn flat label="Back" color="negative" to="/EnrollmentManagement" icon="keyboard_backspace" />
      </q-page-sticky>
      <q-timeline color="secondary">
        <q-timeline-entry
          title="Enrollment"
          subtitle="STUDENT"
          icon="person"
          color="primary"
        >
          <div>
            <q-card class="my-card">
              <q-card-section>

                <br>

                <div class="row q-gutter-md row items-start">
                  <div class="col-12 col-md">
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
                      @filter="filterFn"
                      class="text-primary"
                      :options="student_list"
                    >
                      <template v-slot:append>
                        <q-icon color="black" name="search" />
                      </template>
                    </q-select>
                  </div>
                  <div class="col-12 col-md">
                    <q-select dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required' ]" label="Type" emit-value map-options name="type" v-model="data.type" class="text-primary" :options="type_options">
                      <template v-slot:append>
                        <q-icon color="black" name="info" />
                      </template>
                    </q-select>
                  </div>
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required', val => val.length < 50 || 'Maximum of 50 character' ]" name="academic_year" type="text" v-model="data.academic_year" class="text-primary" label="Academic Year">
                      <template v-slot:append>
                        <q-icon color="black" name="info" />
                      </template>
                    </q-input>
                  </div>
                </div>

                <br>

                <div class="row q-gutter-md row items-start">
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" readonly lazy-rules :rules="[ val => !!val || 'Field is Required', val => val.length < 50 || 'Maximum of 50 character' ]" name="student_id" type="text" v-model="data.student_id" class="text-primary" label="Student Id">
                      <template v-slot:append>
                        <q-icon color="black" name="info" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required', val => val.length < 50 || 'Maximum of 50 character' ]" name="year_level" type="text" v-model="data.year_level" class="text-primary" label="Year Level">
                      <template v-slot:append>
                        <q-icon color="black" name="info" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required', val => val.length < 50 || 'Maximum of 50 character' ]" name="trimester" type="text" v-model="data.trimester" class="text-primary" label="Trimester">
                      <template v-slot:append>
                        <q-icon color="black" name="info" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md">
                    <q-select
                      dense
                      v-model="selected_curriculum"
                      use-input
                      label="Curriculum"
                      name="curriculum_search"
                      fill-input
                      hide-selected
                      square
                      input-debounce="0"
                      @filter="filterFnCurriculum"
                      class="text-primary"
                      :options="curriculum_list"
                    >
                      <template v-slot:append>
                        <q-icon color="black" name="search" />
                      </template>
                    </q-select>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          title="Subject List"
          subtitle="LIST"
          icon="contact_phone"
          color="primary"
        >
          <div>
            <q-card class="my-card">
              <q-card-section>
                <q-table
                  :dense="$q.screen.lt.md"
                  :rows="subject_list"
                  :columns="columns"
                  row-key="id"
                  separator="cell"
                  :pagination="paginationControl"
                >
                </q-table>
              </q-card-section>
            </q-card>
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          title="FEES"
          subtitle="GENERATED"
          icon="school"
          color="primary"
        >
          <div>
            <q-card class="my-card">
              <q-card-section>
                <br>
                <div class="row q-gutter-md row items-start">
                  <div class="col-12 col-md">
                    <q-input readonly dense debounce="500" name="scholarship" type="text" v-model="data.scholarship" class="text-primary" label="Scholarship">
                      <template v-slot:append>
                        <q-icon color="black" name="info" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md">
                    <q-input readonly dense debounce="500" name="total_units" type="text" v-model="data.total_units" class="text-primary" label="Total Units">
                      <template v-slot:append>
                        <q-icon color="black" name="school" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md">
                    <q-input readonly dense debounce="500" name="tuition_fee" type="text" v-model="data.tuition_fee" class="text-primary" label="Tuition Fee">
                      <template v-slot:append>
                        <q-icon color="black" name="school" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md">
                    <q-input readonly dense debounce="500" name="gross_fee" type="text" v-model="data.gross_fee" class="text-primary" label="Gross Fee">
                      <template v-slot:append>
                        <q-icon color="black" name="school" />
                      </template>
                    </q-input>
                  </div>
                </div>
                <br>
                <div class="row q-gutter-md row items-start">
                  <div class="col-12 col-md">
                    <q-input readonly dense debounce="500" name="miscellaneous" type="text" v-model="data.miscellaneous" class="text-primary" label="Miscellaneous">
                      <template v-slot:append>
                        <q-icon color="black" name="school" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md">
                    <q-input readonly dense debounce="500" name="nstp" type="text" v-model="data.nstp" class="text-primary" label="NSTP">
                      <template v-slot:append>
                        <q-icon color="black" name="school" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md">
                    <q-input readonly dense debounce="500" name="assessed_amount" type="text" v-model="data.assessed_amount" class="text-primary" label="Assessed Amount">
                      <template v-slot:append>
                        <q-icon color="black" name="school" />
                      </template>
                    </q-input>
                  </div>
                </div>
                <br>
                <div class="row q-gutter-md row items-start">
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" name="enrollment_fee" type="text" v-model="enrollment_fee" class="text-primary" label="Enrollment Fee">
                      <template v-slot:append>
                        <q-icon color="black" name="info" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md">
                    <q-input readonly dense debounce="500" name="prelim" type="text" v-model="data.prelim" class="text-primary" label="Prelim">
                      <template v-slot:append>
                        <q-icon color="black" name="school" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md">
                    <q-input readonly dense debounce="500" name="midterm" type="text" v-model="data.midterm" class="text-primary" label="Midterm">
                      <template v-slot:append>
                        <q-icon color="black" name="school" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md">
                    <q-input readonly dense debounce="500" name="finals" type="text" v-model="data.finals" class="text-primary" label="Finals">
                      <template v-slot:append>
                        <q-icon color="black" name="school" />
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
      payment: {
        student_id: '',
        description: '',
        debit: '0',
        credit: '0',
        date: dateToday,
        posted_by: '',
        type: ''
      },
      sponsor_payment: {
        sponsor_id: '',
        student_id: '',
        description: '',
        debit: '0',
        credit: '0',
        date: dateToday,
        posted_by: ''
      },
      enrollment_fee: '',
      step: ref(1),
      enrollment_setting: [],
      data: {
        student_id: '',
        full_name: '',
        academic_year: '',
        trimester: '',
        year_level: '',
        type: '',
        scholarship: '',
        total_units: '',
        gross_fee: '',
        assessed_amount: '',
        enrollment_fee: '',
        prelim: '',
        midterm: '',
        finals: '',
        miscellaneous: '',
        nstp: '',
        date_posted: '',
        posted_by: '',
        curriculum_id: '',
        tuition_fee: ''
      },
      paginationControl: { rowsPerPage: 10, page: 1, sortBy: 'code' },
      curriculum_list: [],
      selected_curriculum: [],
      student_list: [],
      selected_student: [],
      trimester_word: '',
      year_word: '',
      type_options: [
        {
          label: 'None',
          value: 'None'
        },
        {
          label: 'Regular Class',
          value: 'Regular Class'
        },
        {
          label: 'Evening Class',
          value: 'Evening Class'
        },
      ],
      subject_list: [],
      columns: [
        // { name: 'student_id_college', label: 'College Id', field: 'student_id_college', sortable: true, align: 'left' },
        // { name: 'student_id_shs', label: 'SHS Id', field: 'student_id_shs', sortable: true, align: 'left' },
        { name: 'subject_code', label: 'Code', field: 'subject_code', align: 'left' },
        { name: 'subject_name', label: 'Subject', field: 'subject_name', align: 'left', sortable: true },
        { name: 'unit', label: 'Unit', field: 'unit', align: 'left', sortable: true },
        { name: 'pre_requisite', label: 'Pre-Requisite', field: 'pre_requisite', align: 'left', sortable: true },
      ],
    }
  },
  async created () {
    var self = this
    self.student_list = []
    await self.$api.get('student_management/student_list/').then(function (response) {
      self.stringOptions = response.data
      self.student_list = self.stringOptions
    }).catch(function (error) {
      self.error = error
    })
    self.curriculum_list = []
    await self.$api.get('curriculum_management/curriculum_list/').then(function (response) {
      self.stringOptionsCurriculum = response.data
      self.curriculum_list = self.stringOptionsCurriculum
    }).catch(function (error) {
      self.error = error
    })
  },
  watch: {
    selected_student: function () {
      var self = this
      self.data.full_name = self.selected_student.label
      self.data.student_id = self.selected_student.college_student_id
      self.payment.student_id = self.selected_student.id
      self.sponsor_payment.student_id = self.selected_student.id
      self.sponsor_payment.sponsor_id = self.selected_student.sponsor_id
    },
    selected_curriculum: function () {
      var self = this
      self.data.curriculum_id = self.selected_curriculum.id
      console.log(self.data.curriculum_id)
      self.getCurriculumSubjects()
    },
    enrollment_fee: function () {
      var self = this
      self.data.enrollment_fee = self.enrollment_fee
      self.data.prelim = ((self.data.assessed_amount + self.data.miscellaneous + self.data.nstp) - self.enrollment_fee) / 3
      self.data.midterm = ((self.data.assessed_amount + self.data.miscellaneous + self.data.nstp) - self.enrollment_fee) / 3
      self.data.finals = ((self.data.assessed_amount + self.data.miscellaneous + self.data.nstp) - self.enrollment_fee) / 3
    }
  },
  methods: {
    word_proc () {
      var self = this
      if (self.data.trimester === '1') {
        self.trimester_word = '1st trimester'
      }
      if (self.data.trimester === '2') {
        self.trimester_word = '2nd trimester'
      }
      if (self.data.trimester === '3') {
        self.trimester_word = '3rd trimester'
      }
      if (self.data.year_level === '1') {
        self.year_word = '1st year'
      }
      if (self.data.year_level === '2') {
        self.year_word = '2nd year'
      }
      if (self.data.year_level === '3') {
        self.year_word = '3rd year'
      }
    },
    getCurriculumSubjects () {
      var self = this
      self.subject_list = []
      self.$api.get('curriculum_management/curriculum_content_filter/?curriculum_id=' + self.data.curriculum_id + '&year=' + self.data.year_level + '&trimester=' + self.data.trimester).then(function (response) {
        self.subject_list = response.data
        self.data.total_units = self.subject_list[0].total_units
        self.getEnrollmentSetting ()
      }).catch(function (error) {
        self.error = error
      })
      self.$api.get('enrollment_setting/enrollment_setting_filter/?year=' + self.data.year_level + '&trimester=' + self.data.trimester).then(function (response) {
        self.enrollment_setting = response.data
        self.getEnrollmentSetting()
      }).catch(function (error) {
        self.error = error
      })
    },
    getEnrollmentSetting () {
      var self = this
      self.data.miscellaneous = self.enrollment_setting[0].miscellaneous
      self.data.tuition_fee = self.enrollment_setting[0].tuition_fee
      self.data.nstp = self.enrollment_setting[0].nstp
      self.data.gross_fee = self.enrollment_setting[0].tuition_fee * self.subject_list[0].total_units
      if (self.selected_student.scholarship_percentage === '' || self.selected_student.scholarship_percentage === null) {
        self.data.scholarship = 0
        self.data.assessed_amount = self.data.gross_fee
      } else {
        self.data.scholarship = self.selected_student.scholarship_percentage
        self.data.assessed_amount = self.data.gross_fee - (self.data.gross_fee * (self.data.scholarship / 100))
      }
    },
    submit () {
      var self = this
      self.word_proc()
      self.data.system_id = self.selected_student.id
      self.data.posted_by = self.$store.state.user_info.id
      self.payment.posted_by = self.$store.state.user_info.id
      self.payment.debit = (self.data.assessed_amount + self.data.miscellaneous + self.data.nstp)
      self.payment.description = 'Automated Entry(Enrollment) | ' + self.year_word + ' - ' + self.trimester_word
      self.$api.post('payment_management/payment_create/', self.payment).then(function (response) {
        console.log(response.data)
      }).catch(function (error) {
        self.error = error
      })
      self.$store.commit('EnrollmentManagement/setPost', self.data)
      self.$store.dispatch('EnrollmentManagement/createData')
        .then(res => {
          // self.showNotif()
          self.$store.commit('EnrollmentManagement/pushList', res.data)
          console.log(res.data)
          self.reset()
          self.$router.push('/EnrollmentManagement')
        }).catch(err => {
          console.log(err)
        })
      self.payment.credit = self.data.enrollment_fee
      self.payment.debit = 0
      self.payment.description = 'Automated Entry(Payment) | ' + self.year_word + ' - ' + self.trimester_word
      self.$api.post('payment_management/payment_create/', self.payment).then(function (response) {
        // console.log(response.data)
      }).catch(function (error) {
        self.error = error
      })
      if (self.selected_student.scholarship_percentage === 0 || self.selected_student.scholarship_percentage === null || self.selected_student.scholarship_percentage === '0') {
      } else {
        console.log('running')
        self.sponsor_payment.posted_by = self.$store.state.user_info.id
        self.sponsor_payment.credit = 0
        self.sponsor_payment.debit = (parseFloat(self.selected_student.scholarship_percentage) / 100) * parseFloat(self.data.gross_fee)
        self.sponsor_payment.description = 'Automated Entry(Enrollment) | ' + self.year_word + ' - ' + self.trimester_word
        self.$api.post('payment_management/sponsor_payment_create/', self.sponsor_payment).then(function (response) {
          // console.log(response.data)
        }).catch(function (error) {
          self.error = error
        })
      }
    },
    reset () {
      var self = this
      self.$store.commit('EnrollmentManagement/setPost', '')
      self.$emit('close')
    },
    filterFn (val, update, abort) {
      var self = this
      update(() => {
        const needle = val.toLowerCase()
        self.student_list = self.stringOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    filterFnCurriculum (val, update, abort) {
      var self = this
      update(() => {
        const needle = val.toLowerCase()
        self.curriculum_list = self.stringOptionsCurriculum.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    showNotif () {
    }
  }
}
</script>
