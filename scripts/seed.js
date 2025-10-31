const mongoose = require('mongoose');
const Adventure = require('../models/Adventure');

const seedData = [
  {
    id: '1',
    title: 'Kayaking',
    location: 'Udupi, Karnataka',
    price: 999,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    description: 'Curated small-group experience. Certified guide. Safety first with gear provided.',
    slots: [
      { date: '2025-11-05', time: '10:00 AM', available: true },
      { date: '2025-11-05', time: '02:00 PM', available: true },
      { date: '2025-11-06', time: '11:00 AM', available: false },
    ]
  },
  {
    id: '2',
    title: 'Trek to Kodachadri',
    location: 'Shimoga, Karnataka',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    description: 'Guided trek through scenic routes with meals included.',
    slots: [
      { date: '2025-11-08', time: '07:00 AM', available: true },
      { date: '2025-11-08', time: '11:00 AM', available: true },
      { date: '2025-11-09', time: '09:00 AM', available: false },
    ]
  }
];

mongoose.connect('mongodb+srv://Jenn:Janki6121@cluster0.vqk5j27.mongodb.net/TravelDb', )
.then(async () => {
  console.log('✅ Connected to MongoDB');
  await Adventure.deleteMany({});
  console.log('🧹 Old data cleared');
  await Adventure.insertMany(seedData);
  console.log('🌱 Database seeded successfully');
  mongoose.connection.close();
})
.catch(err => console.error('❌ Error seeding database:', err));
