import Profile from "../models/Profile.js";
import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId });

    const user = await User.findById(req.userId).select("-password");

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }
    res.status(200).json({
      success: true,
      profile,
      user,
    });
  } catch (error) {
    console.log("Server error", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  const { dietary, favouriteIngredients, dislikedIngredients, inventory } =
    req.body;

  try {
    const profile = await Profile.findOne({ userId: req.userId });

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    profile.dietary = dietary || profile.dietary;
    profile.favouriteIngredients =
      favouriteIngredients || profile.favouriteIngredients;
    profile.dislikedIngredients =
      dislikedIngredients || profile.dislikedIngredients;
    profile.inventory = inventory || profile.inventory;

    await profile.save();

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.log("Server error", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const resetProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId });

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    profile.dietary = ["Omnivore"];
    profile.favouriteIngredients = [];
    profile.dislikedIngredients = [];
    profile.inventory = [];

    await profile.save();

    res
      .status(200)
      .json({ success: true, message: "Profile reset successfully" });
  } catch (error) {
    console.log("Server error", error);
    res.status(500).json({ message: "Server error" });
  }
};
