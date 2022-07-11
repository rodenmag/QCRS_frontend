<template>
  <q-page padding class="q-pa-md row justify-center">
    <div>
      <div style="padding:20px; border: 1px solid black;" >
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
        </div>
        <br>
        <div class="row q-gutter-md row items-start">
          <div class="col-12 col-md">
            <q-input dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required', val => val.length < 50 || 'Maximum of 50 character' ]" name="year_level" type="text" v-model="year" class="text-primary" label="Year Level">
              <template v-slot:append>
                <q-icon color="black" name="info" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md">
            <q-input dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required', val => val.length < 50 || 'Maximum of 50 character' ]" name="trimester" type="text" v-model="trimester" class="text-primary" label="Trimester">
              <template v-slot:append>
                <q-icon color="black" name="info" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="row q-gutter-md row items-start">
          <div class="col-12 col-md">
            <q-input dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required', val => val.length < 50 || 'Maximum of 50 character' ]" name="cutoff_payment_encoding" type="text" v-model="billing_data.cutoff_payment_encoding" class="text-primary" label="Encoding Cutoff Date">
              <template v-slot:append>
                <q-icon color="black" name="info" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="q-pa-md row justify-center">
          <q-btn color="black" icon-right="settings" @click="enrollment_proc()"> SETUP </q-btn>
        </div>
      </div>
      <br>
      <div style="width: 816px; height: 1248px; border: 1px solid red;">
        <br><br><br>
        <div id="printMe">
          <table id="report" style="text-align: left; width: 100%">
            <tr>
              <th align="right"> <b style="visibility: hidden">-------------------------</b> </th>
              <th align="right"><img src="~assets/qcrs-png100.png"></th>
              <th>
                <h6 class="row justify-center" style="margin:0px"> QCRS COLLEGE, Inc </h6>
                <b class="row justify-center" style="margin-right:0px"> 2nd Floor M.Z. Garcia Bldg. </b>
                <b class="row justify-center" style="margin-right:0px"> Allarey cor Magallanes Sts., Lucena City </b>
                <b class="row justify-center" style="margin-right:0px"> Telephone No. (042) 373-2413 </b>
              </th>
              <th align="right"> <b style="visibility: hidden">-----------------------------------</b> </th>
            </tr>
          </table>
          <br><br>
          <table id="report" style="text-align: center; width: 100%">
            <tr>
            <th align="right"> <b style="visibility: hidden">------------------------------</b> </th>
            <th>
              <b class="row justify-center" style=""> Statement of Accounts </b>
              <b class="row justify-center" style=""> S.Y. {{ billing_data.academic_year }} </b>
            </th>
            <th align="right"> <b style="visibility: hidden">-------------------------</b> </th>
          </tr>
          </table>
           <br>
          <table id="report" style="text-align: left; width: 100%">
            <tr>
              <th style="padding-left:100px"></th>
              <td style="padding-left:0px"></td>
              <td style="padding-left:100px"></td>
              <td style="padding-left:100px"></td>
              <td style="padding-left:50px"></td>
            </tr>
            <tr>
              <td align="left" style="padding-left:35px"> <b> Name : </b> </td>
              <td align="left" style=""> {{ billing_data.name }} </td>
            </tr>
            <tr>
              <td align="left" style="padding-left:35px"> <b> ID No. : </b> </td>
              <td align="left" style=""> {{ billing_data.id_number }} </td>
            </tr>
            <br>
            <tr>
              <th></th>
              <td align="left">1. Registration and Miscellaneous Fees</td>
              <td align="right"> <b> ₱ </b> </td>
              <td align="right"> <b> {{ billing_data.registration_and_misc }} </b> </td>
            </tr>
            <tr>
              <th></th>
              <td align="left">2. {{ billing_data.trimester_word }} S.Y. {{ billing_data.academic_year }} </td>
              <td align="left"> <b>Enrollment</b> </td>
              <td align="right"> <b> {{ billing_data.enrollment }} </b> </td>
            </tr>
            <tr>
              <th></th>
              <td align="left"><b style="visibility: hidden">2. </b> {{ billing_data.course }} {{ billing_data.total_units }} Units ( ₱{{ billing_data.per_unit }}/unit )</td>
              <td> <b>Prelim</b> </td>
              <td align="right"> <b> {{ billing_data.prelim }} </b> </td>
            </tr>
            <tr>
              <th></th>
              <td align="left"></td>
              <td> <b>Midterm</b> </td>
              <td align="right"> <b> {{ billing_data.midterm }} </b> </td>
            </tr>
            <tr>
              <th></th>
              <td align="left"></td>
              <td> <b>Finals</b> </td>
              <td align="right" style="border-bottom: 2px solid #000"> <b> {{ billing_data.finals }} </b> </td>
            </tr>
            <tr>
              <th></th>
              <td align="left"> <b style="visibility: hidden">2. </b> <b> Total, {{ billing_data.trimester_word }} </b> </td>
              <td> <b></b> </td>
              <td align="right"> <b> {{ billing_data.total }} </b> </td>
            </tr>
            <tr>
              <th></th>
              <td align="left">3. Old Account </td>
              <td> <b></b> </td>
              <td align="right" style="border-bottom: 2px solid #000"> <b> {{ billing_data.old_account }} </b> </td>
            </tr>
            <tr>
              <th></th>
              <td align="left"> <b style="visibility: hidden">2. </b> <b> Total Account </b> </td>
              <td> <b></b> </td>
              <td align="right" style="border-bottom:2px solid #000; text-decoration:underline;"> <b> {{ billing_data.total_account }} </b> </td>
            </tr>
          </table>
          <br><br>
          <table id="report" style="text-align: left; width: 100%">
            <tr>
              <th style="padding-left:35px" align="left"> Notes : </th>
              <td></td>
            </tr>
            <tr>
              <th></th>
              <td align="left">1. The total amount due must be settled before final exam.</td>
            </tr>
            <tr>
              <th></th>
              <td align="left"> <b style="visibility: hidden">2. </b> Promisory note will not be accepted. </td>
            </tr>
            <tr>
              <th></th>
              <td align="left">2. Payment may be made to any QCRB branch.</td>
            </tr>
            <tr>
              <th></th>
              <td align="left">3. To those who are paying from other branches please email Ms.</td>
            </tr>
            <tr>
              <th></th>
              <td align="left"> <b style="visibility: hidden">2. </b> Mary Ann Baugh a copy of your fund transfers. </td>
            </tr>
            <tr>
              <th></th>
              <td align="left">4. To those who are paying through gcash kindly send to</td>
            </tr>
            <tr>
              <th></th>
              <td align="left"> <b style="visibility: hidden">2. </b> <b> accounts@qcrscollege.org </b> a copy of your confirmed receipt. </td>
            </tr>
            <tr>
              <th></th>
              <td align="left">5. Cut off date of payment encoding is {{ billing_data.cutoff_payment_encoding }}.</td>
            </tr>
            <tr>
              <th></th>
              <td align="left"> <b style="visibility: hidden">2. </b> Payment from this date onwards may not reflect in this billing. </td>
            </tr>
          </table>
          <br><br><br><br>
          <table id="report" style="text-align: left; width: 100%">
            <tr>
              <th></th>
              <td></td>
              <td></td>
              <td style="padding-left:25px"></td>
            </tr>
            <tr>
              <th align="center"> ROWENA B. NIEVA </th>
              <th align="center"> RONA T. LOBOS</th>
              <th align="center">Received by:</th>
            </tr>
            <tr>
              <td align="center"> Senior Accountant </td>
              <td align="center"> Administrator</td>
              <td align="center" style="border-bottom: 2px solid #000"></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td align="center" style="font-size:8px">Ctl No. BSBA 001-01219</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <!-- q-btn color="negative" v-print="'#printMe'"> Print </q-btn -->
    <div class="row q-gutter-md row items-start">
      <q-page-sticky position="bottom-right" :offset="[30, 15]">
        <q-btn fab icon="print" v-print="'#printMe'" color="negative">
          <q-tooltip content-class="bg-black" :offset="[10, 10]">
            Print
          </q-tooltip>
        </q-btn>
      </q-page-sticky>
    </div>
    <div class="row q-gutter-md row items-start">
      <q-page-sticky position="bottom-left" :offset="[30, 15]">
        <q-btn fab icon="keyboard_backspace" color="primary" to="/ReportManagement">
          <q-tooltip content-class="bg-black" :offset="[10, 10]">
            Back
          </q-tooltip>
        </q-btn>
      </q-page-sticky>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    // :disable="disable_save"
    return {
      year: '',
      trimester: '',
      student_list: [],
      enrollment_details: [],
      selected_student: [],
      billing_data: {
        name: '',
        id_number: '',
        registration_and_misc: '',
        enrollment: '',
        prelim: '',
        midterm: '',
        finals: '',
        total: '',
        old_account: '',
        total_account: '',
        total_units: '',
        per_unit: '',
        academic_year: '',
        trimester_word: '',
        course: '',
        cutoff_payment_encoding: 'November 18, 2021'
      },
      student_payment: 0,
      enrollment_default: 0,
      prelim_default: 0,
      midterm_default: 0,
      finals_default: 0,
      misc_default: 0,
      total_default: 0,
      old_account_default: 0
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
  },
  computed: {
  },
  watch: {
    selected_student: function () {
      var self = this
      self.billing_data.name = self.selected_student.first_name + ' ' + self.selected_student.last_name
      self.billing_data.id_number = self.selected_student.college_student_id
      self.billing_data.course = self.selected_student.course
    }
  },
  methods: {
    comma_proc (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    enrollment_proc () {
      var self = this
      self.trimester_proc()
      self.$api.get('enrollment_management/enrollment_filter/?system_id=' + self.selected_student.id + '&year=' + self.year + '&trimester=' + self.trimester).then(function (response) {
        self.enrollment_details = response.data
        // self.billing_data.enrollment = parseFloat(self.enrollment_details[0].enrollment_fee).toFixed(2)
        // self.billing_data.prelim = parseFloat(self.enrollment_details[0].prelim).toFixed(2)
        // self.billing_data.midterm = parseFloat(self.enrollment_details[0].midterm).toFixed(2)
        // self.billing_data.finals = parseFloat(self.enrollment_details[0].finals).toFixed(2)
        self.misc_default = (parseFloat(self.enrollment_details[0].miscellaneous)).toFixed(2)
        self.enrollment_default = ((parseFloat(self.enrollment_details[0].assessed_amount) + parseFloat(self.enrollment_details[0].nstp)) / 4).toFixed(2)
        self.prelim_default = ((parseFloat(self.enrollment_details[0].assessed_amount) + parseFloat(self.enrollment_details[0].nstp)) / 4).toFixed(2)
        self.midterm_default = ((parseFloat(self.enrollment_details[0].assessed_amount) + parseFloat(self.enrollment_details[0].nstp)) / 4).toFixed(2)
        self.finals_default = ((parseFloat(self.enrollment_details[0].assessed_amount) + parseFloat(self.enrollment_details[0].nstp)) / 4).toFixed(2)
        self.total_default = parseFloat(self.misc_default) + parseFloat(self.enrollment_default) + parseFloat(self.prelim_default) + parseFloat(self.midterm_default) + parseFloat(self.finals_default)

        self.billing_data.registration_and_misc = (parseFloat(self.enrollment_details[0].miscellaneous)).toFixed(2) // + parseFloat(self.enrollment_details[0].nstp)).toFixed(2)
        self.billing_data.enrollment = ((parseFloat(self.enrollment_details[0].assessed_amount) + parseFloat(self.enrollment_details[0].nstp)) / 4).toFixed(2)
        self.billing_data.prelim = ((parseFloat(self.enrollment_details[0].assessed_amount) + parseFloat(self.enrollment_details[0].nstp)) / 4).toFixed(2)
        self.billing_data.midterm = ((parseFloat(self.enrollment_details[0].assessed_amount) + parseFloat(self.enrollment_details[0].nstp)) / 4).toFixed(2)
        self.billing_data.finals = ((parseFloat(self.enrollment_details[0].assessed_amount) + parseFloat(self.enrollment_details[0].nstp)) / 4).toFixed(2)

        self.billing_data.per_unit = (parseFloat(self.enrollment_details[0].gross_fee) / parseFloat(self.enrollment_details[0].total_units)).toFixed(2)
        self.billing_data.total_units = self.enrollment_details[0].total_units
        self.billing_data.academic_year = self.enrollment_details[0].academic_year
        self.billing_data.old_account = ((parseFloat(self.selected_student.balance) + parseFloat(self.selected_student.credit)) - parseFloat(self.total_default)).toFixed(2)

        self.student_payment = parseFloat(self.total_default - self.selected_student.balance)
        // self.student_payment = parseFloat(self.enrollment_details[0].miscellaneous) + parseFloat(self.enrollment_details[0].nstp) + parseFloat(self.enrollment_details[0].assessed_amount) - parseFloat(self.selected_student.balance)
        // self.billing_data.enrollment = self.comma_proc(self.billing_data.enrollment)
        // self.billing_data.prelim = self.comma_proc(self.billing_data.prelim)
        // self.billing_data.midterm = self.comma_proc(self.billing_data.midterm)
        // self.billing_data.finals = self.comma_proc(self.billing_data.finals)
        // self.billing_data.per_unit = self.comma_proc(self.billing_data.per_unit)
        // self.billing_data.registration_and_misc = self.comma_proc(self.billing_data.registration_and_misc)
        // self.billing_data.total = self.comma_proc(self.billing_data.total)
        // self.billing_data.old_account = self.comma_proc(self.billing_data.old_account)
        // self.billing_data.total_account = self.comma_proc(self.billing_data.total_account)
        self.billing_algorithm()
      }).catch(function (error) {
        self.error = error
      })
    },
    trimester_proc () {
      var self = this
      if (self.trimester === '1') {
        self.billing_data.trimester_word = '1st Trimester'
      }
      if (self.trimester === '2') {
        self.billing_data.trimester_word = '2nd Trimester'
      }
      if (self.trimester === '3') {
        self.billing_data.trimester_word = '3rd Trimester'
      }
    },
    billing_algorithm () {
      var self = this
      if (self.billing_data.old_account == 0) {
        self.algorithm()
      } else if (self.billing_data.old_account < 0) {
        // console.log(self.student_payment)
        self.student_payment = self.student_payment + Math.abs(self.billing_data.old_account)
        // console.log(Math.abs(self.billing_data.old_account))
        self.billing_data.old_account = 0
        // console.log(self.student_payment)
        self.algorithm()
      }
    },
    algorithm () {
      var self = this
      if (self.billing_data.registration_and_misc >= self.student_payment) {
        self.billing_data.registration_and_misc = parseFloat(self.misc_default) - parseFloat(self.student_payment)
        self.student_payment = 0
      } else if (self.billing_data.registration_and_misc <= self.student_payment) {
        self.billing_data.registration_and_misc = 0
        self.student_payment = parseFloat(self.student_payment) - parseFloat(self.misc_default)
      }
      if (self.billing_data.enrollment >= self.student_payment) {
        self.billing_data.enrollment = parseFloat(self.enrollment_default) - parseFloat(self.student_payment)
        self.student_payment = 0
      } else if (self.billing_data.enrollment <= self.student_payment) {
        self.billing_data.enrollment = 0
        self.student_payment = parseFloat(self.student_payment) - parseFloat(self.enrollment_default)
      }
      if (self.billing_data.prelim >= self.student_payment) {
        self.billing_data.prelim = parseFloat(self.prelim_default) - parseFloat(self.student_payment)
        self.student_payment = 0
      } else if (self.billing_data.prelim <= self.student_payment) {
        self.billing_data.prelim = 0
        self.student_payment = parseFloat(self.student_payment) - parseFloat(self.prelim_default)
      }
      if (self.billing_data.midterm >= self.student_payment) {
        self.billing_data.midterm = parseFloat(self.midterm_default) - parseFloat(self.student_payment)
        self.student_payment = 0
      } else if (self.billing_data.midterm <= self.student_payment) {
        self.billing_data.midterm = 0
        self.student_payment = parseFloat(self.student_payment) - parseFloat(self.midterm_default)
      }
      if (self.billing_data.finals >= self.student_payment) {
        self.billing_data.finals = parseFloat(self.finals_default) - parseFloat(self.student_payment)
        self.student_payment = 0
      } else if (self.billing_data.finals <= self.student_payment) {
        self.billing_data.finals = 0
        self.student_payment = parseFloat(self.student_payment) - parseFloat(self.finals_default)
      }
      // console.log(self.billing_data)
      self.billing_data.total = parseFloat(self.billing_data.registration_and_misc) + parseFloat(self.billing_data.enrollment) + parseFloat(self.billing_data.prelim) + parseFloat(self.billing_data.midterm) + parseFloat(self.billing_data.finals)
      self.billing_data.total_account = parseFloat(self.billing_data.old_account) + parseFloat(self.billing_data.total)
      
      self.student_payment = parseFloat(self.enrollment_details[0].miscellaneous) + parseFloat(self.enrollment_details[0].nstp) + parseFloat(self.enrollment_details[0].assessed_amount) - parseFloat(self.selected_student.balance)
      self.billing_data.enrollment = self.comma_proc(parseFloat(self.billing_data.enrollment).toFixed(2))
      self.billing_data.prelim = self.comma_proc(parseFloat(self.billing_data.prelim).toFixed(2))
      self.billing_data.midterm = self.comma_proc(parseFloat(self.billing_data.midterm).toFixed(2))
      self.billing_data.finals = self.comma_proc(parseFloat(self.billing_data.finals).toFixed(2))
      self.billing_data.per_unit = self.comma_proc(parseFloat(self.billing_data.per_unit).toFixed(2))
      self.billing_data.registration_and_misc = self.comma_proc(parseFloat(self.billing_data.registration_and_misc).toFixed(2))
      self.billing_data.total = self.comma_proc(parseFloat(self.billing_data.total).toFixed(2))
      self.billing_data.old_account = self.comma_proc(parseFloat(self.billing_data.old_account).toFixed(2))
      self.billing_data.total_account = self.comma_proc(parseFloat(self.billing_data.total_account).toFixed(2))
    },
    filterFn (val, update, abort) {
      var self = this
      update(() => {
        const needle = val.toLowerCase()
        self.student_list = self.stringOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    }
  },
  components: {
    // 'printing': require('components/Print/Printing.vue').default
  }
}
</script>
<style>
</style>
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
