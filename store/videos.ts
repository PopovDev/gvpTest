import db from "~/plugins/firebase";
import {collection,getDocs} from "firebase/firestore";
export const state = ():VideosState => ({
  list: [],
})
export const mutations = {
  setVideos(state:VideosState, list:IVideo[]) {
    state.list = list;
  },
}
export const actions = {
  async fetchVideos({commit,state}: any) {
    const videosCol = await collection(db, 'videos');
    const querySnapshot = await getDocs(videosCol);
    const data = querySnapshot.docs.map(doc => doc.data());
    const list = Array<any>();
    for (const datum of data) {
      list.push(datum as IVideo);
    }
    commit('setVideos', list);
  }
}
export const getters = {
  list: (state: any) => state.list,
}
