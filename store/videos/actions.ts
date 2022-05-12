import {ActionTree} from 'vuex';
import {VideosState} from "~/store/type";

export const actions: ActionTree<VideosState, any> = {
  increment: ({ commit }) => {
    commit('increment');
  }
};

export default actions;
