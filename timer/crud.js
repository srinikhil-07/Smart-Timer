var express = require('express');
var app = express();
app.use(express.json()); // This supports the JSON encoded bodies
const db = require('./firestore');
app.post('/sessions', function(req, res) {
    console.log(req.body);
    let data = req.body
    const savedData = await db.create(data);
    res.send(req.body.Idea);
});