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
  return await connection('events')
    .join('locations', 'events.location_id', 'locations.id') 
    .select(
      'events.id',
      'events.name as eventName', 
      'events.description',
      'events.time',
      'events.day',
      'events.location_id as locationId', 
      'locations.name as locationName' 
    )
    .where('events.day', day);
}


export async function getLocationById(id: number) {
  const location = await connection('locations')
    .where('id', id)
    .first()
    .select('id', 'name', 'description')
  return location as Location
}

export async function updateLocation(updatedLocation: { id: number; name: string; description: string }) {
  const { id, name, description } = updatedLocation;

 
  if (!id || !name || !description) {
    throw new Error('Missing required fields: id, name, or description');
  }

  const result = await connection('locations')
    .where('id', id)
    .update({ name, description });

  return result; 
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


export const addLocation = async (name: string, description: string) => {
  try {
    const [newLocation] = await connection('locations')
      .insert({ name, description })
      .returning('*');  
    return newLocation; 
  } catch (error) {
    console.error('Error adding location:', error);
    throw new Error('Failed to add location');
  }
};


export const deleteLocation = async (id: number) => {
  const result = await connection('locations')
    .where('id', id)
    .del();  

  return result;  
};