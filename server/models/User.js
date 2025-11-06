import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    teachSkills: {
      type: [String], // e.g., ["JavaScript", "Drawing"]
      default: [],
    },

    learnSkills: {
      type: [String], // e.g., ["Python", "Guitar"]
      default: [],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

const User = mongoose.model("User", userSchema);

export default User;
