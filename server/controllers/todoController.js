const asyncHandler = require('express-async-handler')
const Todo = require('../models/todoModel')


// @desc    Get todos
// @route   GET /
// @access  Private
const getTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find({ user: req.user.id }).sort({ order: 1 })
    res.status(200).json({ todos })
})

// @desc    Set todo
// @route   POST /
// @access  Private
const setTodos = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const todos = await Todo.find({ user: req.user.id }).sort({ order: -1 })
    const nextIndex = todos[0] ? todos[0].order + 1 : 0

    const todo = await Todo.create({
        text: req.body.text,
        completed: req.body.completed,
        user: req.user.id,
        order: nextIndex
    })

    res.status(200).json(todo)
})

// @desc    Update todos
// @route   Put /:id
// @access  Private
const updateTodos = asyncHandler(async (req, res) => {

    const todo = await Todo.findById(req.params.id)

    if (!todo) {
        res.status(400)
        throw new Error('Todo not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in the user matches the goal user
    if (todo.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        {
            text: todo.text,
            completed: !todo.completed,
            _id: req.params.id,
            order: todo.order
        },
        { new: true, })

    res.status(200).json(updatedTodo)
})

const updateManyTodos = asyncHandler(async (req, res) => {

    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    let index = 0
    for (const todo of req.body) {
        await Todo.findByIdAndUpdate({ _id: todo._id }, { order: index })
        index++
    }

    const todos = await Todo.find({ user: req.user.id }).sort({ order: 1 })
    res.status(200).json(todos)
})

// @desc    Delete todos
// @route   DELETE /:id
// @access  Private
const deleteTodos = asyncHandler(async (req, res) => {

    const todo = await Todo.findById(req.params.id)

    if (!todo) {
        res.status(400)
        throw new Error('Todo not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in the user matches the goal user
    if (todo.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await Todo.findByIdAndRemove(req.params.id)
    res.status(200).json({ id: req.params.id })
})

const deleteManyTodos = asyncHandler(async (req, res) => {

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    const todo = await Todo.deleteMany({ user: req.user._id, completed: true })
    res.status(200).json(todo)
})

module.exports = {
    getTodos,
    setTodos,
    updateTodos,
    updateManyTodos,
    deleteTodos,
    deleteManyTodos
}