const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const localStragegy = require('passport-local').Strategy
const cloudinary = require('./utils/cloudinary')

const app = express();
// app.use(express.json())
const port = 3000;
const cors = require('cors');
app.use(cors(
    {
        origin: ['https://tenant-finder-server.vercel.app/'],
        methods: ['POST', 'PUT', 'DELETE', 'GET'],
        credentials: true,
    }
))
app.use(cors());
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


//  ALL POST API ENVIRONMENTS

const User = require('./models/users');
const Message = require('./models/messages')
const HouseToRent = require('./models/houseToRent')
const ImageMulter = require('./utils/multer')

// endpoint to create user
app.post('/register', (req, res) => {
    const { firstName, lastName, phone, email, gender, state, category, password, image } = req.body

    const newUser = new User({ firstName, lastName, phone, email, gender, state, category, password, image })


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
    const token = jwt.sign(payload, "Q$r2k6WBn!jCWZK", { expiresIn: "1hr" })
    return token;
}

app.post('/login', (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(401).json({ message: "email and password are required", time: new Date().getTime() });
    }
    // check for the particular user in the database
    User.findOne({ email }).then((user) => {
        if (!user) {
            return res.status(402).json({ message: 'User not found' });
        }

        // comparing if the email and password are correct
        if (user.password !== password) {
            return res.status(403).json({ message: 'Invalid password' });
        }

        const token = createToken(user._id)
        res.status(200).json({ token })
    }).catch((err) => {
        res.status(500).json({ message: 'Check your internet connection' })
        console.log(err)
    })
})


app.post('/housetorent', ImageMulter.array('images'), async (req, res) => {
    const { body, files } = req
    // const { price, title, state, location, description, bedroom, toilet, square, userId } = body

    let images = []

    for (let i = 0; i < files.length; i++) {
        try {
            const result = await cloudinary.uploader.upload(files[i].path, { upload_preset: 'uploads', resource_type: 'image' })
            images.push({ cloudinary_id: result.public_id, uri: result.secure_url })
        } catch (err) {
            res.status(400).json({ message: 'Check your internet connection' })
        }
    }

    let data = { ...body, images: images }

    try {
        const response = await HouseToRent.create(data)
        res.status(200).json({ message: 'House to rent Created successfully' })
    }
    catch (err) {
        res.status(500).json({ message: 'Check your internet connection' })
    }
})



//      PUT ENDPOINT API ENVIRONMENT

app.put('/housetorent/:houseId', ImageMulter.array('images'), async (req, res) => {
    const { body, files } = req
    const { houseId } = req.params
    // const { price, title, state, location, description, bedroom, toilet, square, userId } = body

    let images = []

    for (let i = 0; i < files.length; i++) {
        try {
            const result = await cloudinary.uploader.upload(files[i].path, { upload_preset: 'uploads', resource_type: 'image' })
            images.push({ cloudinary_id: result.public_id, uri: result.secure_url })
        } catch (err) {
            res.status(400).json({ message: 'Check your internet connection' })
        }
    }

    let data = { ...body, images: images }

    try {
        const response = await HouseToRent.findByIdAndUpdate(houseId, data, { new: true })
        res.status(200).json(response)
    }
    catch (err) {
        res.status(500).json({ message: 'Check your internet connection' })
    }
})


app.put('/user/:userId', ImageMulter.array('images'), async (req, res) => {
    const { body, files } = req
    const { userId } = req.params

    let images = []


    for (let i = 0; i < files.length; i++) {
        try {
            const result = await cloudinary.uploader.upload(files[i].path, { upload_preset: 'uploads', resource_type: 'image' })
            images.push({ cloudinary_id: result.public_id, uri: result.secure_url })
        } catch (err) {
            res.status(400).json({ message: 'Check your internet connection' })
        }
    }

    let data = { ...body, images: images }

    try {
        const response = await User.findByIdAndUpdate(userId, data, { new: true })
        res.status(200).json(response)
    }
    catch (err) {
        res.status(500).json({ message: 'Check your internet connection' })
    }
})




// GET API ENVIROMENTS


app.get('/', (req, res) => {
    res.status(200).json({ message: 'The Api works, Thank God' })
})

app.get('/user/:userId', async (req, res) => {
    const { userId } = req.params

    try {
        const response = await User.findById(userId)
        res.status(200).json(response)
    }
    catch (err) {
        res.status(500).json({ message: 'Check your internet connection' })
    }
})

app.get('/house/:houseId', async (req, res) => {
    const { houseId } = req.params

    try {
        const response = await HouseToRent.findById(houseId)
        res.status(200).json(response)
    }
    catch (err) {
        res.status(500).json({ message: 'Check your internet connection' })
    }
})


app.get('/housetorent', async (req, res) => {
    try {
        const response = await HouseToRent.find().populate("userId", "firstName lastName state images").lean()
        res.status(200).json(response)
    }
    catch (err) {
        res.status(500).json({ message: 'Check your internet connection' })
    }
})


app.get('/listofhousetoresnt/:userId', async (req, res) => {
    const { userId } = req.params
    try {
        const response = await HouseToRent.find({ userId: userId })
        res.status(200).json(response)
    }
    catch (err) {
        res.status(500).json({ message: 'Check your internet connection' })
    }
})

//      DELETE API ENVIROMENT 

app.delete('/housetorent/:houseId', async (req, res) => {
    const { houseId } = req.params
    try {
        const response = await HouseToRent.findByIdAndDelete(houseId)
        res.status(200).json({ message: 'House deleted successfully' })
    }
    catch (err) {
        res.status(500).json({ message: 'Check your internet connection' })
    }
})