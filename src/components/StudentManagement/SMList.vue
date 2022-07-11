<template>
  <q-page padding class="page-showcase">
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
          <q-btn color="primary" icon-right="person" label="Register" :disable="create_button_disable" @click="createDialog = true" />
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
              {{ props.row.full_name }}
            </q-td>
            <q-td align="left">
              {{ props.row.date_created }}
            </q-td>
            <q-td align="left">
              {{ props.row.posted_by_name }}
            </q-td>
            <q-td auto-width>
              <q-btn size="sm" color="secondary" round dense icon="edit" :disable="update_button_disable" style="margin-right: 5px;" @click="getPayload(props.row), updateDialog = true" />
              <q-btn size="sm" color="negative" round dense icon="delete" :disable="delete_button_disable" @click="getPayloadDelete(props.row), deleteDialog = true" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <!-- q-dialog v-model="createDialog" :maximized="maximizedToggle">
      <employee-create @close="createDialog = false"></employee-create>
    </q-dialog>
    <q-dialog v-model="updateDialog" :maximized="maximizedToggle">
      <employee-update @close="updateDialog = false"></employee-update>
    </q-dialog -->
  </q-page>
</template>

<script>
export default {
  data () {
    // :disable="disable_save"
    return {
      create_button_disable: false,
      update_button_disable: false,
      delete_button_disable: true,
      maximizedToggle: true,
      createDialog: false,
      updateDialog: false,
      tab: 'list',
      data_list: [],
      columns: [
        // { name: 'student_id_college', label: 'College Id', field: 'student_id_college', sortable: true, align: 'left' },
        // { name: 'student_id_shs', label: 'SHS Id', field: 'student_id_shs', sortable: true, align: 'left' },
        { name: 'full_name', label: 'Name', field: 'full_name', align: 'left' },
        { name: 'date_created', label: 'Date Posted', field: 'date_created', align: 'left', sortable: true },
        { name: 'posted_by_name', label: 'Posted By', field: 'posted_by_name', align: 'left', sortable: true }
      ],
      paginationControl: { rowsPerPage: 10, page: 1, sortBy: 'last_name' },
      filter: ''
    }
  },
  async created () {
    var self = this
    /*
    if (self.$store.state.user_info.user_group === 'Internal Audit') {
      self.create_button_disable = true
      self.update_button_disable = true
      self.delete_button_disable = true
    } else {
      self.create_button_disable = false
      self.update_button_disable = false
      self.delete_button_disable = true
    } */
    await self.$store.dispatch('StudentManagement/fetchData')
      .then(res => {
        self.$store.commit('StudentManagement/setList', res.data)
        self.data_list = self.$store.getters['StudentManagement/getList']
        console.log(self.data_list)
      }).catch(err => {
        console.log(err)
      })
  },
  computed: {
  },
  watch: {
  },
  methods: {
    getPayload (data) {
      var self = this
      // self.$store.commit('EREmployee/setPut', data)
    }
  },
  components: {
    // 'employee-create': require('components/EREmployee/Create.vue').default,
    // 'employee-update': require('components/EREmployee/Update.vue').default
  }
}
</script>
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
