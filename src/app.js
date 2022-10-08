const express = require("express")
const cors = require('cors')
const fs = require("fs")
let InstaUser = require("../module/schema")
const app = express()
app.use(cors())
const bodyparser = require("body-parser")
app.use(bodyparser())
const multer = require("multer")


let port = process.env.PORT || 8000
app.use(express.static("public"))

//use of the multer
const storagefile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        cb(null,`image-${Date.now()}.${file.originalname}`)
    }
})
const upload = multer({ storage: storagefile })


app.get("/user", async (req, res) => {
    try {
        const profile = await InstaUser.find()
        res.json({
            profile
        })
    }
    catch (e) {
        console.log(e)
    }
})

app.post("/user/upload", upload.single("image"), (req, res) => {
    const saveData = InstaUser({
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        img: {
            data: fs.readFileSync("uploads/" + req.file.filename),
            contentType: "image/png"
        },
    })
    saveData
        .save()
        .then((res) => { "" })
        .catch((err) => {
            console.log(err)
        })
        res.send("Data updated sucessfully!")
})
app.listen(port, () => {
    console.log(`server runnin at ${port}`)
})

