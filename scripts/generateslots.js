const mongoose = require("mongoose");
const { populateSlots } = require("../utils/slots");
// require("dotenv").config();

const MONGO_URI = "mongodb+srv://Jenn:Janki6121@cluster0.vqk5j27.mongodb.net/TravelDb";

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const adventureId = "1"; // replace with actual _id
    await populateSlots(adventureId, 2); // next 7 days

    console.log("Slots populated successfully!");
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

run();
