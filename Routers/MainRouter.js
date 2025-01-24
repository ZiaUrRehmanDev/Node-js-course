const exp =require('express')
const router=exp.Router();
const userRouter=require('./UserRouter')


router.use('/user',userRouter)

module.exports=router