// responsible for routing the requests that comes to the server

const express = require('express');
const router = express.Router();
const Person = require('../models/SignUpModels');
// const Profile = require('../models/ProfileModels');
var http = require('http')
const bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const jsonwt = require("jsonwebtoken");
const passport = require("passport");
const bodyParser = require('body-parser');

// storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });

const upload = multer({storage:storage})

//Import Schema for Person to Register

router.get('/', function (req, res) {
    console.log("Hi Jeffrey");
    res.end();
});

router.post('/signup', async (req, res) => {
    console.log(req.file);
    const stringPassword = req.body.password
  
    Person.findOne({ email: req.body.email})
        .then(person => {
            if (person) {
                return res
                    .status(400)
                    .json({ emailerror: "Email is already registered in our system "});
            } else {
              
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, function(err, hash) {
                      req.body.password = hash;
                
                    const signedUpUser = new Person({
                        img: { data: req.file? req.file.path: " ", contentType: String},
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                        stringPassword: stringPassword,
                        location: req.body.location,
                        bio: req.body.bio,
                        instagram: req.body.instagram,
                        twitter: req.body.twitter,
                        data: req.body.data
                    });
    
                    const payload = {
                        id: signedUpUser.id,
                        img: signedUpUser.img,
                        firstName: signedUpUser.firstName,
                        lastName: signedUpUser.lastName,
                        email: signedUpUser.email,
                        password: hash,
                        location: req.body.location,
                        bio: req.body.bio,
                        instagram: req.body.instagram,
                        twitter: req.body.twitter,
                        data: req.body.data
                    };
                    
                    signedUpUser.save()
                    jsonwt.sign(
                            payload,
                            process.env.SECRET,
                            {expiresIn: 10000 },
                            (err, token) => {
                                if (err) {
                                    console.log(err);
                                } else if (!token) {
                                    console.log("No token");
                                } else {
                                    console.log("success");
                                    res.json({
                                        success: true,
                                        token: "Bearer" + token,
                                        user: signedUpUser
                                    });
                                }
                            }
                    )
                    });
                });   
            }
        })
        .catch(err => console.log(err));
});

// @type    POST
// @route    /api/auth/login
// @desc    route for login of users
// @access  PUBLIC

router.post('/login', async(req, res) => {
    const email = req.body.email
    // const password = req.body.password


    // const user = Person.find(user => user.email = req.body.email)

    
    // function findUser (userEmail) {
    //     var foundUser ;
    //     var user = Person.findOne({ userEmail }, function(userObj){
    //         foundUser = userObj;
    //         return foundUser
    //     });
    //     console.log(user);
    //     console.log(foundUser);
    // }

    // const user = findUser(req.body.email)


    // if (!user) {
    //     return res.status(400).send('Cannot find user')
    // }

    // try {
    //     if (await bcrypt.compare(req.body.password, user.password)) {
    //         res.send('Success')
    //         const payload = {
    //             id: user.id,
    //             firstName: user.firstName,
    //             lastName: req.body.lastName,
    //             email: user.email,
    //             img: user.img,                           
    //             location: user.location,
    //             bio: user.bio,
    //             instagram: user.instagram,
    //             twitter: user.twitter,
    //             data: user.data
    //         }
    //         jsonwt.sign(
    //             payload,
    //             process.env.SECRET,
    //             {expiresIn: 10000 },
    //             (err, token) => {
    //                 if (err) {
    //                     console.log(err);
    //                 } else if (!token) {
    //                     console.log("No token");
    //                 } else {
    //                     console.log("success");
    //                     res.json({
    //                         success: true,
    //                         token: "Bearer" + token,
    //                         user: user
    //                     });
    //                 }
    //             }
    //         );

    //     } else {
    //         res.send({ response: "password is incorrect" });
    //         res.send('Not Allowed')
    //     }
    // } catch {
    //     res.status(500).send()
    // }

 
    Person.findOne({ email })
        .then(async user => {
            if (!user){
                res.send({ response: " User not found with this email " })
                    // .status(404)
                    // .json({ emailError: "User not found with this email"});
            } 

            try {
                bcrypt.compare(req.body.password, user.password)
                .then((isMatch) => {
                    console.log(isMatch);
                    console.log(user.password);
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: req.body.lastName,
                            email: user.email,
                            img: user.img,                           
                            location: user.location,
                            bio: user.bio,
                            instagram: user.instagram,
                            twitter: user.twitter,
                            data: user.data
                        }
                        jsonwt.sign(
                            payload,
                            process.env.SECRET,
                            {expiresIn: 10000 },
                            (err, token) => {
                                if (err) {
                                    console.log(err);
                                } else if (!token) {
                                    console.log("No token");
                                } else {
                                    console.log("success");
                                    res.json({
                                        success: true,
                                        token: "Bearer" + token,
                                        user: user
                                    });
                                }
                            }
                        );
                    } else {
                        res.send({ response: "password is incorrect" });
                    }
                })
                .catch((error) => {
                    console.error(error);
                });

            }
            catch {
                console.log();
            }
        }
        )
        .catch(err => console.log(err));
});

// @type    POST
// @route    /app/auth/logout
// @desc    route to logout users
// @access  PRIVATE

router.post('/logout', async (req, res, next) => {

    // clear the user from the session object and save.
    // this will ensure that re-using the old session id
    // does not have a logged in user
    req.session.user = null
    req.session.save((err) => {
       if (err) next(err)

        req.session.regenerate((err) => {
            if (err) next(err)
            res.redirect('/')
        })
    });
    res.send({ response: "logged out" });
});


// @type    GET
// @route    /api/auth/profile
// @desc    route for user profile
// @access  PRIVATE

router.get(
    "/profile:id",
    passport.authenticate("jwt", { session: false}),
    (req, res) => {
        const id = req.params.id;
        Person.findById(id, ['_id', 'img', 'firstName', 'lastName', 'email', 'location' , 'bio', 'instagram', 'twitter'], (err, user) => {
            if (err) {
                console.log(err);
            } else if (!user) {
                console.log("This user does not exist");
                res.send({ response: 'User not found!' });
            } else {
                console.log(`This is the user: ${user}`);
                res.send({ response: user });
            }
        })
        console.log(req);
        res.send({ response: user})
    }
);

// @type    PATCH
// @route    /api/auth/edit-profile
// @desc    route for editing user profile
// @access  PRIVATE

router.patch('/edit-profile/:id', upload.single('img'), async (req, res ) => {

    const id = req.params.id;
    const file = req.file
    const filename = req.file ? req.file.filename : 'No file was uploaded';
    console.log(file); 
    console.log(req.body);

    const pathToUploads = path.join(__dirname, '..')
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            req.body.password = hash;
            let img = null
            if (filename !== 'No file was uploaded') {
                img = {
                    data: fs.readFileSync(path.join(pathToUploads + '/uploads/' + req.file.filename)),
                    contentType: 'image/png'
                };
            }
           
            const updatedUser = {...req.body, img: img}
            console.log(updatedUser);

          Person.findByIdAndUpdate(id, {$set: updatedUser }, {new: true, projection: ['_id', 'img', 'firstName', 'lastName', 'email', 'location', 'bio', 'pic', 'instagram', 'twitter'] },(err, user) => {
            if (err) {
                console.log(err);
            } else if (!user) {
                console.log("There was no user found");
                res.send({ response: 'User not found'});
            } else {
                console.log('The user was updated successfully');
                if (filename !== 'No file was uploaded') {
                    fs.unlinkSync(path.join(pathToUploads + '/uploads/' + req.file.filename))
                }
                res.send({ response: user });

            }
        });

        });
    });

});

module.exports = router
