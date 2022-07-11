
const routes = [
  {
    path: '/',
    component: () => import('pages/Index'),
    meta: {
      forVisitors: true
    }
  },
  {
    path: '/Home',
    component: () => import('layouts/FinalLayout'),
    children: [
      { path: '', component: () => import('pages/Home') },
      { path: '/SMRegister', component: () => import('components/StudentManagement/SMRegister') },
      { path: '/SMUpdate', component: () => import('components/StudentManagement/SMUpdate') }
    ],
    meta: {
      forAuth: true
    }
  },
  {
    path: '/Home',
    component: () => import('layouts/FinalLayout'),
    children: [
      { path: '/SubjectManagement', component: () => import('pages/SubjectManagement') },
      { path: '/SMNew', component: () => import('components/SubjectManagement/SMNew') },
      { path: '/SubjectUpdate', component: () => import('components/SubjectManagement/SMUpdate') },
      { path: '/SubjectDelete', component: () => import('components/SubjectManagement/SMDelete') },
    ],
    meta: {
      forAuth: true
    }
  },
  {
    path: '/Home',
    component: () => import('layouts/FinalLayout'),
    children: [
      { path: '/CurriculumManagement', component: () => import('pages/CurriculumManagement') },
      { path: '/CMNew', component: () => import('components/CurriculumManagement/CMAdd') },
      { path: '/CMUpdate', component: () => import('components/CurriculumManagement/CMUpdate') },
      { path: '/CCAdd', component: () => import('components/CurriculumContent/CCAdd') },
      { path: '/CCUpdate', component: () => import('components/CurriculumContent/CCUpdate') },
    ],
    meta: {
      forAuth: true
    }
  },
  {
    path: '/Home',
    component: () => import('layouts/FinalLayout'),
    children: [
      { path: '/EnrollmentManagement', component: () => import('pages/EnrollmentManagement') },
      { path: '/EMAdd', component: () => import('components/EnrollmentManagement/EMAdd') },
      { path: '/EMUpdate', component: () => import('components/EnrollmentManagement/EMUpdate') },
      { path: '/EnrollmentSettings', component: () => import('pages/Settings') },
      { path: '/SUpdate', component: () => import('components/Settings/SettingUpdate') },
    ],
    meta: {
      forAuth: true
    }
  },

  {
    path: '/Home',
    component: () => import('layouts/FinalLayout'),
    children: [
      { path: '/PaymentManagement', component: () => import('pages/PaymentManagement') },
      { path: '/PMView', component: () => import('components/PaymentManagement/PMView') },
      { path: '/PMAdd', component: () => import('components/PaymentManagement/PMAdd') },
      { path: '/PMSView', component: () => import('components/Sponsor/PMSView') },
      
    ],
    meta: {
      forAuth: true
    }
  },

  {
    path: '/Home',
    component: () => import('layouts/FinalLayout'),
    children: [
      { path: '/ReportManagement', component: () => import('pages/ReportManagement') },
      { path: '/billing', component: () => import('components/Reports/billing') },
      { path: '/transcript', component: () => import('components/Reports/transcript') },
      { path: '/browse_grades', component: () => import('components/Reports/evaluation') },
      
    ],
    meta: {
      forAuth: true
    }
  },

  {
    path: '/Home',
    component: () => import('layouts/FinalLayout'),
    children: [
      { path: '/GradeManagement', component: () => import('pages/GradeManagement') },
      { path: '/GMAdd', component: () => import('components/GradeManagement/GMAdd') },
      { path: '/GMUpdate', component: () => import('components/GradeManagement/GMUpdate') }
    ],
    meta: {
      forAuth: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
