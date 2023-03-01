const express = require('express')
const router =  new express.Router()
const User = require('../models/User')
const Auth = require('../middleware/auth')
const Note = require('../models/Notes')

router.post('/users', async(req,res) => {
    const user = new User(req.body)
    try {
        
        const token = await user.generateAuthToken()
        const saveduser = await user.save()
        
        // console.log({nisha: token})
        res.status(201).json({token: token})
    } catch (error) {
        res.status(500).send(error)
    }

})

router.post('/users/login', async(req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        const newNotes = await Note.find({})
        res.status(201).json({notes: newNotes, token: token})
        
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
        
    }
})

module.exports = router
