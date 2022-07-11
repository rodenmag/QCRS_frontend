import $axios from '../../boot/axios-instance.js'

export function fetchData (state) {
  return $axios.get('/student_management/student_list/', {
    params: {
      _embed: true
    }
  })
}

export function createData (state) {
  return $axios.post('/student_management/student_create/', state.state.post)
}

export function updateData (state) {
  return $axios.put('/student_management/student_update/' + state.state.put.id + '/', state.state.put)
}

export function deleteData (state) {
  return $axios.delete('/student_management/student_delete/' + state.state.delete.id + '/')
}
