import $axios from '../../boot/axios-instance.js'

export function fetchData (state) {
  return $axios.get('/payment_management/sponsor_list/', {
    params: {
      _embed: true
    }
  })
}

export function createData (state) {
  return $axios.post('/payment_management/sponsor_create/', state.state.post)
}

export function updateData (state) {
  return $axios.put('/payment_management/sponsor_update/' + state.state.put.id + '/', state.state.put)
}

export function deleteData (state) {
  return $axios.delete('/payment_management/sponsor_delete/' + state.state.delete.id + '/')
}
