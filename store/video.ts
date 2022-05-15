import db from "~/plugins/firebase";
import {collection, getDocs, doc, getDoc, where, query} from "firebase/firestore";
import {ActionTree, ActionContext} from 'vuex'

export const state = (): VideoState => ({
  loadedVideos: [],
  showingVideo: null,
});
export const mutations = {
  addLoadedVideo(state: VideoState, video: IVideo) {
    state.loadedVideos.push(video);
  },
  setShowingVideo(state: VideoState, video: IVideo) {
    state.showingVideo = video;
  }
}
export const actions: ActionTree<VideoState, VideoState> = {
  async loadVideo({commit, state}, id: string) {
    if (state.loadedVideos.find(v => v.id === id)) return;
    const videoSnap = await getDocs(query(collection(db, 'videos'), where('id', '==', id)));
    if (videoSnap.empty) return;
    commit('addLoadedVideo', videoSnap.docs[0].data() as IVideo);
  },
  async videoExists({commit, state, dispatch}, id: string) {
    if (state.loadedVideos.find(v => v.id === id)) return true;
    const videoSnap = await getDocs(query(collection(db, 'videos'), where('id', '==', id)));
    if (!videoSnap.empty) {
      commit('addLoadedVideo', videoSnap.docs[0].data() as IVideo);
      return true;
    }
    return false;
  },
  async setShowingVideo({commit, state, dispatch}, id: string) {
    if (state.showingVideo && state.showingVideo.id === id) return;
    if (!state.loadedVideos.find(v => v.id === id)) await dispatch('loadVideo', id);
    commit('setShowingVideo', state.loadedVideos.find(v => v.id === id));
  },
}
export const getters = {
  loadedVideos(state: VideoState) {
    return state.loadedVideos;
  },
  showingVideo(state: VideoState) {
    return state.showingVideo;
  }
}
