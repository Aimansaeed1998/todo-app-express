const express = require('express')
const app = express()
const cors = require('cors')


var corsOptions = {
    origin : "http://localhost:8081"
}

app.use(cors(corsOptions))

const db = require('./models')

db.sequelize.sync({force: true}).then(()=> {
    console.log('dropped the database and re-synced')
})

app.use(express.json())
app.use((req,res,next)=> {
    console.log(`${req.method} request is made`)
    
    next()
})

app.get('/',(req,res)=> {
    res.json({message: "Welcome to the app backend"})
})
require("./routes/routes.js")(app);

app.get('*',(req,res) => {
    res.send(`<h1>Resource not found</h1>`)
})

app.listen(3000, () => {
    console.log('Server listening to the port 3000')
})
