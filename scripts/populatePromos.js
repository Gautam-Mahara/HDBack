const mongoose = require("mongoose");
const Promo = require("../models/promos");

// 🔹 Replace with your own MongoDB URI
const MONGO_URI = "mongodb+srv://Jenn:Janki6121@cluster0.vqk5j27.mongodb.net/TravelDb";

async function populatePromos() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clean up old promo codes if any
    await Promo.deleteMany({});
    console.log("🧹 Cleared old promos");

    const promos = [
      {
        code: "SAVE10",
        discountPercentage: 10,
        validTill: new Date("2025-12-31")
      },
      {
        code: "FLAT200",
        discountAmount: 200,
        validTill: new Date("2025-11-30")
      },
      {
        code: "NEWUSER15",
        discountPercentage: 15,
        validTill: new Date("2026-01-15")
      },
      {
        code: "FESTIVE500",
        discountAmount: 500,
        validTill: new Date("2025-12-25")
      },
      {
        code: "SUMMER25",
        discountPercentage: 25,
        validTill: new Date("2025-06-30")
      }
    ];

    await Promo.insertMany(promos);
    console.log("🎉 Promo codes populated successfully!");

  } catch (err) {
    console.error("❌ Error populating promos:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

populatePromos();
