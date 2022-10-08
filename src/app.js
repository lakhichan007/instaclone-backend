const express = require("express")
const cors = require('cors')
let InstaUser = require("../module/schema")
const app = express()
app.use(cors())
const bodyparser = require("body-parser")
app.use(bodyparser())

let port = process.env.PORT || 8000

const fileupload = require("express-fileupload")
var cloudinary = require("cloudinary").v2;
app.use(fileupload({
    useTempFiles: true
}))

cloudinary.config({
    cloud_name: "dxfkj6qru",
    api_key: "671759823811938",
    api_secret: "mz5yIRM--5-NYzSgcYSZs_pUG0w",
    secure: true
})

app.post("/user/upload",async(req, res) => {
    try{
        const file = req.files.image
       await cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
           InstaUser.create({
                name:req.body.name,
                image:result.url,
                location:req.body.location,
                description:req.body.description
            })
        })

        res.send("data uploaded sucessfully")
       
    }
    catch(err){
        console.log(err)
    }

})

app.get("/user", async (req, res) => {
    try {
        const profile = await InstaUser.find()
        res.json({
            profile
        })
        console.log(profile)
    }
    catch (e) {
        console.log(e)
    }
})

app.listen(port, () => {
    console.log(`server runnin at ${port}`)
})

