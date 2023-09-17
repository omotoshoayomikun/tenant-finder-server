const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    state: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required: true
    }, 
    // houseToRent: {
    //     type: [
    //         {
    //             price: { type: String, required: true },
    //             title: { type: String, required: true },
    //             location: { type: String, required: true },
    //             description: { type: String, required: true },
    //             bedrooms: { type: Number, required: true },
    //             toilet: { type: Number, required: true },
    //             square: { type: Number },
    //         }
    //     ]
    // },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

const User = mongoose.model('User', userSchema);
module.exports = User;