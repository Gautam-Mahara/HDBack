const Adventure = require('../models/Adventure');
const BookedSlot = require('../models/BookedSlot');

exports.checkAvailability = async (adventureId, date, time) => {
  try {
    // 1️⃣ Find the adventure
    const adventure = await Adventure.findOne({ id: adventureId });
    if (!adventure) {
      return { available: false, error: "Adventure not found", remainingSeats: 0 };
    }

    const totalSeats = adventure.totalSeats || 8;

    // 2️⃣ Find total booked seats for that date & time
    const booked = await BookedSlot.aggregate([
      { $match: { adventureId, date, time } },
      { $group: { _id: null, total: { $sum: "$seatsBooked" } } }
    ]);

    const alreadyBooked = booked.length > 0 ? booked[0].total : 0;
    const remainingSeats = Math.max(totalSeats - alreadyBooked, 0);

    return {
      available: remainingSeats > 0,
      remainingSeats,
      alreadyBooked,
      totalSeats
    };
  } catch (error) {
    console.error("Error checking availability:", error);
    return { available: false, error: "Server error", remainingSeats: 0 };
  }
};