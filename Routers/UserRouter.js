const exp =require('express')
const router=exp.Router();
const userController=require('../Controller/UserController')
const multer = require("multer")
const path = require('path');



// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Save files in "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
    }
});

const upload = multer({ storage: storage });



function authenticateUser(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(403).send('Access Denied');

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).send('Invalid Token');
    }
}


router.post('/signUp',userController.CreateUser)
router.get('/verifyOtp',userController.verifyotp)
router.post('/completedProfile',upload.single('file'),userController.completeProfile)


module.exports=router