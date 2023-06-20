const router = require("express").Router();
const User = require("../models/User");
//if required to delete all the posts use the Post model
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//UPDATE method

router.put("/", async (req, res) => {
    //:id is the params (to check that you are the account holder )
    console.log(req.query.id===req.body.userId)
  if (req.body.userId === req.query.id) {
    //if change in password
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
        //find the req.params.id and update it with body using set method and return a new instance of the object 
        const usernameToUpdate = req.body.username;
        const searchCriteria = { username: req.query.username };
        const updateQuery = { $set: { username: usernameToUpdate } };
        
        // Assuming you have a MongoDB client or connection established
        
        // Update multiple documents in the collection
    const data= await Post.updateMany(searchCriteria, updateQuery);
     data.save();
     


      const updatedUser = await User.findByIdAndUpdate(
        req.query.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        //deleting all the posts of the user
        /*
        await Post.deleteMany({ username: user.username });
        */
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

//GET USER 
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/",async (req,res)=>
{
  try{
    const users=await User.find();
    res.status(200).json(users)
  }catch(err)
  {
    res.status(500).json(err)
  }
})
module.exports = router;