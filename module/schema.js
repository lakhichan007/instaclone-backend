const mongoose= require("mongoose")

// mongoose.connect("")
mongoose.connect("mongodb+srv://lakhichan007:12345@cluster0.gcqitot.mongodb.net/Instadb?retryWrites=true&w=majority")
.then(()=>{
    console.log("Sucessfully connected with Database")
})
.catch((error)=>{
    console.log(error)
})

const schema = mongoose.Schema
const userSchema= new schema({
    img:{data:Buffer,contentType:String},
    name:{type:String,required:true},
    location:{type:String,required:true},
    description:{type:String}
})
let InstaUser=mongoose.model("instaUser",userSchema)

module.exports=InstaUser