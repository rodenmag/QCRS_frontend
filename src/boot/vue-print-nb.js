import { boot } from 'quasar/wrappers'
import Print from 'vue3-print-nb'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router }) => {
  // something to do
  app.use(Print)
})
