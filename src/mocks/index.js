import Mock from 'mockjs'
import {baseUrl} from "@/utils/global";

import * as login from '@/mocks/modules/login'
import * as user from '@/mocks/modules/user'
import * as dept from '@/mocks/modules/dept'
import * as role from '@/mocks/modules/role'
import * as menu from '@/mocks/modules/menu'
import * as dict from '@/mocks/modules/dict'
import * as log from '@/mocks/modules/log'

let openMock = true
fnCreate(login, openMock)
fnCreate(user, openMock)
fnCreate(dept, openMock)
fnCreate(role, openMock)
fnCreate(menu, openMock)
fnCreate(dict, openMock)
fnCreate(log, openMock)


function fnCreate(mod, isOpen = true) {
  if (isOpen) {
    for (let key in mod) {
      ((res) => {
        if (res.isOpen !== false) {
          let url = baseUrl
          if (!url.endsWith('/')) {
            url += '/'
          }

          url += res.url
          Mock.mock(new RegExp(url), res.type, (opts) => {
            opts['data'] = opts.body ? JSON.parse(opts.body) : null
            delete opts.body
            console.log('\n')
            console.log('%cmock拦截，请求：', 'color:blue', opts)
            console.log('%cmock拦截，响应：', 'color:blue', res.data)
            return res.data
          })
        }
      })(mod[key]() || {})
    }
  }
}
