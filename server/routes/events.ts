import express from 'express'

import { validateDay } from './helpers.ts'
import * as db from '../db/index.ts'

const router = express.Router()
export default router


router.post('/', async (req, res, next) => {
  try {
    const { name, description, time, locationId, day } = req.body
    const validatedDay = validateDay(day) 

    
    const newEvent = { name, description, time, locationId, day: validatedDay }
    const id = await db.addNewEvent(newEvent) 

    const url = `/api/v1/events/${id}`
    res.setHeader('Location', url)
    res.status(201).json({ location: url })
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)

    
    await db.deleteEvent(id)

    
    res.sendStatus(204)
  } catch (e) {
    res.status(404).json({ error: 'Event not found or deletion failed' })
  }
})





router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)

    
    const event = await db.getEventById(id)

    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }

    res.json(event)
  } catch (e) {
    next(e)
  }
})


router.patch('/:id', async (req, res, next) => {
  try {
    const { name, description, time, day, locationId } = req.body
    const id = Number(req.params.id)

    
    const validatedDay = validateDay(day)

    
    const updatedEvent = { id, name, description, time, day: validatedDay, locationId }

    
    const result = await db.updateEvent(id, updatedEvent)

    if (result) {
      res.sendStatus(204)
    } else {
      res.status(404).json({ error: 'Event not found' })
    }
  } catch (e) {
    next(e)
  }
})
