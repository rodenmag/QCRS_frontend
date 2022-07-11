<template>
  <q-page padding class="q-pa-md justify-center">
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
    <div class="my-card">
      <q-table
        :dense="$q.screen.lt.md"
        :rows="data_list"
        :columns="columns"
        row-key="id"
        :filter="filter"
        separator="cell"
        :pagination="paginationControl"
      >
        <template v-slot:top-left>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:top-right>
          <q-btn color="primary" icon-right="grade" label="Add Grades" :disable="create_button_disable" to="/GMAdd" />
        </template>

        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.label }}
            </q-th>
            <q-th auto-width>
              <div align="center">
                Action
              </div>
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td align="left">
              {{ props.row.year }}
            </q-td>
            <q-td align="left">
              {{ props.row.trimester }}
            </q-td>
            <q-td align="left">
              {{ props.row.subject_code }}
            </q-td>
            <q-td align="left">
              {{ props.row.subject_name }}
            </q-td>
            <q-td align="left">
              {{ props.row.numerical_grade }}
            </q-td>
            <q-td align="left">
              {{ props.row.percentage_grade }}
            </q-td>
            <q-td align="left">
              {{ props.row.remarks }}
            </q-td>
            <q-td align="left">
              {{ props.row.posted_by_name }}
            </q-td>
            <q-td auto-width>
              <q-btn size="sm" color="secondary" round dense icon="edit" :disable="update_button_disable" style="margin-right: 5px;" @click="getPayload(props.row)" />
              <q-btn size="sm" color="negative" round dense icon="delete" :disable="delete_button_disable" @click="getPayloadDelete(props.row), deleteDialog = true" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
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
    return {
      excel_name: '',
      student_list: [],
      data_list: [],
      selected_student: [],
      columns: [
        // { name: 'student_id_college', label: 'College Id', field: 'student_id_college', sortable: true, align: 'left' },
        // { name: 'student_id_shs', label: 'SHS Id', field: 'student_id_shs', sortable: true, align: 'left' },
        // { name: 'full_name', label: 'Name', field: 'full_name', align: 'left' },
        { name: 'year', label: 'Year', field: 'year', align: 'left' },
        { name: 'trimester', label: 'Trimester', field: 'trimester', align: 'left' },
        { name: 'subject_code', label: 'Code', field: 'subject_code', align: 'left', sortable: true },
        { name: 'subject_name', label: 'Subject', field: 'subject_name', align: 'left', sortable: true },
        { name: 'numerical_grade', label: 'Numerical', field: 'numerical_grade', align: 'left', sortable: true },
        { name: 'percentage_grade', label: 'Percentage', field: 'percentage_grade', align: 'left', sortable: true },
        { name: 'remarks', label: 'Remarks', field: 'remarks', align: 'left', sortable: true },
        { name: 'posted_by_name', label: 'Posted By', field: 'posted_by_name', align: 'left', sortable: true }
      ],
      paginationControl: { rowsPerPage: 10, page: 1, sortBy: 'year' },
      filter: ''
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
  watch: {
    selected_student: function () {
      var self = this
      self.excel_name = 'grades_' + self.selected_student.full_name
      self.grade_proc()
    }
  },
  methods: {
    grade_proc () {
      var self = this
      self.$api.get('grade_management/grades_filter/?student_id=' + self.selected_student.id).then(function (response) {
        self.data_list = response.data
      }).catch(function (error) {
        self.error = error
      })
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
    // 'json-excel': require('components/Excel/JsonExcel.vue').default
  }
}
</script>
