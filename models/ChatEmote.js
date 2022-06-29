import mongoose from "mongoose";
import EmoteLog from "./Emote.js";
import emojiCheck from "../helper/emojiCheck.js";

const ChatEmoteSchema = new mongoose.Schema({
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
  emoji: [Number],
  emote: [Number],
  userID: Number,
  moderator: Boolean,
  subscriber: Boolean,
});

ChatEmoteSchema.pre("save", async function (next) {
  const { message } = this;
  const words = message.split(" ");
  for (let i = 0; i < words.length; i++)
    if (emojiCheck(words[i])) this.emoji.push(i);
    else if (await EmoteLog.exists({ code: words[i] })) this.emote.push(i);
  next();
});

export default mongoose.model("ChatEmote", ChatEmoteSchema);
