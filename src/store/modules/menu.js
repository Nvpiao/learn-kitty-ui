import {SETNAVTREE} from "@/store/mutation_types";

export default {
  state: {
    navTree: []
  },
  getters: {

  },
  mutations: {
    [SETNAVTREE](state, navTree) {
      state.navTree = navTree
    }
  },
  actions: {

  }
}
