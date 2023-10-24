const express = require('express')
const router = express.Router()
const { getTodos,
    setTodos,
    updateTodos,
    deleteTodos,
} = require('../controllers/todoController')

router.route('/').get(getTodos).post(setTodos)
router.route('/:id').delete(deleteTodos).put(updateTodos)

module.exports = router