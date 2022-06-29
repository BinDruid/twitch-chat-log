import mongoose from "mongoose";
const EmoteSchema = new mongoose.Schema({
  code: String,
  url: String,
  set: String,
  date: { type: Date, default: new Date().toLocaleDateString() },
});

export default mongoose.model("Emote", EmoteSchema);
