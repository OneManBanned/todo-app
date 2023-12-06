const express = require('express')
const path = require('path')
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, './.env') })
const { errorHandler } = require('./middleware/errMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/app/todos', require('./routes/todoRoutes'))
app.use('/app/users', require('./routes/userRoutes'))

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'client', 'dist', 'index.html')))
} else {
    app.get('/', (req, res) =>
        res.send('Please set to production'))
}

app.use(errorHandler)

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})