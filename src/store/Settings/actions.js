import $axios from '../../boot/axios-instance.js'

export function fetchData (state) {
  return $axios.get('/enrollment_setting/enrollment_setting_list/', {
    params: {
      _embed: true
    }
  })
}

export function createData (state) {
  return $axios.post('/enrollment_setting/enrollment_setting_create/', state.state.post)
}

export function updateData (state) {
  return $axios.put('/enrollment_setting/enrollment_setting_update/' + state.state.put.id + '/', state.state.put)
}

export function deleteData (state) {
  return $axios.delete('/enrollment_setting/enrollment_setting_delete/' + state.state.delete.id + '/')
}
