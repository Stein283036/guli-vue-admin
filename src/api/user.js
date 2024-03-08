import request from '@/utils/request'

const USER_BASE_URL = "/edu/service/users";

export function login(data) {
  return request({
    url: `${USER_BASE_URL}/login`,
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: `${USER_BASE_URL}/info`,
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: `${USER_BASE_URL}/logout`,
    method: 'post'
  })
}
