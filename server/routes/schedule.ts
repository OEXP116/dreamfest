import express from 'express'

import { validateDay } from './helpers.ts'
import * as db from '../db/index.ts'

const router = express.Router()


router.get('/:day', async (req, res, next) => {
  try {
    const day = validateDay(req.params.day)
    const events = await db.getEventsByDay(day)
    res.json({ day, events })
    // console.log("hello")
    // console.log(events)
  } catch (e) {
    next(e)
    console.log(e)
  }
})



export default router
