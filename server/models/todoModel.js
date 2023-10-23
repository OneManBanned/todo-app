const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add a todo']
    }
}, {
    timestamps: true,
})


module.exports = mongoose.model('Todo', todoSchema)