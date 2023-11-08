import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import todoService from './todoService'

const initialState = {
    todos: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new todo

export const createTodo = createAsyncThunk('todos/create', async (todoData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await todoService.createTodo(todoData, token)
    } catch (error) {
        const message = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message || error.toString()
        // thinkAPI.rejectWithValue sends message as payload
        return thunkAPI.rejectWithValue(message)
    }
})

// Get user goals
export const getTodos = createAsyncThunk('todos/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await todoService.getTodos(token)
    } catch (error) {
        const message = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message || error.toString()
        // thinkAPI.rejectWithValue sends message as payload
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete user todo
export const deleteTodo = createAsyncThunk('todos/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await todoService.deleteTodo(id, token)
    } catch (error) {
        const message = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message || error.toString()
        // thinkAPI.rejectWithValue sends message as payload
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteManyTodos = createAsyncThunk('todos/deleteMany', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await todoService.deleteManyTodos(token)
    } catch (error) {
        console.log(error)
        const message = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message || error.toString()
        // thinkAPI.rejectWithValue sends message as payload
        return thunkAPI.rejectWithValue(message)
    }
})

// Update Todo
export const updateTodo = createAsyncThunk('todos/update', async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await todoService.updateTodo(data, token)
    } catch (error) {
        const message = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message || error.toString()
        // thinkAPI.rejectWithValue sends message as payload
        return thunkAPI.rejectWithValue(message)
    }
})

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTodo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.todos.push(action.payload)
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.isLoading = false
                state.Error = true
                state.message = action.payload
            })
            .addCase(getTodos.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTodos.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.todos = action.payload
            })
            .addCase(getTodos.rejected, (state, action) => {
                state.isLoading = false
                state.Error = true
                state.message = action.payload
            })
            .addCase(deleteTodo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.todos = state.todos.filter((todo) => todo._id !== action.payload.id)
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.isLoading = false
                state.Error = true
                state.message = action.payload
            })
            .addCase(deleteManyTodos.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteManyTodos.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
                state.todos = state.todos.filter((todo) => !todo.completed)
            })
            .addCase(deleteManyTodos.rejected, (state, action) => {
                state.isLoading = false
                state.Error = true
                state.message = action.payload
            })
            .addCase(updateTodo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateTodo.fulfilled, (state, { _id }) => {
                state.isLoading = false
                state.isSuccess = true
                state.todos = state.todos
                    .map((todo) => todo._id === _id ? action.payload : todo)
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.isLoading = false
                state.Error = true
                state.message = action.payload
            })

    }
})


export const { reset } = todoSlice.actions

export default todoSlice.reducer