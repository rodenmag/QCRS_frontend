import $axios from '../../boot/axios-instance.js'

export function fetchData (state) {
  return $axios.get('/payment_management/payment_list/', {
    params: {
      _embed: true
    }
  })
}

export function createData (state) {
  return $axios.post('/payment_management/payment_create/', state.state.post)
}

export function updateData (state) {
  return $axios.put('/payment_management/payment_update/' + state.state.put.id + '/', state.state.put)
}

export function deleteData (state) {
  return $axios.delete('/payment_management/payment_delete/' + state.state.delete.id + '/')
}

export function searchData (state) {
  return $axios.get('/payment_management/payment_filter/?student_id=' + state.state.data.id)
}
