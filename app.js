const express = require('express')
const app = express()

const tasksRoute = require('./routes/todo')

app.use(express.json())

app.use((req,res,next)=> {
    console.log(`${req.method} request is made`)
    next()
})

app.use('/api/tasks',tasksRoute)

app.get('*',(req,res) => {
    res.send(`<h1>Resource not found</h1>`)
})

app.listen(5000)