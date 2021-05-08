import Vue from 'vue'
import vuex from 'vuex'
import app from "@/store/modules/app";
import menu from "@/store/modules/menu";
import user from "@/store/modules/user";
import iframe from "@/store/modules/iframe";

Vue.use(vuex)

const store = new vuex.Store({
  modules: {
    app: app,
    menu: menu,
    user: user,
    iframe: iframe
  }
})

export default store
