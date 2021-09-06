'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./firestore');
const router = express.Router();
router.use(bodyParser.json());
router.post('/', async(req, res) => {
    console.log(req.body);
    const book = await db.create(req.body);
    res.json(book);
});
module.exports = router;