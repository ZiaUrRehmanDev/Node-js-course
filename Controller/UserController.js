
const userValidate = require('../validation/UserValidation')
const userModel = require('../Model/authModels')
const profileModel = require('../Model/profileModel')
const jWT = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
require('dotenv').config()
const secret_key = process.env.secret_key

exports.CreateUser = async (req, res) => {
    try {
        await userValidate.validateAsync(req.body)

        var { email, password } = req.body
        let checkEmail = await userModel.findOne({ email })


        if (checkEmail) {
            return res.status(201).json({
                message: "User Already Regsister",
                data: checkEmail
            })
        } else {
            let otp = Math.floor(Math.random() * 900000)
            if(otp.length!=6){
                otp = Math.floor(Math.random() * 900000)
                req.body.otp = otp

            }else{
                
                req.body.otp = otp

            }

            const hashPassword = await bcrypt.hash(password, 12)

            req.body.password = hashPassword

            const user = userModel(req.body)
            await user.save()
            console.log('user', req.body)
            console.log('user', secret_key)
            const token = jWT.sign({ user_id: user._id }, secret_key, { expiresIn: "2h" })

 

            // node mailer
            const transporter = nodemailer.createTransport({
                service : "gmail",
                auth :{
                    user : process.env.smtpemail,
                    pass: process.env.smtppasskey,
                },
                tls: {
                    rejectUnauthorized: false
                }
            })

            const info = {
                from : process.env.smtpemail,
                to : email,
                subject : "Welcome oto test MAIL SERVICE",
                html :  `
                <h1>Verify Account</h1>
                <p>your otp is : ${otp}</p>   
                `

            }

            transporter.sendMail(info,(err,result)=>{
                if(err){
                    console.log(err)
                }
                else{

                }
            })
          

            return res.status(201).json({
                message: "User Crteated ",
                data: user,
                token

            })
        }
    } catch (e) {
        return res.status(500).json({
            message: 'internal server',
            error: e.toString()
        })

    }

}






exports.verifyotp = async (req, res) => {
try{
    
    const { body, headers } = req
    const { authorization } = headers
    const { otp } = body
    if (!authorization) {
        return res.status(401).json({
            message: "token not provide"
        })
    } else {
        if (otp == undefined) {
            return res.status(401).json(
                {
                    message: "otp not provide"
                }
            )
        } else if (otp.length != 6) {
            return res.status(401).json({
                message: "Otp must be 6 letter"
            })
        } else {
            jWT.verify(authorization, secret_key, async (err, decode) => {
                if (err) {
                    return res.status(401).json({
                        message: "unauthorization"
                    })
                }
                console.log(decode)
                req.userid = decode.user_id
                var userFind = await userModel.findById(req.userid)
                if(!userFind){
                    return res.status(404).json({ message: "User not found" });
                }
                const token = jWT.sign({ user_id: req.userid }, secret_key, { expiresIn: "2h" })
                console.log(userFind)
                if (userFind.otp == otp) {
                    await userFind.updateOne({
                        isVerify: true
                    })
                    return res.status(200).json({
                        message: "verify otp ",
                        token
                    })
                }
                else {
                    return res.status(401).json({
                        message: "invalid otp",
                    
                    })
                }

            })
        }
    }
}catch(e){
    return res.status(500).json({
        message :"internal server error",
        error: e

    })
}
  // res.send({otp:'verify otp'});
}








exports.completeProfile = async (req, res) => {
    const { body, headers } = req
    const { authorization } = headers
    // try {

    if (!authorization) return res.status(403).send('Access Denied');

    console.log(req.file.path)
        res.send(body)

    //     if (!authorization) {
    //         return res.status(401).json({
    //             message: "token not provide"
    //         })
    //     }

    //     jWT.verify(authorization, secret_key, async (err, decode) => {
    //         if (err) {
    //             return res.status(401).json({
    //                 message: "unauthorization"
    //             })
    //         }
    //         else {
    //             console.log(decode)
    //             req.userId = decode.user_id

    //             var user = await  userModel.findById(req.userId)

    //             if(user.completeProfile==false){
    //                   await profileValidate.validateAsync(req.body)

    //             var obj = {
    //                 gender: req.body.gender,
    //                 contactNo: req.body.contactNo,
    //                 address: req.body.address,
    //                 Image: req.file.path,
    //                 authId:req.userId
    //             }

    //             var userProfile = profileModel(obj)
    //             await userProfile.save()
    //             console.log(userProfile)

    //             await  authModel.findByIdAndUpdate(req.userId,{
    //                 completeProfile :true,
    //                 // profileId:

    //             })
    //             return res.status(200).json({
    //                 message: "profile update",
    //                 // data: obj

    //             })
    //             }
    //             else{
    //                 return res.status(200).json({
    //                     message: "already complete profile",
    //                     // data: obj
    
    //                 })
    //             }

              
    //         }

    //     })
    // }
    // catch (e) {
    //     return res.status(500).json({
    //         message: "error",
    //         e
    //     })
    // }

    // return res.status(200).json({
    //     message:"upoads"
    // })

}