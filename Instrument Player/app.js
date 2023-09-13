//Imports
const { json } = require('express');
const express = require('express');
const mongoose = require('mongoose')
const User = require('./models/user')
const { check, validationResult } = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();
// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//EDIT CONNECTION STRING
const dbURI = 'mongodb+srv://instrument:' + process.env.API_KEY + '@cluster0.aa1wpib.mongodb.net/?retryWrites=true&w=majority'
// Mongo DB Connection Ignored

// mongoose.connect(dbURI).then((result) => {
//   console.log("connected to mongoDB..")
//   // listen for requests
//   app.listen(process.env.PORT);
// }).catch((err) => console.log(err))
app.listen(process.env.PORT);

//Temporary data
var items = [
    {name:"piano", img:"/images/keyboard.png", desc:"This is a piano"},
    {name:"guitar", img:"/images/guitar.png", desc:"This is a guitar"},
    {name:"drums", img:"/images/drum.png", desc:"This a drumset"},
    {name:"bongos", img:"/images/bongos.png", desc:"These are bongos"},
    {name:"flute", img:"/images/flute.png", desc:"This is a flute"},
    {name:"trumpet", img:"/images/trumpet.png", desc:"This is trumpet"}
  ]

var currentUser = {username:"Login", logout:""}
var verifyUser = []
var errors = []
var reqSignup = {
  fname:"",
  lname:"",
  email:"",
  newUsername:"",
  newPassword:""
}
var reqLogin = {
  username:"",
  password:""
}


// Routing
app.get('/', (req, res) => {
    res.render('./home', { title:'Home', items, currentUser});
  });

app.get('/login', (req,res) => {
  res.render('./login', {title:'Login', currentUser, errors, reqSignup, reqLogin});
});

app.get('/logout', (req,res) => {
  currentUser.username = "Login"
  currentUser.logout = ""
  res.render('./home', {title:'Recordings', items, currentUser});
});
  
app.get('/piano', (req,res) => {
  res.render('./instruments/piano', {title:'Piano', currentUser});
});

app.get('/bongos', (req,res) => {
  res.render('./instruments/bongos', {title:'Bongos', currentUser});
})

app.get('/recordings', (req,res) => {
  res.render('./recordings', {title:'Recordings', currentUser});
});

// Form Submission Handler
app.post('/signup',
  [
    check("fname").not().isEmpty().withMessage("First name cannot be blank").trim(),
    check("lname").not().isEmpty().withMessage("Last name cannot be blank").trim(),
    check("email").isEmail().withMessage("Invalid email address").normalizeEmail(),
    check("newUsername").not().isEmpty().withMessage("Username cannot be blank").custom(async value => {
        const userExist = await User.find({username:value});
        if (userExist.length > 0){
          console.log('User Exists');
          return Promise.reject() ;
        }      
      }).withMessage("Username already exists"),
    check("newPassword").isLength({ min: 8, max: 20 })
      .withMessage("Your password should have a length between 8-20 characters")
  ],

  function (req, res) {
    const errorCodes = validationResult(req).formatWith(({ msg }) => msg);
    const reqSignup = req.body
    if (reqSignup.email == "@"){reqSignup.email = ""}
    errorCodes.array().forEach(element => {
    errors.push(element)
    }); 

    if (!errorCodes.isEmpty()) {
      res.status(422)
      res.render('./login', {title:'Login', currentUser, errors, reqSignup, reqLogin});
      errors = []
    } 
    else {
      // Create user
      const user = new User({
        name:req.body.fname + " " + req.body.lname,
        email:req.body.email,
        username:req.body.newUsername,
        password:req.body.newPassword
      }).save().then((result) => {
        console.log(result)
      }).catch((err) => {
        console.log(err)
      });
      // Update Header
      currentUser.username = req.body.newUsername
      currentUser.logout = "Logout"

      res.render('./home', { title:'Home', items, currentUser});
    }
  });

  app.post('/signin',
  [    
    check("username").custom(async value => {
        const userExist = await User.find({username:value});
        verifyUser = userExist[0]
        if (userExist.length == 0){
          console.log('User does not exist');
          return Promise.reject();
        }      
      }).withMessage("Username does not exist"),
    // Need to be set up
    check("password").custom(async value => {
      if (verifyUser.password !== value){
        console.log('Password incorrect!');
        return Promise.reject();
      }      
    }).withMessage("Password does not match") 
  ],

  function (req, res) {
    const errorCodes = validationResult(req).formatWith(({ msg }) => msg);
    const reqLogin = req.body
    errorCodes.array().forEach(element => {
      errors.push(element)
    }); 

    if (!errorCodes.isEmpty()) {
      res.status(422);
      res.render('./login', {title:'Login', currentUser, errors, reqSignup, reqLogin});
      errors=[]
    } 
    else {
      currentUser.username = req.body.username
      currentUser.logout = "Logout"

      res.render('./home', { title:'Home', items, currentUser});
    }
  });


  // 404 Page
app.use((req, res) => {
    res.status(404).render('404', { title: '404', currentUser});
});