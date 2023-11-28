const express = require('express')
const router = express.Router()
const { getTodos,
    setTodos,
    updateTodos,
    deleteTodos,
    deleteManyTodos,
    updateManyTodos
} = require('../controllers/todoController')

const { protect } = require('../middleware/authMiddleware')

router.route('/')
    .get(protect, getTodos)
    .post(protect, setTodos)
    .delete(protect, deleteManyTodos)
    .put(protect, updateManyTodos)
router.route('/:id')
    .delete(protect, deleteTodos)
    .put(protect, updateTodos)

module.exports = router