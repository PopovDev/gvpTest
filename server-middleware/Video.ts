import express from 'express';
import path from "path";
import * as process from "process";

const app = express();

const videoPath: string = process.env.VIDEO_PATH || 'videos';
const videosDir = path.join(__dirname, '../', videoPath);

console.log(videosDir);
app.get('/:id', (req, res) => {
  console.log(req.headers);
  res.setHeader('Content-Type', 'video/mp4');
  res.sendFile(path.join(videosDir, '1', 'video.mp4'));
  console.log('end');
});

module.exports = app;
