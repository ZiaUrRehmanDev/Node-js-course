const exp =require('express')
const router=exp.Router();
const userController=require('../Controller/UserController')
const multer = require("multer")
const path = require('path');
const { v2: cloudinary } = require("cloudinary");
require("dotenv").config();
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const userPost=require('../Controller/UserPostController')
const middleWare=require('../helper/MiddleWare')




// // Set up storage for uploaded files
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads'); // Save files in "uploads" folder
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
//     }
// });

// const upload = multer({ storage: storage });



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  // Multer Storage Configuration for Cloudinary
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "uploads", // Cloudinary folder name
      format: async (req, file) => "png", // Convert all images to PNG
      public_id: (req, file) => Date.now() + "-" + file.originalname,
    },
  });
  
  const upload = multer({ storage });







router.post('/signUp',userController.CreateUser)
router.post('/verifyOtp',userController.verifyotp)
router.post('/completedProfile',upload.single('file'),userController.completeProfile)

router.post("/login", userController.LoginUser);





// ** Upload Post (Protected Route) **
router.post("/posts", middleWare.verifyToken, upload.single("image"),userPost.userPost );
  
  // ** Get All Posts (Protected Route) **
router.get("/posts", middleWare.verifyToken,userPost.getPost );


module.exports=router