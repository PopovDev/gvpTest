export {}
declare global {
  interface IVideo {
    id: string;
    title: string;
    description: string;
    file:  string;
    createdAt: Date;
    updatedAt: Date;
  }

  interface IVideoFile {
      video: string;
      poster: string;
  }

  interface VideosState {
    list: IVideo[];
  }
  interface VideoState {
    loadedVideos: IVideo[];
    showingVideo: IVideo|null;
  }
}
