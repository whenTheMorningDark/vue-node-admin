/* eslint-disable require-jsdoc */
import request from '@/utils/request'
export function login(data) {
  return request({
    url: '/api/user',
    method: 'post',
    data
  })
}