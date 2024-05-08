const router = require("express").Router();
const User = require("../models/User");
//if required to delete all the posts use the Post model
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const otp= require('../models/otp');
//UPDATE method




router.get('/sendmail',async(req, res)=> {
  const transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false,
    // auth: {
    //   // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    //   // user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
    //   // pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
    //   user: 'raven80@ethereal.email',
    //   pass: '6a9UgYkDnQPS3pKuqe'
    // },
    service: 'gmail.com',
    auth:{
        user:'sm.21u10285@btech.nitdgp.ac.in',
        pass:'Sattwik@2002'
    }
  });
  
  
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Sattwik Maiti" <sm.21u10285@btech.nitdgp.ac.in>', // sender address
      to: "maitisattwik@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
   
    })
    return res.status(200).json(info)
    //console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
  

})
function generateOTP() {
  // Generate a random 4-digit number
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp.toString(); // Convert the number to a string
}
router.get('/sendotp', async (req, res) => {
     try{
     const email = req.body.email
    //  const subject = req.body.subject
    //  const durations = req.body.durations
    //  const message= req.body.message

     //delete any existing email

     await otp.deleteOne({email})

     const new_otp=generateOTP();

     const transporter = nodemailer.createTransport({
      // host: "smtp.ethereal.email",
      // port: 587,
      // secure: false,
      // auth: {
      //   // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      //   // user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
      //   // pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
      //   user: 'raven80@ethereal.email',
      //   pass: '6a9UgYkDnQPS3pKuqe'
      // },
      service: 'gmail.com',
      auth:{
          user:'sm.21u10285@btech.nitdgp.ac.in',
          pass:'Sattwik@2002'
      }
    });
    
    
    console.log("started")
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"Sattwik Maiti" <sm.21u10285@btech.nitdgp.ac.in>', // sender address
        to: "maitisattwik@gmail.com", // list of receivers
        subject: "Hello This Is your OTP sir ", // Subject line
        text: "otp lelo", // plain text body
        html: `<b>ye ha otp  ${new_otp}. bohot jaldi khtam hojaeyega</b>`, // html body
     
      })
      console.log("sent")
const storeotp= await new otp({
  email:email,
  otp:new_otp,
  createdAt: Date.now(),
  //5 min duration
  expiresAt: Date.now() +5* 60 * 1000,

})

console.log(storeotp)
    await storeotp.save()
    console.log("saved")


      return res.status(200).json(info)

     }
     catch(err ){

     }

})


router.get('/checkotp',async(req,res)=>
{
   
  try{
    const email=req.body.email
    const userEnteredOTP=req.body.new_otp
    try {
      // Retrieve the OTP record from the database for the given email
      const otpRecord = await otp.findOne({ email });
  
      if (!otpRecord) {
        console.log('No OTP record found for the email.');
        return res.status(500).json("Error");
      }
  
      // Check if the provided OTP matches the stored OTP
      if (otpRecord.otp !== userEnteredOTP) {
        console.log('Incorrect OTP.');
        return res.status(500).json("Error");
      }
  
      // Check if the OTP has expired
      const currentTime = new Date();
      if (currentTime > otpRecord.expiresAt) {
        console.log('OTP has expired.');
        return res.status(500).json("Error");
      }
  
      // If all checks pass, the OTP is valid
      console.log('OTP is valid.');
      return res.statusCode(200).json("valid");
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return res.status(500).json("Error");
    }



  }
  catch(err){
    return res.status(500).json("Error")
  }



})

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