const exp=require('express')
const bodyParser = require('body-parser')
const formData = require("express-form-data");
const mainRouter=require('./Routers/MainRouter')
const mongoose=require('mongoose')
require('dotenv').config()
const app =exp()
const port= 3000

const dbUrl=process.env.connectionDB
mongoose.connect(dbUrl)

const db=mongoose.connection
db.on('error',(err)=>{
    console.error('mongosse db error ',err)
})
db.once('open',()=>{
    console.log('connected mongoose')
})
db.on('disconnected',()=>{
    console.log('connected mongoose')
})


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(formData.parse())

app.use(mainRouter)

app.listen(port,()=>{
    console.log('server connect ')
    // console.log(process.env.connectionDB)
})