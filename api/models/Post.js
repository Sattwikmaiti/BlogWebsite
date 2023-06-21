
const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        unique: true,
      },
      desc: {
        type: String,
        required: true,
      },
      photo: {
        type: String,
        required: false,
      },
      username: {
        type: String,
        required: true,
      },
      categories: {
        type: Array,
        required: false,
      },
      likes:{
        type:Number,
        default:0
      },
      views:{
        type:Number ,
        default:0
      }
    },
    { timestamps: {
      type:Number, default: new Date().getTime()
    } }
  );
  
  module.exports = mongoose.model("Post", PostSchema);
