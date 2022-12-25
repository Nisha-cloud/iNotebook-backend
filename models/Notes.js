const mongoose = require('mongoose')
const notesSchema = new mongoose.Schema({
    title:
    {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: 'General'
    },
    date: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Note = mongoose.model('Note', notesSchema)




module.exports = Note