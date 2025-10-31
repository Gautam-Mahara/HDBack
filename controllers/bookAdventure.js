const { checkAvailability } = require('../utils/checkAvailability');
const bookedSlot = require('../models/BookedSlot');

exports.bookAdventure = async (req, res) => {
  try {
    const { adventureId, date, time, seatsRequested ,email } = req.body;

    // Check availability first
    const availability = await checkAvailability(adventureId, date, time);

    if (availability.error) {
      const statusCode = availability.error === "Adventure not found" ? 404 : 500;
      return res.status(statusCode).json({ message: availability.error });
    }

    if (!availability.available || availability.remainingSeats < seatsRequested) {
      return res.status(400).json({ 
        message: "Not enough seats available",
        remainingSeats: availability.remainingSeats
      });
    }
    //if seats are available bbok
    //create an object in BookedSlot collection
    const newBooking = new bookedSlot({
        adventureId,
        date,
        time,
        email,
        seatsBooked: seatsRequested
    });
    await newBooking.save();
    //retrive the booking number
    // console.log(newBooking);
    

    const bookingNumber = newBooking.bookingNumber;

    // console.log(bookingNumber);
    
    res.status(200).json({ message: "Adventure booked successfully!", bookingNumber });
    // Proceed with booking logic
    // ... your booking code here ...

    // res.status(200).json({ message: "Adventure booked successfully!" });

  } catch (error) {
    console.error("Error booking adventure:", error);
    res.status(500).json({ message: "Server error while booking" });
  }
};