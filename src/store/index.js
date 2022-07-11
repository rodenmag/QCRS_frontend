import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

// import example from './module-example'
import StudentManagement from './StudentManagement'
import SubjectManagement from './SubjectManagement'
import CurriculumManagement from './CurriculumManagement'
import CurriculumContent from './CurriculumContent'
import EnrollmentManagement from './EnrollmentManagement'
import PaymentManagement from './PaymentManagement'
import Sponsor from './Sponsor'
import SponsorPayment from './SponsorPayment'
import GradeManagement from './GradeManagement'
import Settings from './Settings'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // example
      StudentManagement,
      SubjectManagement,
      CurriculumManagement,
      CurriculumContent,
      EnrollmentManagement,
      PaymentManagement,
      Sponsor,
      SponsorPayment,
      GradeManagement,
      Settings
    },

    state: {
      user_info: {
        id: '',
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        is_staff: false,
        is_active: false,
        is_superuser: false,
        user_permission: {},
        user_group: {}
      },
      global_search_value: '',
      menu_routes: '',
      // important data !
      employee: [],
      employee_data_search: [], // importante to! di pde galawin
      full_record: [],
      employee_job_history: [],
      employee_data_search_filtered: []
    },
    mutations: {
      // user data !
      id (state, x) {
        state.user_info.id = x
      },
      username (state, x) {
        state.user_info.username = x
      },
      user_permission (state, x) {
        state.user_info.user_permission = x
      },
      first_name (state, x) {
        state.user_info.first_name = x
      },
      last_name (state, x) {
        state.user_info.last_name = x
      },
      email (state, x) {
        state.user_info.email = x
      },
      is_staff (state, x) {
        state.user_info.is_staff = x
      },
      is_active (state, x) {
        state.user_info.is_active = x
      },
      is_superuser (state, x) {
        state.user_info.is_superuser = x
      },
      user_group (state, x) {
        state.user_info.user_group = x
      }
    },
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
