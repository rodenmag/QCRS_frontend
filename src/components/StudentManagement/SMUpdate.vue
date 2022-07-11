<template>
  <q-page padding class="page-showcase">
    <q-form @submit="submit">
    <div class="q-px-lg q-pb-md">
      <q-page-sticky position="top-right" :offset="[30, 15]">
        <q-btn flat label="Back" color="negative" to="/Home" icon="keyboard_backspace" />
      </q-page-sticky>
      <q-timeline color="secondary">

        <q-timeline-entry
          title="Student Information"
          subtitle="Required"
          icon="person"
        >
          <div>
            <q-card class="my-card">
              <q-card-section>

                <br>

                <div class="row q-gutter-md row items-start">
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required', val => val.length < 50 || 'Maximum of 50 character' ]" name="first_name" type="text" v-model="data.first_name" class="text-primary" label="First Name">
                      <template v-slot:append>
                        <q-icon color="black" name="info" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required', val => val.length < 50 || 'Maximum of 50 character' ]" name="middle_name" type="text" v-model="data.middle_name" class="text-primary" label="Middle Name">
                      <template v-slot:append>
                        <q-icon color="black" name="info" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required', val => val.length < 50 || 'Maximum of 50 character' ]" name="last_name" type="text" v-model="data.last_name" class="text-primary" label="Last Name">
                      <template v-slot:append>
                        <q-icon color="black" name="info" />
                      </template>
                    </q-input>
                  </div>
                </div>

                <br>

                <div class="row q-gutter-md row items-start">
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required' ]" name="birthday_new" v-model="data.birthday" class="text-primary" type="date" label="Birthday">
                      <template v-slot:append>
                        <q-icon color="black" name="cake" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md">
                    <q-select dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required' ]" label="Gender" emit-value map-options name="gender" v-model="data.gender" class="text-primary" :options="gender_options">
                      <template v-slot:append>
                        <q-icon color="black" name="wc" />
                      </template>
                    </q-select>
                  </div>
                  <div class="col-12 col-md">
                    <q-select dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required' ]" label="Civil Status" emit-value map-options name="civil_status" v-model="data.civil_status" class="text-primary" :options="civil_options">
                      <template v-slot:append>
                        <q-icon color="black" name="supervised_user_circle" />
                      </template>
                    </q-select>
                  </div>
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required', val => val.length < 50 || 'Maximum of 50 character' ]" name="contact_number" type="text" v-model="data.contact_number" class="text-primary" label="Contact Number">
                      <template v-slot:append>
                        <q-icon color="black" name="phone_android" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required']" name="scholarship_percentage" type="text" v-model="data.scholarship_percentage" class="text-primary" label="Scholarship %">
                      <template v-slot:append>
                        <q-icon color="black" name="info" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md">
                    <q-select
                      dense
                      v-model="selected_sponsor"
                      use-input
                      label="Sponsor"
                      name="sponsor_search"
                      fill-input
                      hide-selected
                      square
                      input-debounce="0"
                      @filter="filterFn"
                      class="text-primary"
                      :options="sponsor_list"
                    >
                      <template v-slot:append>
                        <q-icon color="black" name="search" />
                      </template>
                    </q-select>
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
                    <q-input dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required', val => val.length < 50 || 'Maximum of 50 character' ]" name="shs_student_id" type="text" v-model="data.shs_student_id" class="text-primary" label="Student ID (SHS)">
                      <template v-slot:append>
                        <q-icon color="black" name="fingerprint" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md">
                    <q-select dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required' ]" label="Strand" emit-value map-options name="strand" v-model="data.strand" class="text-primary" :options="strand_options">
                      <template v-slot:append>
                        <q-icon color="black" name="grade" />
                      </template>
                    </q-select>
                  </div>
                </div>

                <br>

                <div class="row q-gutter-md row items-start">
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required', val => val.length < 50 || 'Maximum of 50 character' ]" name="shs_student_id" type="text" v-model="data.college_student_id" class="text-primary" label="Student ID (COLLEGE)">
                      <template v-slot:append>
                        <q-icon color="black" name="fingerprint" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md">
                    <q-select dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required' ]" label="Course" emit-value map-options name="course" v-model="data.course" class="text-primary" :options="course_options">
                      <template v-slot:append>
                        <q-icon color="black" name="grade" />
                      </template>
                    </q-select>
                  </div>
                </div>
              </q-card-section>
            </q-card>

          </div>
        </q-timeline-entry>

        <q-timeline-entry
          title="Address | Contacts"
          subtitle="Optional"
          icon="contact_phone"
        >
          <div>
            <q-card class="my-card">
              <q-card-section>
                <br>
                <div class="row q-gutter-md row items-start">
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" name="brgy" type="text" v-model="data.brgy" class="text-primary" label="Barangay">
                      <template v-slot:append>
                        <q-icon color="black" name="home" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" name="city_province" type="text" v-model="data.city_province" class="text-primary" label="City | Province">
                      <template v-slot:append>
                        <q-icon color="black" name="location_city" />
                      </template>
                    </q-input>
                  </div>
                </div>

                <br>

                <div class="row q-gutter-md row items-start">
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" name="father_name" type="text" v-model="data.father_name" class="text-primary" label="Father's Name">
                      <template v-slot:append>
                        <q-icon color="black" name="info" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" type="text" v-model="data.mother_name" class="text-primary" label="Mother's Name">
                      <template v-slot:append>
                        <q-icon color="black" name="info" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" name="parent_contact_number" type="text" v-model="data.parent_contact_number" class="text-primary" label="Parent's Contact Number">
                      <template v-slot:append>
                        <q-icon color="black" name="phone_android" />
                      </template>
                    </q-input>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          title="School History"
          subtitle="Optional"
          icon="school"
        >
          <div>
            <q-card class="my-card">
              <q-card-section>
                <br>
                <div class="row q-gutter-md row items-start">
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" name="elementary" type="text" v-model="data.elementary_school" class="text-primary" label="Elementary">
                      <template v-slot:append>
                        <q-icon color="black" name="school" />
                      </template>
                    </q-input>
                  </div>
                </div>

                <br>

                <div class="row q-gutter-md row items-start">
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" name="junior_high_school" type="text" v-model="data.junior_high_school" class="text-primary" label="Junior High School">
                      <template v-slot:append>
                        <q-icon color="black" name="school" />
                      </template>
                    </q-input>
                  </div>
                </div>

                <br>

                <div class="row q-gutter-md row items-start">
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" name="senior_high_school" type="text" v-model="data.senior_high_school" class="text-primary" label="Senior High School">
                      <template v-slot:append>
                        <q-icon color="black" name="school" />
                      </template>
                    </q-input>
                  </div>
                </div>

                <br>

                <div class="row q-gutter-md row items-start">
                  <div class="col-12 col-md">
                    <q-input dense debounce="500" name="college" type="text" v-model="data.college" class="text-primary" label="College">
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
        >
          <div>
            <div class="row q-gutter-md row items-start">
              <q-page-sticky position="bottom-right" :offset="[30, 15]">
                <q-btn fab icon="send" type="submit" color="secondary">
                  <q-tooltip content-class="bg-black" :offset="[10, 10]">
                    Update!
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
      selected_sponsor: [],
      sponsor_list: [],
      data: [],
      course_options: [
        {
          label: 'None',
          value: 'None'
        },
        {
          label: 'BSMA',
          value: 'BSMA'
        },
        {
          label: 'BSBA - FM',
          value: 'BSBA - FM'
        },
        {
          label: 'BSBA - MM',
          value: 'BSBA - MM'
        },
        {
          label: 'BSBA - OM',
          value: 'BSBA - OM'
        },
        {
          label: 'BSBA - HDRM',
          value: 'BSBA - HDRM'
        },
        {
          label: 'BSBA - BE',
          value: 'BSBA - BE'
        },
        {
          label: 'BSIA',
          value: 'BSIA'
        }
      ],
      strand_options: [
        {
          label: 'None',
          value: 'None'
        },
        {
          label: 'ABM',
          value: 'ABM'
        },
        {
          label: 'STEM',
          value: 'STEM'
        },
        {
          label: 'HUMMS',
          value: 'HUMMS'
        },
        {
          label: 'GAS',
          value: 'GAS'
        },
        {
          label: 'ICT',
          value: 'ICT'
        },
        {
          label: 'TVL',
          value: 'TVL'
        }
      ],
      gender_options: [
        {
          label: 'Male',
          value: 'Male'
        },
        {
          label: 'Female',
          value: 'Female'
        }
      ],
      civil_options: [
        {
          label: 'Single',
          value: 'Single'
        },
        {
          label: 'Married',
          value: 'Married'
        },
        {
          label: 'Widow / Widower',
          value: 'Widow / Widower'
        },
        {
          label: 'Annuled / Legally Separated',
          value: 'Annuled / Legally Separated'
        },
        {
          label: 'Divorced',
          value: 'Divorced'
        }
      ],
    }
  },
  async created () {
    var self = this
    self.data = JSON.parse(JSON.stringify(self.$store.getters['StudentManagement/getPut']))
    self.sponsor_list = []
    await self.$api.get('payment_management/sponsor_list/').then(function (response) {
      self.stringOptions = response.data
      self.sponsor_list = self.stringOptions
      if (self.data.sponsor_id === null) {
      } else {
        const test = response.data.filter(x => x.id === self.data.sponsor_id)
        self.selected_sponsor = test[0]
        // self.selected_sponsor = response.data[self.data.sponsor_id - 1]
      }
      // self.selected_sponsor = response.data[1]
    }).catch(function (error) {
      self.error = error
    })
  },
  watch: {
    selected_sponsor: function () {
      var self = this
      self.data.sponsor_id = this.selected_sponsor.id
    }
  },
  methods: {
    submit () {
      var self = this
      self.data.posted_by = self.$store.state.user_info.id
      self.$store.commit('StudentManagement/setPut', self.data)
      self.$store.dispatch('StudentManagement/updateData')
        .then(res => {
          // self.showNotif()
          self.$store.commit('StudentManagement/modifyList', res.data)
          self.reset()
          self.$router.push('/Home')
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
    reset () {
      var self = this
      self.$store.commit('StudentManagement/setPut', '')
      self.$emit('close')
    },
    showNotif () {
    }
  }
}
</script>
