const Express = require("express")
const Mongoose = require("mongoose")
const Bcrypt = require("bcrypt")
const Cors = require("cors")
const jwt = require("jsonwebtoken")
const  userModel=require("./models/users")

let app = Express()
app.use(Express.json())
app.use(Cors())

Mongoose.connect("mongodb+srv://Enat:EnatVibin@cluster0.ts1wpg0.mongodb.net/blogDb?retryWrites=true&w=majority&appName=Cluster0")


app.post("/signup",async(req,res)=>{
    
    let input = req.body
    let hashedPassword = Bcrypt.hashSync(req.body.password,10)
    console.log(hashedPassword)
    req.body.password=hashedPassword
   
 userModel.find({email:req.body.email}).then(
    (items)=>{
        if (items.length>0) {
            res.json({"status":"email id alread exist"})
            
         } else {
            let result= new userModel(input)
             result.save()
            res.json({"status":"success"})
            
         } 

    }
 ).catch(
    (error)=>{}
 )
   
})
app.listen(8181,()=>{
    console.log("Server started")
})
