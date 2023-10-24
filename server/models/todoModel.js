const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Please add a todo']
    }
}, {
    timestamps: true,
})


module.exports = mongoose.model('Todo', todoSchema)