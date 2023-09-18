const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const localStragegy = require('passport-local').Strategy

const app = express();
app.use(express.json())
const port = 3000;
const cors = require('cors');
app.use(cors(
    {
        origin: ['https://tenant-finder-server.vercel.app/'],
        methods: ['POST', 'PUT', 'DELETE', 'GET'],
        credentials: true,
    }
))
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

app.get('/', (req, res) => {
    res.status(200).json({message: 'The Api works, Thank God'})
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
            message: 'Check your Internet connection'
        })
    })
})


// functions to create a token for the user

const createToken = (userId) => {
    const payload = {
        userId: userId,
    }

    // Generating token with a secret key and expiration time
    const token = jwt.sign(payload, "Q$r2k6WBn!jCWZK", { expiresIn: "1hr"})
    return token;
}

app.post('/login', (req, res) => {
    const { email, password } = req.body

    if(!email ||!password) {
        return res.status(404).json({message: "email and password are required"});
    }
    // check for the particular user in the database
    User.findOne({email}).then((user) => {
        if(!user) {
           return res.status(404).json({message: 'User not found'});
        }

        // comparing if the email and password are correct
        if(user.password !== password) {
            return res.status.apply(404).json({message: 'Invalid password'});
        }

        const token = createToken(user._id)
        res.status(200).json({token})
    }).catch((err) => {
        res.status(500).json({message: 'Check your internet connection'})
        console.log(err)
    })
})



