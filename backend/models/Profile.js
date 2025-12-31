import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dietary: {
      type: Array,
      required: true,
      default: ["Omnivore"],
    },
    favouriteIngredients: {
      type: Array,
      required: false,
      default: [],
    },
    dislikedIngredients: {
      type: Array,
      required: false,
      default: [],
    },
    inventory: {
      type: Array,
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
