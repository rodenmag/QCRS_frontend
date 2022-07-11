import $axios from '../../boot/axios-instance.js'

export function fetchData (state) {
  return $axios.get('/grade_management/grades_list/', {
    params: {
      _embed: true
    }
  })
}

export function createData (state) {
  return $axios.post('/grade_management/grades_create/', state.state.post)
}

export function updateData (state) {
  return $axios.put('/grade_management/grades_update/' + state.state.put.id + '/', state.state.put)
}

export function deleteData (state) {
  return $axios.delete('/grade_management/grades_delete/' + state.state.delete.id + '/')
}

export function searchData (state) {
  return $axios.get('/grade_management/grades_filter/?student_id=' + state.state.data.id)
}
