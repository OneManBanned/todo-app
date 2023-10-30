import axios from 'axios'

const API_URL = 'app/todos/'

// Create new todo
const createTodo = async (todoData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, todoData, config)

    return response.data
}

// Get user goals
const getTodos = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)
    return response.data.todos
}

const todoService = {
    createTodo,
    getTodos
}

export default todoService