const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    pickup: {
        type: String,
        required: true
    },
    leftoff: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    admin: {
        type: String
    },
    type:{
        type: Boolean
    },
    price: {
        type: Number
    },
    calidad: {
        type: String
    }
}, {
    timestamps: true
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request