import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventWithLocation, EventData } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]
export const connection = knex(config)

export async function getAllLocations() {
  const locations = await connection('locations').select('*')
  return locations as Location[]
}

export async function getEventsByDay(day: string) {
  const events = await connection('events')
    .join('locations', 'events.location_id', 'locations.id')
    .where('events.day', day)
    .select(
      'events.id',
      'events.day',
      'events.time',
      'events.name as eventName',
      'events.description',
      'locations.name as locationName'
    )
  return events as EventWithLocation[]
}

export async function getLocationById(id: number) {
  const location = await connection('locations')
    .where('id', id)
    .first()
    .select('id', 'name', 'description')
  return location as Location
}

export async function updateLocation(id: number, name: string, description: string) {
  await connection('locations')
    .where('id', id)
    .update({ name, description })
}

export async function addNewEvent(event: EventData) {
  const { name, description, day, time, locationId } = event
  await connection('events').insert({
    name,
    description,
    day,
    time,
    location_id: locationId, 
  })
}

export async function deleteEvent(id: number) {
  await connection('events').where('id', id).del()
}


export async function updateEvent(id: number, updatedEvent: Event) {
  const { name, description, day, time, locationId } = updatedEvent;
  const result = await connection('events')
    .where('id', id)
    .update({ name, description, day, time, location_id: locationId });

  return result > 0; 
}

export const getEventById = async (id: number) => {
  const result = await connection('events').where('id', id).first()
  return result 
}

