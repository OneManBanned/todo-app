const asyncHandler = require('express-async-handler')
// @desc    Get todos
// @route   GET /
// @access  Private
const getTodos = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get todo' })
})
// @desc    Set todo
// @route   POST /
// @access  Private
const setTodos = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(200).json({ message: 'Set todo' })
})
// @desc    Update todos
// @route   Put /:id
// @access  Private
const updateTodos = asyncHandler(async (req, res) => {
    res.status(200).json({ "message": `Update todo ${req.params.id}` })
})
// @desc    Delete todos
// @route   DELETE /:id
// @access  Private
const deleteTodos = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Delete todo' })
})

module.exports = {
    getTodos,
    setTodos,
    updateTodos,
    deleteTodos
}