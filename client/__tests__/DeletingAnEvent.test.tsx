// @vitest-environment jsdom
import { describe, it, expect, beforeAll } from 'vitest'
import nock from 'nock'

import { setupApp } from './setup.tsx'
import { waitFor } from '@testing-library/react'

beforeAll(() => {
  nock.disableNetConnect()
})

const fakeEvent = {
  id: 1,
  day: 'friday',
  time: '2pm - 3pm',
  name: 'Slushie Apocalypse I',
  description:
    'This event will be taking place at the TangleStage. Be sure to not miss the free slushies cause they are rad!',
  locationId: 1,
}

const fakeLocations = {
  locations: [
    {
      id: 1,
      name: 'Kayak Room',
      description: 'This is the room we keep kayaks in',
    },
  ],
}

describe('Deleting an event', () => {
  it('shows current data on the form', async () => {
    const eventScope = nock('http://localhost')
      .get('/api/v1/events/1')
      .reply(200, fakeEvent)

    const locationScope = nock('http://localhost')
      .get('/api/v1/locations')
      .reply(200, fakeLocations)

    // ARRANGE
    const { ...screen } = setupApp('/events/1/edit')
    // ACT
    // ASSERT
    const nameInput = await screen.findByLabelText('Event name')
    const descriptionInput = await screen.findByLabelText('Description')

    expect(nameInput).toBeVisible()
    expect(nameInput).toHaveValue('Slushie Apocalypse I')
    expect(descriptionInput).toBeInTheDocument()
    expect(descriptionInput).toHaveValue(
      'This event will be taking place at the TangleStage. Be sure to not miss the free slushies cause they are rad!',
    )

    expect(eventScope.isDone()).toBe(true)
    expect(locationScope.isDone()).toBe(true)
  })

  it('deletes the event when the delete button is clicked', async () => {
    const deleteEventScope = nock('http://localhost')
      .delete('/api/v1/events/1')
      .reply(204);
  
    const locationScope = nock('http://localhost')
      .get('/api/v1/locations')
      .reply(200, fakeLocations);
  
    const eventScope = nock('http://localhost')
      .get('/api/v1/events/1')
      .reply(200, fakeEvent);
  
    const { user, ...screen } = setupApp('/events/1/edit');
  
    await screen.findByText(/edit event/i);
  
    const deleteButton = await screen.findByRole('button', { name: 'Delete event' });
    await user.click(deleteButton);
  
    await waitFor(() => {
      expect(deleteEventScope.isDone()).toBe(true);
    });
  
    expect(locationScope.isDone()).toBe(true);
    expect(eventScope.isDone()).toBe(true);
  
    expect(screen.queryByText(/failed to load event data/i)).not.toBeInTheDocument();
  });
  
  
})
