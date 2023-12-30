
const express =require("express"); 

const bcrypt=require("bcrypt")

const router = require("express").Router();

const User = require("../models/User");
const jwt=require("jsonwebtoken")
const JWT_SEC="mysecretkey101"
//REGISTER
router.post("/register", async (req, res) => {
  try {
  //salt is a random string , generated in  time=10
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
//saving the new user 
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
})
//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    //serverside error of user 
    !validated && res.status(400).json("Wrong credentials!");
// except password all the other parmas will be stored in others ...from user._doc as object

const accessToken = jwt.sign(
  {
      id: user._id,
      username:user.username,
      
  },
  JWT_SEC,
      {expiresIn:"3d"}
  );
    const { password, ...others } = user._doc;
    const responseData = { accessToken, ...others };
    res.status(200).json(responseData);
  } catch (err) {
    //internal db error

    res.status(500).json(err);
  }
});




module.exports = router;