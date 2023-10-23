const asyncHandler = require('express-async-handler')

const Todo = require('../models/todoModel')

// @desc    Get todos
// @route   GET /
// @access  Private
const getTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find()

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

    const todo = await Todo.create({
        text: req.body.text,
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
        throw new Error('Todo no found')
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true, })
    res.status(200).json(updatedTodo)
})

// @desc    Delete todos
// @route   DELETE /:id
// @access  Private
const deleteTodos = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    if (!todo) {
        res.status(400)
        throw new Error('Todo no found')
    }

    await Todo.findByIdAndRemove(req.params.id)
    res.status(200).json()
})

module.exports = {
    getTodos,
    setTodos,
    updateTodos,
    deleteTodos
}