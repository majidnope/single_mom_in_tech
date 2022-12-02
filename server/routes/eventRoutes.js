const express = require('express')
const router = express.Router()
const Event = require('../model/eventModel')
const jwt = require('jsonwebtoken')
const { isAuth } = require('../middleware/Auth')

router.get('/event', async (req, res) => {
    try {
        const event = await Event.find()
        res.send({post, status: true})
    } catch (e) {
        res.send({ message: 'Failed to Get Blog Collections', status: false  })
    }
})

router.get('/event/:id', async (req, res) => {
    try {
        const { id } = req.params
        const event = await Event.findById({ _id: id })
        event ? res.send(event) : res.send({ message: 'There is no such blog', status: false })
    } catch (e) {
        res.send({ message: 'Failed to Get Blog Detail', status: false })
    }
})

router.post('/event', async (req, res) => {
    try {
        const { title, description, location, link, username } = req.body   
        
        const event = new Event({
            title,
            description, 
            location,
            link,
            username
        })
        await event.save()
        res.send({message: 'Successfully Saved', status: true})
    } catch (e) {
        res.send({ message: 'Failed to Post Blog', status: false  })
    }
})

router.patch('/event/:id', isAuth, async (req, res) => {
    try {
        const { id } = req.params
        const event = await Event.findByIdAndUpdate(id, { ...req.body })
        res.send({ message: 'Successfully Updated!', status: true})
    } catch (e) {
        res.send({ message: 'Failed to Edit Blog', status: false  })
    }
})

router.delete('/event/:id', isAuth, async (req, res) => {
    try {
        const { id } = req.params
        const event = await Event.deleteOne({ _id: id })
        res.send({ message: 'Successfully Deleted', status: true})
    } catch (e) {
        res.send({ message: 'Failed to Delete Blog ' + e.message, status: false  })
    }
})

module.exports = router