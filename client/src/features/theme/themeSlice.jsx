import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: 'light'
    },
    reducers: {
        change: (state) => {
            state.theme === 'light'
                ? state.theme = 'dark'
                : state.theme = 'light'
        }
    }
})

export const { change } = themeSlice.actions
export default themeSlice.reducer