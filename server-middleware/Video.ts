import express from 'express';
import path from "path";
import * as process from "process";

import videosMap from "./Libs/syncVideoConnection";
import videoFilesMap from "./Libs/syncVideoFilesConnection";


const app = express();

const mainDir = path.join(__dirname, '../');
const videoPath: string = process.env.VIDEO_PATH || 'videos';
const videosDir = path.join(mainDir, videoPath);


app.get('/?:id', (req, res) => {
  const id = req.params.id;
  const isPoster = req.query.poster;
  if (!id) {
    res.status(400).send('No id provided');
    return;
  }
  const videos = [...videosMap.values()];
  if (!videos.find(video => video.file === id)) {
    res.status(404).send('Video not found');
    return;
  }
  if (!videoFilesMap.has(id)) {
    res.status(404).send('Video not found');
    return;
  }
  const filesDir = path.join(videosDir, id);
  const file = videoFilesMap.get(id)!;
  if (isPoster) {
    res.sendFile(path.join(filesDir, file.poster));
  } else {
    res.sendFile(path.join(filesDir, file.video));
  }

});

module.exports = app;
