/* eslint-disable require-jsdoc */
import request from '@/utils/request'
export function register(data) {
  return request({
    url: '/api/register',
    method: 'post',
    data
  })
}

export function registerInfo(params) {
  return request({
    url: '/api/registerInfo',
    method: 'get',
    params: params
  })
}