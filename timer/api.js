'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./firestore');

const router = express.Router();

// Automatically parse request body as JSON
router.use(bodyParser.json());
router.post('/', async(req, res) => {
    const book = await db.create(req.body);
    res.json(book);
});