const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const localStragegy = require('passport-local').Strategy

const app = express();
app.use(express.json())
const port = 3000;
const cors = require('cors');
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
const jwt = require('jsonwebtoken') 


mongoose.connect(
    "mongodb+srv://omotoshoayomikun:Timileyin_1@cluster0.6quvy5c.mongodb.net/",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(
    console.log('Connected to database')
).catch((err) => {
    console.log('Error connected to database', err)
}) 

app.listen(port, () => {
    console.log('Server runing on port 3000') 
})

const User = require('./models/users');
const Message = require('./models/messages')

// endpoint to create user
app.post('/register', (req, res) => {
    const { firstName, lastName, phone, email, gender, state, category, password, image } = req.body
    console.log(firstName)

    // create new user
    const newUser = new User({firstName, lastName, phone, email, gender, state, category, password, image})
    console.log(newUser) 
    

    // save the user to the database
    newUser.save()
    .then(() => {
        res.status(200).json({
            message: 'User created successfully'
        })
    }).catch((err) => {
        res.status(500).json({
            message: 'Error creating user'
        })
    })
})

app.get('/register', (req, res) => {
    res.status(200).json({
        message: 'GET REQUEST Register endpoint'
    })
})