const exp =require('express')
const router=exp.Router();
const userController=require('../Controller/UserController')


router.post('/signUp',userController.CreateUser)
router.get('/reset',(req,res)=>{
    console.log('user')
    res.send(' reset done')
})


module.exports=router