import $axios from '../../boot/axios-instance.js'

export function fetchData (state) {
  return $axios.get('/subject_management/subject_list/', {
    params: {
      _embed: true
    }
  })
}

export function createData (state) {
  return $axios.post('/subject_management/subject_create/', state.state.post)
}

export function updateData (state) {
  return $axios.put('/subject_management/subject_update/' + state.state.put.id + '/', state.state.put)
}

export function deleteData (state) {
  return $axios.delete('/subject_management/subject_delete/' + state.state.delete.id + '/')
}
