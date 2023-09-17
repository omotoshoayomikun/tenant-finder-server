const mongoose = require('mongoose')

const houseToRentSchema = new mongoose.Schema({
    price: {
        type: String,
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
    bedrooms: {
        type: String,
        required: true
    },
    toilet: {
        type: String,
        required: true
    },
    square: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const HouseToRent = mongoose.model('HouseToRent', houseToRentSchema);
module.exports = HouseToRent;