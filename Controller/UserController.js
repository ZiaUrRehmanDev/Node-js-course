
const userValidate=require('../validation/UserValidation')

exports.CreateUser=async(req,res)=>{
    try{
await userValidate.validateAsync(req.body)
        console.log('user')
    res.send(req.body)

    }catch(e){
     return   res.status(500).json({
            message:'internal server',
            error:e
        })

    }
    
}