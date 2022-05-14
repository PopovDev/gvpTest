import db from "./adminDb";


const videoFiles = new Map<string, IVideoFile>();

db.collection('videoFiles').onSnapshot((e) => {
  for (const change of e.docChanges()) {
    const n = change.doc.data() as IVideoFile;
    const id = change.doc.id;
    switch (change.type) {
      case 'added':
        videoFiles.set(id, n);
        break;
      case 'modified':
        videoFiles.set(id, n);
        break;
      case 'removed':
        videoFiles.delete(id);
        break;
    }
  }
});


export default videoFiles;
