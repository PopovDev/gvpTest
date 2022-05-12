import {MutationTree} from 'vuex';
import {VideosState} from "~/store/type";

export const mutations: MutationTree<VideosState> = {
  setVideos(state, list) {
    state.list = list;
  }
};

export default mutations;
