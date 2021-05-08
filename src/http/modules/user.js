import axios from "@/http/axios";

export const save = (params) => {
  return axios({
    url: '/user/save',
    method: 'post',
    params
  })
}

export const del = (params) => {
  return axios({
    url: '/user/delete',
    method: 'post',
    params
  })
}

export const findPage = (params) => {
  return axios({
    url: '/user/findPage',
    method: 'post',
    params
  })
}

export const findPermissions = (params) => {
  return axios({
    url:"/user/findPermissions",
    method: 'get',
    params
  })
}
