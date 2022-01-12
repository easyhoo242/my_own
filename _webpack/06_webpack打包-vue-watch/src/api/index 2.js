import axios from 'axios'

export const getTopic = (id) => {
  return axios.get(`https://cnodejs.org/api/v1/topic/${id}`)
}