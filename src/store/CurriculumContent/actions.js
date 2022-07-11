import $axios from '../../boot/axios-instance.js'

export function fetchData (state) {
  return $axios.get('/curriculum_management/curriculum_content_list/', {
    params: {
      _embed: true
    }
  })
}

export function createData (state) {
  return $axios.post('/curriculum_management/curriculum_content_create/', state.state.post)
}

export function updateData (state) {
  return $axios.put('/curriculum_management/curriculum_content_update/' + state.state.put.id + '/', state.state.put)
}

export function deleteData (state) {
  return $axios.delete('/curriculum_management/curriculum_content_delete/' + state.state.delete.id + '/')
}

export function searchData (state) {
  return $axios.get('/curriculum_management/curriculum_content_filter/?curriculum_id=' + state.state.search)
}
