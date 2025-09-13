import mongoose, { Schema } from "mongoose";

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: [String], 
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    cast: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, 
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    poster: {
      type: String, 
      required: false,
    },
    videoUrl: {
      type: String, 
      required: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const movieModel = mongoose.model("Movie", movieSchema);
export default movieModel;
