import { boot } from 'quasar/wrappers'
import JsonExcel from 'vue-json-excel'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ( { app, router, store } ) => {
  // something to do
  app.component('downloadExcel', JsonExcel)
})
