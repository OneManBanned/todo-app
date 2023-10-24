const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please add a name']
    },
    password: {
        type: String,
        require: [true, 'Please add a name']
    },
},
    {
        timestamps: true
    })

module.exports = mongoose.model('User', userSchema)