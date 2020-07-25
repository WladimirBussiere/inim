const express = require('express');
const User = require("../models/user.model.js");
const Token = require("../models/token.model.js");
const {login, signup, authenticate, logout} = require("../controllers/user.controller.js");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

//route de test qui récupère le password pour voir si le token fonctionne
router.get("/current", authenticate, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
  console.log('USER: ', user);
});




router.post("/logout", authenticate, logout)

module.exports = router;
