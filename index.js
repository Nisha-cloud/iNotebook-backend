const mongoConnect = require('./db')
mongoConnect()
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
require('dotenv').config()
const port = process.env.PORT || 5000

const userRouter = require('./routes/user')
const notesRouter= require('./routes/notes')

app.use(userRouter)
app.use(notesRouter)

app.listen(port, ()=> {
    console.log(`Server is up on port ${port}`)

})