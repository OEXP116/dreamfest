import { LocationData } from '../../models/Location.ts'; 

export const addLocation = async (location: LocationData) => {
  
  const response = await fetch('/api/v1/locations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(location),
  });

  if (!response.ok) {
    throw new Error('Error adding location');
  }

  return response.json();  
};