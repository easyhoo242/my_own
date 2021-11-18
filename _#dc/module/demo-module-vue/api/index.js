import { config as axios } from './config'

export function getTopicsData () {
  return axios.get('https://cnodejs.org/api/v1/topic/5433d5e4e737cbe96dcef312')
}