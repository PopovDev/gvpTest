import express from 'express';

const app = express();


app.post('/generateId', (req, res) => {
    res.send({
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    });
});

module.exports = app;
