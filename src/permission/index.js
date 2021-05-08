import store from '@/store'


export function hasPermission(perms) {
  let hasPerm = false
  let permissions = store.state.user.perms
  for (let i = 0; i < permissions.length; ++i) {
    if(permissions[i] === perms) {
      hasPerm = true
      break
    }
  }
  return hasPerm
}
