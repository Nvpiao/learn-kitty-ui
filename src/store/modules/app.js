import {COLLAPSE, MENUROUTELOADED} from "@/store/mutation_types";

export default {
  state: {
    appName: 'I Learn Kitty',
    collapse: false,
    menuRouteLoaded: false
  },
  getters: {
    [COLLAPSE](state) {
      return state.collapse
    }
  },
  mutations: {
    [COLLAPSE](state) {
      state.collapse = !state.collapse
    },
    [MENUROUTELOADED](state, menuRouteLoaded) {
      state.menuRouteLoaded = menuRouteLoaded
    }
  },
  actions: {

  }
}
