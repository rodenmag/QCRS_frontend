<template>
  <q-page padding class="page-showcase">
    <q-form @submit="submit" autocomplete="off">
    <div class="q-px-lg q-pb-md">
      <q-page-sticky position="top-right" :offset="[30, 15]">
        <q-btn flat label="Back" color="negative" to="/CurriculumManagement" icon="keyboard_backspace" />
      </q-page-sticky>
      <q-timeline color="secondary">
        <q-timeline-entry
          title="Curriculum"
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
                    <q-input dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required', val => val.length < 50 || 'Maximum of 150 character' ]" name="name" type="text" v-model="data.name" class="text-primary" label="Curriculum Name">
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
                    <q-input dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required', val => val.length < 50 || 'Maximum of 150 character' ]" name="year" type="text" v-model="data.year" class="text-primary" label="Academic Year">
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
                    <q-input dense debounce="500" lazy-rules :rules="[ val => !!val || 'Field is Required', val => val.length < 50 || 'Maximum of 150 character' ]" name="remarks" type="text" v-model="data.remarks" class="text-primary" label="Remarks">
                      <template v-slot:append>
                        <q-icon color="black" name="info" />
                      </template>
                    </q-input>
                  </div>
                </div>
              </q-card-section>
            </q-card>
            <br>
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
    self.data = JSON.parse(JSON.stringify(self.$store.getters['CurriculumManagement/getPut']))
  },
  methods: {
    submit () {
      var self = this
      self.data.posted_by = self.$store.state.user_info.id
      self.$store.commit('CurriculumManagement/setPut', self.data)
      self.$store.dispatch('CurriculumManagement/updateData')
        .then(res => {
          // self.showNotif()
          self.$store.commit('CurriculumManagement/modifyList', res.data)
          self.reset()
          self.$router.push('/CurriculumManagement')
        }).catch(err => {
          console.log(err)
        })
    },
    reset () {
      var self = this
      self.$store.commit('CurriculumManagement/setPut', '')
      self.$emit('close')
    },
    showNotif () {
    }
  }
}
</script>
