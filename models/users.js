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
    address: {
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
    images: {
        type: [
            {
                cloudinary_id: { type: String, required: true },
                uri: { type: String, required: true }
            }
        ],
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
})

const User = mongoose.model('User', userSchema);
module.exports = User;