const Express = require("express")
const Mongoose = require("mongoose")
const Bcrypt = require("bcrypt")
const Cors = require("cors")
const jwt = require("jsonwebtoken")
const  userModel=require("./models/users")
const postModel = require("./models/posts")
let app = Express()
app.use(Express.json())
app.use(Cors())

Mongoose.connect("mongodb+srv://Enat:EnatVibin@cluster0.ts1wpg0.mongodb.net/blogDb?retryWrites=true&w=majority&appName=Cluster0")
// create a post

app.post("/create", async (req, res) => {
    let input = req.body;
    let token = req.headers.token;

    jwt.verify(token, "blogApp", async (error, decoded) => {
        if (error) {
            return res.json({ "status": "Invalid Authentication" });
        }

        if (decoded && decoded.email) {
            try {
                let result = new postModel(input);
                await result.save();
                res.json({ "status": "Success" });
            } catch (err) {
                res.json({ "status": "Error", "message": err.message });
            }
        } else {
            res.json({ "status": "Invalid Authentication" });
        }
    });
});

// View All

app.get("/viewall", async (req, res) => {
    let token = req.headers.token;

    jwt.verify(token, "blogApp", async (error, decoded) => {
        if (error) {
            return res.json({ "status": "Invalid Authentication" });
        }

        if (decoded && decoded.email) {
            try {
                let posts = await postModel.find();
                res.json(posts);
            } catch (err) {
                res.json({ "status": "error", "message": err.message });
            }
        } else {
            res.json({ "status": "Invalid Authentication" });
        }
    });
});





// Sign Up
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
app.listen(8844,()=>{
    console.log("Server started")
})
