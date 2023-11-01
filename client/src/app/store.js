import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import todoReducer from '../features/todos/todosSlice'
import themeReducer from '../features/theme/themeSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        todos: todoReducer,
        theme: themeReducer
    }
})