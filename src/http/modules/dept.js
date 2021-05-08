import axios from "@/http/axios";

export const findDeptTree = () => {
  return axios({
    url: '/dept/findTree',
    method: 'get'
  })
}
