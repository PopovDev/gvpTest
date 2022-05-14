import db from "~/plugins/firebase";
import {collection,getDocs} from "firebase/firestore";
export const state = ():VideosState => ({
  list: [],
})
export const mutations = {
  setVideos(state:VideosState, list:LoadableVideo[]) {
    state.list = list;
  },
}
export const actions = {
  async fetchVideos({commit,state}: any) {
    console.log("fetching videos");
    const videosCol = await collection(db, 'videos');
    const querySnapshot = await getDocs(videosCol);
    const data = querySnapshot.docs.map(doc => doc.data());
    const list = Array<any>();
    for (const datum of data) {
      const video: any = {
        name: datum.name as string,
        src: datum.src,
        poster: datum.poster,
      };
      list.push(video);
    }
    commit('setVideos', list);
  }
}
export const getters = {
  list: (state: any) => state.list,
}
