<template>
  <q-layout view="lHh LpR lFf">
    <q-header
      reveal
      :class="$q.dark.isActive ? 'header_dark' : 'header_normal'"
    >
      <q-toolbar>
        <q-btn
          @click="left = !left"
          flat
          round
          dense
          icon="menu"
          class="q-mr-sm"
        />
        <!--          <q-avatar>-->
        <!--            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">-->
        <!--          </q-avatar>-->

        <q-toolbar-title> QCRS System </q-toolbar-title>
        <q-btn
          class="q-mr-xs"
          flat
          round
          @click="$q.dark.toggle()"
          :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
        />
        <q-btn
          flat
          round
          dense
          icon="logout"
          @click="logoutNotify"
          to="/"
        >
        <q-tooltip content-class="bg-black" :offset="[10, 10]">
          Logout
        </q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer
      class="left-navigation text-white"
      show-if-above
      v-model="left"
      style="background-image: ~assets/lake.jpg !important;"
      side="left"
      elevated
    >
      <div
        class="full-height"
        :class="$q.dark.isActive ? 'drawer_dark' : 'drawer_normal'"
      >
        <div style="height: calc(100% - 117px);padding:10px;">
          <q-toolbar>
            <q-avatar>
              <img src="~assets/qcrs-png100.png" />
            </q-avatar>

            <q-toolbar-title>{{ $store.state.user_info.username }} </q-toolbar-title>
          </q-toolbar>
          <hr />
          <q-scroll-area style="height:100%;">
            <q-list padding>
              <q-item
                active-class="tab-active"
                to="/Home"
                exact
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="account_circle" />
                </q-item-section>

                <q-item-section>
                  Student Information
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                to="/SubjectManagement"
                exact
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="subject" />
                </q-item-section>

                <q-item-section>
                  Subject List
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                to="/CurriculumManagement"
                exact
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="menu_book" />
                </q-item-section>

                <q-item-section>
                  Curriculum List
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                to="/EnrollmentManagement"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="recent_actors" />
                </q-item-section>

                <q-item-section>
                  Enrollment Management
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                to="/GradeManagement"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="grade" />
                </q-item-section>

                <q-item-section>
                  Student Grades
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                to="/PaymentManagement"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="money" />
                </q-item-section>

                <q-item-section>
                  Payment Management
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                to="/ReportManagement"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="assignment" />
                </q-item-section>

                <q-item-section>
                  Reports
                </q-item-section>
              </q-item>

              <!-- q-item
                active-class="tab-active"
                to="/transactions"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="assignment" />
                </q-item-section>

                <q-item-section>
                  Transactions
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                to="/employee_salary_list"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="list" />
                </q-item-section>

                <q-item-section>
                  Employee Salary List
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                to="/calendar"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="calendar_today" />
                </q-item-section>

                <q-item-section>
                  Calendar
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                to="/department"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="business" />
                </q-item-section>

                <q-item-section>
                  Department
                </q-item-section>
              </q-item>

              <q-item
                active-class="tab-active"
                to="/my_profile"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="drafts" />
                </q-item-section>

                <q-item-section>
                  My Profile
                </q-item-section>
              </q-item -->
            </q-list>
          </q-scroll-area>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <q-page class="row no-wrap">
        <div class="col">
          <div class="full-height">
            <q-scroll-area class="col q-pr-sm full-height" visible>
              <router-view />
            </q-scroll-area>
          </div>
        </div>
      </q-page>
      <!-- q-banner inline-actions rounded style="background-color:#5dcf8a" class="z-max shadow-10 q-ma-md absolute absolute-bottom text-white">
        Looking for beautiful premium Quasar CRM admin template for Vue 3? Please drop me an email. Buy only at <b>$49</b>!
        <template v-slot:action>
          <q-btn target="_blank" type="a" href="https://next-quasar-admin-crm.netlify.com/" flat style="background-color:purple" class="text-capitalize q-mr-md" label="Live Demo"></q-btn>
          <q-btn type="a" href="mailto:mayank091193@gmail.com" flat style="background-color:#172b4d" class="text-capitalize" label="Email me"></q-btn>
        </template>
      </q-banner -->
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      left: false
    };
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
  methods: {
    logoutNotify() {
      var self = this
      localStorage.removeItem('token')
      localStorage.removeItem('vuex')
      self.$router.push('/')
    }
  }
};
</script>

<style>
.q-drawer {
  /*background-image: url(https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg) !important;*/
  background-image: url("~assets/lake.jpg") !important;
  background-size: cover !important;
}

.drawer_normal {
  background-color: rgba(1, 1, 1, 0.75);
}

.drawer_dark {
  background-color: #010101f2;
}

.navigation-item {
  border-radius: 5px;
}

.tab-active {
  background-color: green;
}

body {
  /* background: #f1f1f1 !important; */
}

.header_normal {
  background: linear-gradient(
    145deg,
    rgb(32, 106, 80) 15%,
    rgb(21, 57, 102) 70%
  );
}

.header_dark {
  background: linear-gradient(145deg, rgb(61, 14, 42) 15%, rgb(14, 43, 78) 70%);
}
</style>
