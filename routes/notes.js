const express = require('express')
const router = new express.Router()
const Note = require('../models/Notes')
const User = require('../models/User')
const Auth = require('../middleware/auth')

router.post('/notes', Auth, async(req,res) => {
    const note = new Note({title:req.body.title, description: req.body.description, tag: req.body.tag, owner: req.user})
    console.log("this is coming from frontend", note)
    try {
        
        
        const result = await note.save()
        const nowNotes = await Note.find({owner:req.user._id})
        res.status(200).json({notes: nowNotes})
        console.log("this is sending from backend", nowNotes)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/notes/get', Auth, async(req,res) => {
    try {
        console.log(req.user._id)
        const note = await Note.find({owner: req.user._id})
        console.log(req.user)
            res.status(200).json({notes: note})
       
    
    } catch (error) {
        console.log("error", error)
        res.status(500).send(error)
    }
})

router.patch('/notes/update/:id', Auth , async(req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates= ['title', 'description', 'tag']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error : 'Invalid updates'})
    }
    try {

        const note = await Note.findOne({_id: req.params.id, owner: req.user._id})

        if(!note){
            return res.status(404).send(e)

    }
        
        updates.forEach((update) => note[update] = req.body[update])
        await note.save()
        const newNotes = await Note.find({})
    res.send(newNotes)
}
     catch (error) {
        res.status(400).send(error)
        
    }
})

router.delete('/notes/delete/:id', Auth, async(req,res) => {
    try {
        const note = await Note.findByIdAndDelete({_id: req.params.id})
        res.status(200).json(note)
    } catch (error) {
        res.status(500).send(e)
    }
})

module.exports = router