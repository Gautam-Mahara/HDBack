// utils/populateSlots.js
const BookedSlot = require("../models/BookedSlot");
const Adventure = require("../models/Adventure");

async function populateSlots(adventureId, days = 7) {
  // adventureId here is the custom string like "1"
  const adventure = await Adventure.findOne({ id: adventureId });
  if (!adventure) throw new Error("Adventure not found");

  const times = ["09:00", "11:00", "13:00", "15:00"];
  const totalSlots = 10;
  const today = new Date();
  const slots = [];

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = date.toISOString().split("T")[0];

    for (const time of times) {
      const exists = await BookedSlot.findOne({
        adventureId: adventure.id, // <-- use custom id here
        date: dateStr,
        time
      });
      if (!exists) {
        slots.push({
          adventureId: adventure.id, // <-- store string id
          date: dateStr,
          time,
          totalSlots,
          bookedSlots: 0
        });
      }
    }
  }

  if (slots.length) {
    await BookedSlot.insertMany(slots);
    console.log(`✅ ${slots.length} new slots generated for ${adventure.title || adventure.name || adventure.id}`);
  } else {
    console.log(`⚠️ All slots already exist for ${adventure.title || adventure.name || adventure.id}`);
  }
}

module.exports = { populateSlots };
