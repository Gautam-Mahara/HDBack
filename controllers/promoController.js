const Promo = require('../models/promos');

exports.applyPromo = async (req, res) => {
  try {
    console.log("inside promo");
    
    const { promoCode } = req.body;

    console.log("Promo code received:", promoCode);

    // Step 1: Find the promo
    const promo = await Promo.findOne({ code: promoCode });

    if (!promo) {
      return res.status(404).json({ message: "Invalid promo code" });
    }

    // Step 2: Check expiration
    if (new Date(promo.validTill) < new Date()) {
      return res.status(400).json({ message: "Promo code has expired" });
    }

    // Step 3: Check if active
    if (!promo.isActive) {
      return res.status(400).json({ message: "Promo code is not active" });
    }

    // Step 4: Send discount details
    res.status(200).json({
      success: true,
      promo: {
        code: promo.code,
        type: promo.discountPercentage ? "percentage" : "amount",
        value: promo.discountPercentage || promo.discountAmount,
        validTill: promo.validTill
      }
    });

  } catch (error) {
    console.error("Error in applyPromo:", error);
    res.status(500).json({ message: "Server error in applyPromo" });
  }
};
