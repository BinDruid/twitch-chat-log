import mongoose from "mongoose";

const ChatMessageSchema = new mongoose.Schema({
  chatDate: {
    type: String,
    default: () => new Date().toLocaleDateString(),
    immutable: true,
  },
  chatTime: {
    type: String,
    default: () => new Date().toLocaleTimeString(),
    immutable: true,
  },
  userName: String,
  message: String,
  userID: Number,
  moderator: Boolean,
  subscriber: Boolean,
});

export default mongoose.model("ChatMessage", ChatMessageSchema);
