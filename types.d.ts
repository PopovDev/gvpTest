export {}
declare global {
  interface IVideo {
    title: string;
    description: string;
    file:  FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
    createdAt: Date;
    updatedAt: Date;
  }

  interface IVideoFile {
      video: string;
      poster: string;
  }


  interface LoadableVideo {
    src: string;
    poster: string;
    name: string;
  }

  interface VideosState {
    list: LoadableVideo[];
  }

}
