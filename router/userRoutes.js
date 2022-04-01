const express = require('express');
const Router = express();
const { body, validationResult } = require('express-validator');
const Usermodel = require("../models/user");
const pictureModel = require("../models/picture");
const bcrypt = require("bcryptjs");
const random = require('random');
const jwt = require("jsonwebtoken");
const verifyUser = require("../middleware/verifyUser");
const saltRounds = 10;
const JWT_SECRET = "clumpCoder"

Router.get('/signup', (req, res) => {
    res.send('hello!world');
});

Router.post('/signup',
    [
        body("email", "Please Enter a valid Email").isEmail(),
        body("name", "Please Enter a valid Name").isLength({ min: 3 }),
        body("mobile", "Please Enter a valid Number").isLength({
            min: 10,
            max: 10,
        }),
        body("password", "Password must be atleast 5 characters").isLength({
            min: 5,
        }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.statusCode = 400;
            return res.json({ errors: errors.array() });
        }

        try {
            // check wheter the user with the same email

            const userInfo = {
                email: req.body.email,
                password: req.body.password
            }
            const user = Usermodel.findOne({ userInfo });
            if (user && user.email) {
                return res.status(400).json({
                    error:
                        "Sorry a user with same credentials already exist. please try with an unique credentials",
                });
            } else {

                // password encryption

                const salt = bcrypt.genSaltSync(saltRounds);
                const securePass = bcrypt.hashSync(req.body.password, salt);
                console.log("securePass", securePass);

                // create a new user___________________________

                const result = await Usermodel.create({
                    name: req.body.name,
                    mobile: req.body.mobile,
                    email: req.body.email,
                    password: securePass,
                });
                res.status(201).json("user created");
            }

            // const userData = new Usermodel({
            //     name: req.body.name,
            //     email: req.body.email,
            //     mobile: req.body.mobile,
            //     password: req.body.password
            // });
            // let result = await userData.save();

        } catch (error) {
            console.log('error', error);
            res.status(500).send("Internal Server Error:" + error.message);
        }
    });

// Router.get('/search/:name' , (req , res)=>{
//     const regex = new RegExp(req.params.name , 'i');
//     let result = Usermodel.find({name:regex})
//     .then((result)=>{
//         res.statusCode = 200;
//         res.json(result);
//     })
// });

// API:  Search User By Name________________________

Router.get('/search/:name', async (req, res) => {
    try {
        const regex = new RegExp(req.params.name, 'i');
        let result = await Usermodel.find({ name: regex })
        console.log("result", result);
        if (result && result.length > 0) {
            let response = {
                result: result
            }
            res.status(200).json(response);
        } else {
            let errInfo = {
                message: "Data not found"
            }
            res.status(404).json(errInfo);
        }
    } catch (error) {
        console.log("error", error);
        let errInfo = {
            err: error
        }
        res.status(400).json(errInfo);
    }
});




// API:  Users Login With Authentication______________

Router.post("/login",
    [
        body("email", "please enter valid email id").isEmail(),
        body("password", "Password Can Not be Blank").exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        //check This is a valid User

        try {
            const { email, password } = req.body;
            let user = await Usermodel.findOne({ email });
            if (!user) {
                res.statusCode = 400;
                res.json({ message: "please try to login with correct credentials" })
            } else {
                const comparePass = await bcrypt.compare(password, user.password);
                if (!comparePass) {
                    res.statusCode = 400;
                    res.json({ error: "Please Enter Valid Password" });
                } else {
                    let data = {
                        id: user.id
                    }
                    const token = jwt.sign(data, JWT_SECRET);
                    res.statusCode = 200;
                    res.json({ token, message: "SuccessFully Logged In" });
                }
            }
        } catch (error) {
            console.log("error", error);
            res.json(
                "Internal Server Error:" + error.message
            )
        }

    }
)

Router.post("/uploadImage",
    // [
    //     body("image" , "please upload a valid image").exists()
    // ],
    async(req,res)=>{
        // const errors = validationResult(req);
        // if(!errors.isEmpty()){
        //     res.statusCode = 400;
        //     res.json({error:errors.array()});
        // } 
        try {
            const image = req.files.image;
            console.log("image",image);
            const newName = await saveImageInDirectory(image);
            console.log("newName",newName);
            const user = req.body.user;
            console.log("user",user);
            const Data = {        
                picture:newName
            }
            let uploadImage = await pictureModel.create({Data})
            console.log("uploadImage", uploadImage);     
        } catch (error) {
            console.log("image upload function error", error)
        }
    }
)

//Save Image In Directory_________________________

saveImageInDirectory = async (image) => {
    return new Promise((resolve, reject) => {
        const imageNameArray = image.name.split('.');
        const imageExtantion = imageNameArray.slice(-1);
        const todatsDate = new Date();
        const imageNewName = todatsDate.getTime() + '' + random.int(1, 1000) + '.' + imageExtantion;
        const uploadPath = __dirname + '/../public/image/' + imageNewName;
        image.mv(uploadPath, function (error, result) {
            if (error) {
                let response = {
                    error: error
                }
                reject(response);
            } else {
                resolve(imageNewName);
            }
        });
    });
}

module.exports = Router;