const express = require('express')
const router = express.Router()
const { getTodos,
    setTodos,
    updateTodos,
    deleteTodos,
} = require('../controllers/todoController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getTodos).post(protect, setTodos)
router.route('/:id').delete(protect, deleteTodos).put(protect, updateTodos)

module.exports = router