const adventureModel = require('../models/Adventure');
const bookedSlotModel = require('../models/BookedSlot');

// Helper: Generate slots for the next 7 days (starting today)
function generateSlots(daysAhead = 7, totalSeats = 8) {
  const slots = [];
  const times = ['09:00', '11:00', '13:00', '15:00']; // must match DB time format exactly

  const today = new Date();
  for (let i = 0; i < daysAhead; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dateStr = date.toISOString().split('T')[0];

    times.forEach(time => {
      slots.push({
        date: dateStr,
        time,
        totalSeats,
        availableSeats: totalSeats
      });
    });
  }

  return slots;
}

// Convert 24h -> AM/PM for display
function convertToAmPm(time) {
  const [hour, minute] = time.split(':');
  const h = parseInt(hour, 10);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const adjusted = h % 12 || 12;
  return `${String(adjusted).padStart(2, '0')}:${minute} ${suffix}`;
}

exports.detail = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Requested Adventure ID:", id);

    //  Fetch adventure details
    const adventure = await adventureModel.findOne({ id });
    if (!adventure) {
      return res.status(404).json({ message: 'Adventure not found' });
    }

    // Use adventure’s total seats or fallback
    const totalSeats = adventure.totalSeats || 8;

    //  Generate slots for upcoming 7 days
    const generatedSlots = generateSlots(7, totalSeats);

    //  Fetch all bookings for this adventure
    const bookedSlots = await bookedSlotModel.find({ adventureId: id });
    console.log("Booked slots found:", bookedSlots.length);

    //  Compute available seats for each slot
    const updatedSlots = generatedSlots.map(slot => {
      // Sum all booked seats for this exact date & time
      const totalBookedSeats = bookedSlots
        .filter(b => b.date === slot.date && b.time === slot.time)
        .reduce((sum, b) => sum + (b.seatsBooked || 1), 0);

      const availableSeats = Math.max(slot.totalSeats - totalBookedSeats, 0);

      return {
        date: slot.date,
        time: slot.time,
        displayTime: convertToAmPm(slot.time),
        totalSeats: slot.totalSeats,
        availableSeats
      };
    });

    // 5️⃣ Filter slots: only show future (today onward)
const now = new Date();
const availableSlots = updatedSlots.filter(slot => {
  const slotDateTime = new Date(`${slot.date}T${slot.time}:00`);
  // Only keep if slot is after the current moment
  return slotDateTime > now;
});

    // 6️⃣ Return full adventure details with all computed slots
    res.status(200).json({
      ...adventure.toObject(),
      slots: availableSlots
    });

  } catch (error) {
    console.error('Error fetching adventure detail:', error);
    res.status(500).json({ message: 'Failed to load adventure detail' });
  }
};
