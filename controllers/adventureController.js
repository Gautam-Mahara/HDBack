const adventureModel = require('../models/Adventure');

// GET /api/adventures
exports.getAdventures =async (req, res) => {
  try {
    // const adventures = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const adventures = await adventureModel.find({});
    console.log("Adventures type:", Array.isArray(adventures), adventures);

    res.json(adventures);
  } catch (error) {
    console.error('Error reading adventures:', error);
    res.status(500).json({ message: 'Failed to load adventures' });
  }
};


// POST /api/adventures
exports.uploadAdventure = (req, res) => {
  try {
    const adventures = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    const newAdventure = {
      id: (adventures.length + 1).toString(),
      title: req.body.title,
      location: req.body.location,
      price: parseInt(req.body.price),
      description: req.body.description,
      image: req.body.image, // directly from frontend as URL
    };

    adventures.push(newAdventure);
    fs.writeFileSync(dataPath, JSON.stringify(adventures, null, 2));

    res.status(201).json(newAdventure);
  } catch (error) {
    console.error('Error saving adventure:', error);
    res.status(500).json({ message: 'Failed to save adventure' });
  }
};


