const exp =require('express')
const router=exp.Router();
const userController=require('../Controller/UserController')


router.post('/signUp',userController.CreateUser)
router.get('/verifyOtp',userController.verifyotp)


module.exports=router