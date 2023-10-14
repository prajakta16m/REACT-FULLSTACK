const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    const users = await Users.findAll();
    res.send(users);
});

/** Create Post data in table */
router.post('/', async (req, res) => {

    const {username, password} = req.body;
    bcrypt.hash(password, 10).then(hash => {

        const obj = Users.create({
            username,
            password: hash
        });
        res.json('SUCCESS');
    });
    
    
});

// login route
router.post('/login', async (req, res) => {

    const {username, password} = req.body;
    const user = await Users.findOne({where: {username: username}});

    if(!user){
        res.json({error: 'User does not exist.'});
    }

    // check password!
    bcrypt.compare(password, user.password).then((match) => {
        if(!match) res.json("Wrong username and password combination.");
        // match found. write the code login.
        res.json("You logged in!");
    });

});

module.exports = router;