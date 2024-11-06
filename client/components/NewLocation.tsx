import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { addLocation } from '../hooks/use-create-location';
import { LocationData } from '../../models/Location'; 

const NewLocation = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');

  
  const mutation = useMutation({
    mutationFn: addLocation,
    onSuccess: () => {
      console.log('Location added successfully');
    },
    onError: (error) => {
      console.error('Error adding location:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ name, description, address });
  };

  return (
    <div>
      <h2>Add New Location</h2>
      {mutation.status === 'pending' && <div>Loading...</div>}
      {mutation.status === 'error' && <div>Error: {mutation.error?.message}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          Add Location
        </button>
      </form>
    </div>
  );
};

export default NewLocation;
