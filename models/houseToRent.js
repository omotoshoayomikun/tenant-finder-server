const mongoose = require('mongoose')

const houseToRentSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    bedroom: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    toilet: {
        type: Number,
        required: true
    },
    square: {
        type: Number
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    images: {
        type: [
            {
                cloudinary_id: { type: String, required: true },
                uri: { type: String, required: true }
            }
        ],
        required: true
    }
})

const HouseToRent = mongoose.model('HouseToRent', houseToRentSchema);
module.exports = HouseToRent;