import mongoose from "mongoose";
import EmoteDB from "./Emote.js";
import mentionCheck from "../helper/mentionCheck.js";
import emojiCheck from "../helper/emojiCheck.js";

const ChatSchema = new mongoose.Schema({
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
  emojis: [String],
  emotes: [String],
  mentions: [String],
  userID: Number,
  moderator: Boolean,
  subscriber: Boolean,
});

ChatSchema.pre("save", async function (next) {
  const { message } = this;
  const words = message.split(" ");
  for (let i = 0; i < words.length; i++)
    //Iteration is over index in case of saving index instead of word itself
    if (mentionCheck(words[i])) this.mentions.push(words[i]);
    else if (emojiCheck(words[i])) this.emojis.push(words[i]);
    else if (await EmoteDB.exists({ code: words[i] }))
      this.emotes.push(words[i]);
  next();
});

export default mongoose.model("Chat", ChatSchema);
