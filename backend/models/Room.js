import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    title: { type: String },
    price: { type: Number },
    discount: { type: Number}, // Added discount
    maxPeople: { type: Number },
    desc: { type: String },
    photos: { type: [String] },
    roomNumbers: [
      {
        number: Number,
        unavailableDates: { type: [Date] },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);
