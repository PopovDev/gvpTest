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
  if (!id) {
    res.status(400).send('No id provided');
    return;
  }
  if(!videosMap.has(id)) {
    res.status(404).send('Video not found');
    return;
  }
  const video = videosMap.get(id);
  res.send(video);

});

module.exports = app;
