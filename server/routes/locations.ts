import express from 'express';
import * as db from '../db/index.ts';

const router = express.Router();

// Get all locations
router.get('/', async (req, res, next) => {
  try {
    const locations = await db.getAllLocations();
    res.json({ locations });
  } catch (e) {
    next(e);
  }
});

// Get location by ID
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const location = await db.getLocationById(Number(id));
    res.json(location);
  } catch (e) {
    next(e);
  }
});

// Update location by ID
router.patch('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name, description } = req.body;

    await db.updateLocation(id, name, description);

    res.sendStatus(204); // No content response
  } catch (e) {
    next(e);
  }
});

// Add new location (POST)
router.post('/', async (req, res, next) => {
  try {
    const { name, description } = req.body;

    // Add location to the database
    const newLocation = await db.addLocation(name, description); // You need to create the addLocation function in your db logic

    res.status(201).json(newLocation); // Send back the newly created location
  } catch (e) {
    next(e);
  }
});


router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    // Check if the location exists
    const location = await db.getLocationById(Number(id));
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    // Optionally, handle cascading deletion of events associated with this location
    // You can add additional logic here if needed, like deleting related events

    // Delete the location
    await db.deleteLocation(Number(id));

    res.status(204).send();  // Successfully deleted, but no content to return
  } catch (e) {
    next(e);  // Pass any error to the error handler
  }
});

export default router;
