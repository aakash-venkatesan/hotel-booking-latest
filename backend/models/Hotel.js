import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
  {
    name: { type: String},
    type: { type: String },
    city: { type: String },
    address: { type: String},
    state: { type: String }, // Added state
    country: { type: String }, // Added country
    code: { type: String }, // Added code
    distance: { type: String },
    photos: { type: [String] },
    title: { type: String},
    description: { type: String }, // Renamed desc -> description
    rating: { type: Number, min: 0, max: 5 },
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
        default: [],
      },
    ],
    cheapestPrice: { type: Number },
    featured: { type: Boolean },
    offerings: { type: [String] },
    cancelationPolicy: { type: String},
  },
  { timestamps: true }
);

export default mongoose.model("Hotel", HotelSchema);
