import {SETIFRAMEURL} from "@/store/mutation_types";

export default {
  state: {
    iframeUrl: '',
    iframeUrls: []
  },
  getters: {},
  mutations: {
    [SETIFRAMEURL](state, url) {
      state.iframeUrl = url
    },
    addIFrameUrl(state, iframeUrl) {  // iframeUrls
      state.iframeUrls.push(iframeUrl)
    }
  },
  actions: {}
}
