import {SETPARAMS} from "@/store/mutation_types";

export default {
    state: {
        perms: [],  // 用户权限标识集合
    },
    getters: {

    },
    mutations: {
        [SETPARAMS](state, perms){  // 用户权限标识集合
            state.perms = perms;
        }
    },
    actions: {
    }
}
