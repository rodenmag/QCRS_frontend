import $axios from '../../boot/axios-instance.js'

export function fetchData (state) {
  return $axios.get('/enrollment_management/enrollment_list/', {
    params: {
      _embed: true
    }
  })
}

export function createData (state) {
  return $axios.post('/enrollment_management/enrollment_create/', state.state.post)
}

export function updateData (state) {
  return $axios.put('/enrollment_management/enrollment_update/' + state.state.put.id + '/', state.state.put)
}

export function deleteData (state) {
  return $axios.delete('/enrollment_management/enrollment_delete/' + state.state.delete.id + '/')
}
