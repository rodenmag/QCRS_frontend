<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <q-icon name="account_circle" color="red" size="28px" />
          <q-toolbar-title shrink class="text-weight-bold">
            Student Management
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="blue-7" icon="account_circle" to="/Home" v-if="$q.screen.gt.sm">
            <q-tooltip>Student</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="subject" to="/SubjectManagement" v-if="$q.screen.gt.sm">
            <q-tooltip>Subject</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="menu_book" to="/CurriculumManagement" v-if="$q.screen.gt.sm">
            <q-tooltip>Curriculum</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="recent_actors" to="/EnrollmentManagement" v-if="$q.screen.gt.sm">
            <q-tooltip>Enrollment</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="grade" to="/GradeManagement" v-if="$q.screen.gt.sm">
            <q-tooltip>Grades</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="payment" to="/PaymentManagement" v-if="$q.screen.gt.sm">
            <q-tooltip>Payment</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="summarize" to="/ReportManagement" v-if="$q.screen.gt.sm">
            <q-tooltip>Reports</q-tooltip>
          </q-btn>
          <q-btn round dense flat>
            <q-avatar size="26px">
              <q-icon name="arrow_drop_down" />
            </q-avatar>
            <q-menu
              transition-show="rotate"
              transition-hide="rotate"
            >
              <q-list style="min-width: 100px">
                <q-item clickable>
                  <q-item-section>Hi, {{ $store.state.user_info.first_name }} {{ $store.state.user_info.last_name }} </q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable @click="logout">
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!-- q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
      :width="240"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item to="" v-ripple clickable>
            <q-item-section avatar>
              <q-icon name="group" />
            </q-item-section>
            <q-item-section>
              <q-item-label> Student List </q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="" v-ripple clickable>
            <q-item-section avatar>
              <q-icon name="work" />
            </q-item-section>
            <q-item-section>
              <q-item-label> New Student </q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="" v-ripple clickable>
            <q-item-section avatar>
              <q-icon name="payment" />
            </q-item-section>
            <q-item-section>
              <q-item-label> Compensation </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator class="q-my-sm" />
        </q-list>
      </q-scroll-area>
    </q-drawer -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { fabYoutube } from '@quasar/extras/fontawesome-v5'
export default {
  name: 'MyLayout',
  data () {
    return {
      stringOptions: [],
      global_search_value: '',
      leftDrawerOpen: false,
      search: '',
      links1: [
        { icon: 'home', text: 'Home' },
        { icon: 'whatshot', text: 'Trending' },
        { icon: 'subscriptions', text: 'Subscriptions' }
      ],
      links2: [
        { icon: 'folder', text: 'Library' },
        { icon: 'restore', text: 'History' },
        { icon: 'watch_later', text: 'Watch later' },
        { icon: 'thumb_up_alt', text: 'Liked videos' }
      ],
      links3: [
        { icon: fabYoutube, text: 'YouTube Premium' },
        { icon: 'local_movies', text: 'Movies & Shows' },
        { icon: 'videogame_asset', text: 'Gaming' },
        { icon: 'live_tv', text: 'Live' }
      ],
      links4: [
        { icon: 'settings', text: 'Settings' },
        { icon: 'flag', text: 'Report history' },
        { icon: 'help', text: 'Help' },
        { icon: 'feedback', text: 'Send feedback' }
      ],
      buttons1: [
        { text: 'About' },
        { text: 'Press' },
        { text: 'Copyright' },
        { text: 'Contact us' },
        { text: 'Creators' },
        { text: 'Advertise' },
        { text: 'Developers' }
      ],
      buttons2: [
        { text: 'Terms' },
        { text: 'Privacy' },
        { text: 'Policy & Safety' }
      ]
    }
  },
  async created () {
    var self = this
    self.token = localStorage.getItem('token')
    await self.$api.post('token-verify/', { token: self.token }).then(function (response) {
      self.$store.commit('id', response.data.user.id)
      self.$store.commit('username', response.data.user.username)
      self.$store.commit('first_name', response.data.user.first_name)
      self.$store.commit('last_name', response.data.user.last_name)
      self.$store.commit('email', response.data.user.email)
      self.$store.commit('is_staff', response.data.user.is_staff)
      self.$store.commit('is_active', response.data.user.is_active)
      self.$store.commit('is_superuser', response.data.user.is_superuser)
      self.$store.commit('user_permission', response.data.user.user_permission)
      self.$store.commit('user_group', response.data.user.user_group[0].name)
    })
  },
  watch: {
  },
  methods: {
    logout: function () {
      var self = this
      localStorage.removeItem('token')
      localStorage.removeItem('vuex')
      self.$router.push('/')
    }
  }
}
</script>

<style lang="sass">
.YL
  &__toolbar-input-container
    min-width: 100px
    width: 225px
    margin-right: 10px
  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      color: #000
</style>
