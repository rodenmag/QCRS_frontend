import axios from 'axios'

const $axios = axios.create({
  baseURL: 'http://localhost:8000'
})
// $axios.defaults.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('token')
$axios.defaults.headers.common.Authorization = 'JWT ' + localStorage.getItem('token')
export default $axios
