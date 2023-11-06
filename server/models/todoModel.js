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
    },
    completed: {
        type: Boolean,
        require: true,
    }
}, {
    timestamps: true,
})


module.exports = mongoose.model('Todo', todoSchema)