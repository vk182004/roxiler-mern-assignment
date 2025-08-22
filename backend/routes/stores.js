// backend/routes/stores.js
import express from 'express';
import Store from '../models/Store.js'; // ✅ Direct Mongoose model import

const router = express.Router();

// GET /api/stores - Get all stores
router.get('/', async (req, res) => {
  try {
    const stores = await Store.find(); // Mongoose method
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stores', error: err.message });
  }
});

// POST /api/stores - Add a new store
router.post('/', async (req, res) => {
  try {
    const { name, address } = req.body;
    const newStore = new Store({ name, address });
    await newStore.save(); // Mongoose save method
    res.json({ message: 'Store added!', store: newStore });
  } catch (err) {
    res.status(500).json({ message: 'Error adding store', error: err.message });
  }
});

export default router;
