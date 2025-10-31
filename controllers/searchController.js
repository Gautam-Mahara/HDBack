// controllers/searchController.js
const Adventure = require('../models/Adventure'); // Adjust path as needed

exports.searchQuery = async (req, res) => {
  try {
    const query = req.query.query;
    console.log('Search query received:', query);

    if (!query || query.trim() === '') {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const results = await Adventure.find({ 
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });

    console.log(`Found ${results.length} results for query: ${query}`);
    res.json(results);
  } catch (error) {
    console.error('Error searching adventures:', error);
    res.status(500).json({ message: 'Failed to search adventures', error: error.message });
  }
};