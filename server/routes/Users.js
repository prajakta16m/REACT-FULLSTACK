const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

const {validateToken} = require("../middlewares/AuthMiddleware");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });

    // Generate jsonwebtoken or accesstoken
    const accesstoken = sign({username: user.username, id: user.id}, "importantsecret");

    res.json({token: accesstoken, username: user.username, id: user.id});
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  const user = await Users.findByPk(id, 
    {attributes: {exclude: ["password"]}}
    );
  res.json(user);
}); 

module.exports = router;