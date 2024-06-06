const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    description: {
        type: String
        // require: true
    },
    fileName: {
        type: String,
        // require: true
    },
    imageFileName: {
        type: String,
        require: true
    },
    featured: {
        type: Boolean
    },
    category: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('Booklib', bookSchema)