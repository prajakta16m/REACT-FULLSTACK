const express = require('express');
const router = express.Router();
const { Posts } = require('../models');

router.get('/', async (req, res) => {
    const allPosts = await Posts.findAll();
    res.send(allPosts);
});

router.get('/byId/:id', async(req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
});

/** Create Post data in table */
router.post('/', async (req, res) => {

    const post = req.body;
    const obj = await Posts.create(post);
    res.json(obj);
});

module.exports = router;