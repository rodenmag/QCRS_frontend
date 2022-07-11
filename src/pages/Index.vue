<template>
  <div class="bg-teal window-height window-width row justify-center items-center">
    <div class="">
      <h5 class="text-h5 text-white q-my-md"> QCRS College </h5>
      <q-card flat bordered class="my-card bg-grey-1 text-teal" style="padding-top:45px; padding-bottom:75px; padding-left:45px; padding-right:45px; width:400px; background-color: rgba(0, 0, 0, 0.6);">
        <q-card-section>
          <h5 style="color: teal"> Login </h5>
        </q-card-section>
        <q-separator teal inset />
        <q-card-section>
          <q-input text-color="teal" v-model="login.username" @keyup.enter="submit" label="Username" color="teal" />
          <q-input v-model="login.password" @keyup.enter="submit" type="password" label="Password" style="margin-top: 10px;" color="teal" />
        </q-card-section>
        <div class="column items-center" style="margin-top: 20px;">
          <q-btn style="width: 300px" color="teal" @click="submit()" label="SIGN IN" />
        </div>
      </q-card>
    </div>
 </div>
</template>

<script>
import { QSpinnerFacebook } from 'quasar'
export default {
  data () {
    return {
      login: {
        username: '',
        password: ''
      },
      permissions: []
    }
  },
  methods: {
    show (options) {
      var self = this
      self.$q.loading.show(options)
      setTimeout(() => {
        self.$q.loading.hide()
      }, 3000)
    },
    showNotification () {
      this.$q.notify({
        color: 'negative',
        icon: 'report_problem',
        message: 'The password you`ve entered is incorrect.',
        position: 'bottom',
        timeout: 3000
      })
    },
    loginSuccess () {
      var self = this
      self.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'white',
        spinnerSize: 180,
        message: 'Loading please wait . . . . .',
        messageColor: 'white'
      })
    },
    submit () {
      var self = this
      self.$api.post('login/', self.login).then(function (response) {
        setTimeout(() => {
          localStorage.setItem('token', response.data.token)
          self.$router.push('/')
          location.reload()
        }, 3000)
      }).catch(function (e) {
        // self.showNotification()
      })
    }
  }
}
</script>
