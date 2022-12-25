const mongoConnect = require('./db')
mongoConnect()
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
require('dotenv').config()
const port = 5000 || process.env.PORT

const userRouter = require('./routes/user')
const notesRouter= require('./routes/notes')

app.use(userRouter)
app.use(notesRouter)

app.listen(port, ()=> {
    console.log(`Server is up on port ${port}`)

})