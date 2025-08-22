// In a new file: `routes/ratings.js`
// POST /api/ratings - Submit a rating
router.post('/', auth, async (req, res) => {
  try {
    const { storeId, rating } = req.body;
    const userId = req.user.id; // From JWT token

    // Save rating to DB. (Check if user already rated this store? Skip for now)
    const newRating = await Rating.create({ userId, storeId, rating });
    res.json({ message: 'Rating submitted!', rating: newRating });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting rating', error: err.message });
  }
});
