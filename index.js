const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'singhanuj',
    api_key: '474394997723388',
    api_secret: 'OlAW7retaE13YIq5p9gRc6pMQJ4'
})

// to use ejs
app.set('view engine', 'ejs');

// to use req.body
app.use(express.json())

// to use req.query
app.use(express.urlencoded({ extended: true }))

// To use express file-upload
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))

app.get("/myget", (req, res) => {
    console.log(req.body);
    res.send(req.query)
})

app.post("/mypost", async (req, res) => {
    console.log(req.body);
    console.log(req.files);

    let result;
    let imageArray = []

    //FOR MULTIPLE IMAGES
    if (req.files) {
        for (let index = 0; index < req.files.samplefile.length; index++) {
            result = await cloudinary.uploader.upload(req.files.samplefile[index].tempFilePath)
            imageArray.push(result.secure_url)

            imageArray.push({
                public_id: result.public_id,
                secure_url: result.secure_url
            })
        }
    }


    // for SINGLE IMAGE

    // let file = req.files.samplefile

    // let result = await cloudinary.uploader.upload(file.tempFilePath, {
    //     folder: "users"
    // })

    console.log(result);

    let details = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        result,
        image
    }
    res.send(details)
})

app.get("/mygetform", (req, res) => {
    res.render("getform")
})

app.get("/mypostform", (req, res) => {
    res.render("postform")
})

app.listen(4000, () => {
    console.log('Server is running on port 4000');
})