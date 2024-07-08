const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const jwt=require("jsonwebtoken")
const JWT_SEC="mysecretkey101"
//CREATE POST

const redis = require("redis")
const client = redis.createClient(
  {legacyMode: true}
)
client.connect().catch(console.error)
var defaultExpiration = 5

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {

  const {token}=req.body
  
  const user = jwt.verify(token,JWT_SEC)

    const post = await Post.findById(req.params.id);
    if (post.username === user.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});




router.put("/updatelikes/:id", async (req, res) => {
  
    const todo = await Post.findOneAndUpdate({_id: req.params.id},{new:true});
   todo.likes+=1;

      todo.save();
    
      res.json(todo);


});

router.put("/updateviews/:id", async (req, res) => {
  
  const post = await Post.findOneAndUpdate({_id: req.params.id},{new:true});
 post.views+=1;
 
    post.save();
  
    res.json(post);


});



//DELETE POST
router.delete("/:id", async (req, res) => {
  console.log("delete")
  try {
    const {token}=req.body
  //console.log(token)
  const user = jwt.verify(token,JWT_SEC)
  console.log(user)
  // header, payload, signature = token.split('.')

//Decode the Base64Url-encoded payload
// decoded_payload = jwt.utils.base64url_decode(payload.encode('utf-8')).decode('utf-8')
  
// //Parse the JSON
// payload_data = jwt.utils.json_loads(decoded_payload)
// console.log(payload_data)
    const post = await Post.findById(req.params.id);
    //console.log(req.body.username)
    if (post.username === user.username) {
     
      try {
        await Post.deleteOne({ _id: req.params.id });
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        console.log(`You can delete only your post! `)
        res.status(500).json(`You can delete only your post! `);
      }
    } else {
    
      res.status(401).json(`You can delete only your post! `);
    }
  } catch (err) {
  
    res.status(500).json(`You can delete only your post!`);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});


//?user=john&?cat=music
// router.get("/", async (req, res) => {
//     //query looks for ? in router.get("/")
//     const username = req.query.user;
//     const catName = req.query.cat;
//     try {
//       let posts;
//       if (username) {
//         posts = await Post.find({ username });
//       } else if (catName) {
//         //from categories array ...if inside it ..includes catname ...
//         posts = await Post.find({
//           categories: {
//             $in: [catName],
//           },
//         });
//       } else {
//         // no category name no username ...fetch all posts 
//         posts = await Post.find();
//       }


//       //client.setEx("all", defaultExpiration, JSON.stringify(posts))
//       res.status(200).json(posts);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
async function rateLimit(ipAddress) {
  try {
   await client.incr(`${ipAddress}`, (err, counter) => {

   console.log("counter value",counter)
      if(counter==1)
      {client.expire(ipAddress, 20); return false;}


      if (counter>10) {
        return true;
          // console.log('Rate limit exceeded for IP:', ipAddress);
           // Return here to prevent further execution
      } else {
        return false;
          // If rate limit is not exceeded, continue processing the request
      }
        
      

     }) 

      return false;
  } catch (error) {
      console.error('Error incrementing counter:', error);
      return true;
      throw error;
  }
}

// router.get("/", async (req, res) => {
//   // Query looks for ? in router.get("/")

 

   
//   const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
//   console.log("Client IP Address:", ipAddress);

//   // Rate limit the request
 
//   const username = req.query.user;
//   const catName = req.query.cat;
//   //const cacheKey = `${username || ""}_${catName || ""}`;

//   try {
//    // Check if data is in the cache
//    const rateLimited = await client.incr(`${ipAddress}`, (err, counter) => {

//     console.log("counter value",counter)
//        if(counter==1)
//        {client.expire(ipAddress, 20); return false;}
 
 
//        if (counter>10) {
//         console.log(">10")
        
          
//             // Return here to prevent further execution
//        } else {
//         console.log("ok")
//          return false;
//            // If rate limit is not exceeded, continue processing the request
//        }
         
       
 
//       }) 
//  ;
//    console.log(rateLimit(ipAddress))
//    if (rateLimited) {
//     console.log(": Rate limit ---------")
//        return res.status(401).statusMessage('Too Many Requests');
//    }
// console.log("request bypassed")

//     client.get("caches", async (error, cachedData) => {
//       if (error) throw error;

//       if (cachedData) {
//         // Data found in cache, send cached data
//         res.status(200).json(JSON.parse(cachedData));
//       } else {
//         let posts;

//         if (username) {
//           posts = await Post.find({ username });
//         } else if (catName) {
//           posts = await Post.find({
//             categories: {
//               $in: [catName],
//             },
//           });
//         } else {
//           posts = await Post.find();
//         }

//         // Set data in the cache
//         client.setEx("caches", defaultExpiration, JSON.stringify(posts));
//         client.ttl('caches',function(err,reply){
//           console.log("Cache Memory"+reply)
        
//         })

//         return res.status(200).json(posts);
//       }
//     }
    
    
    
    
//     );

  
        

//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// client.setNX("0.0.0.0", 0);


 defaultExpiration = 3600; // Cache expiration time in seconds

router.get("/", async (req, res) => {
  const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log("Client IP Address:", ipAddress);

  try {
    // Rate limiting
    const counter = await new Promise((resolve, reject) => {
      client.incr(ipAddress, (err, count) => {
        if (err) return reject(err);
        if (count === 1) {
          client.expire(ipAddress, 20); // Set expiration to 20 seconds
        }
        resolve(count);
      });
    });
   console.log("Number of Times Hit Request",counter," /10")
    if (counter > 10) {
      console.log("Rate limit exceeded");
      return res.status(429).send('Too Many Requests');
    }

    console.log("Request allowed");

    // Caching

    const cachedData = await new Promise((resolve, reject) => {
      client.get("caches", (error, data) => {
        if (error) return reject(error);
        resolve(data);
      });
    });

    if (cachedData) {
      console.log("Cache hit");
      return res.status(200).json(JSON.parse(cachedData));
    }

    console.log("Cache miss");
    const username = req.query.user;
    const catName = req.query.cat;
    let posts;

    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      console.log("idhar")
      posts = await Post.find();
      console.log(posts)
    }

    // Set data in the cache
    console.log("hui")
    client.setEx("caches", defaultExpiration, JSON.stringify(posts));
    console.log("Cache set");

    res.status(200).json(posts);

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

  module.exports = router;