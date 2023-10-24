const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, password } = req.body

    if (!name || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({ name })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        password: hashedPassword,
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { password, name } = req.body

    // Check for user name
    const user = await User.findOne({ name })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user credentials')
    }
})

// @desc Get user data
// @route Get /api/users/me
// @access Public
const getMe = asyncHandler(async (req, res) => {
    res.json({ message: 'User data' })
})
module.exports = {
    registerUser,
    loginUser,
    getMe
}