const { checkAvailability } = require('../utils/checkAvailability');

exports.checkAval = async (req, res) => {
  try {
    const { adventureId, date, time } = req.body;
    console.log("Checking availability for:", adventureId, date, time);

    const result = await checkAvailability(adventureId, date, time);

    if (result.error) {
      const statusCode = result.error === "Adventure not found" ? 404 : 500;
      return res.status(statusCode).json({ message: result.error });
    }

    res.status(200).json({
      available: result.available,
      remainingSeats: result.remainingSeats,
      message: result.available
        ? `${result.remainingSeats} seat(s) available for ${date} at ${time}`
        : `No seats available for ${date} at ${time}`
    });

  } catch (error) {
    console.error("Error in checkAval:", error);
    res.status(500).json({ message: "Server error while checking availability" });
  }
};