export {}
declare global {
  interface IVideo {
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

}
