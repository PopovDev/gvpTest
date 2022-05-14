import db from "./adminDb";


const videos = new Map<string, IVideo>();

db.collection('videos').onSnapshot((e) => {
  for (const change of e.docChanges()) {
    const n = change.doc.data() as IVideo;
    const id = change.doc.id;
    switch (change.type) {
      case 'added':
        videos.set(id, n);
        break;
      case 'modified':
        videos.set(id, n);
        break;
      case 'removed':
        videos.delete(id);
        break;
    }
  }
});



export default videos;
