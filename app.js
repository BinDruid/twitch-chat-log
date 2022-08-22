import dotenv from "dotenv";
dotenv.config();
import tmi from "tmi.js";
import mongoose from "mongoose";
import fetchEmote from "./helper/fetchEmote.js";
import saveMessage from "./helper/saveMessage.js";

mongoose.connect(process.env.DB_LOCAL_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database.\n"));

await fetchEmote(
  "Channel",
  `https://emotes.adamcy.pl/v1/channel/${process.env.CHAT_CHANNEL}/emotes/twitch.7tv.bttv.ffz`
);
await fetchEmote(
  "Global",
  "https://emotes.adamcy.pl/v1/global/emotes/twitch.7tv.bttv.ffz"
);

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: [process.env.CHAT_CHANNEL],
});

client.connect().catch(console.error);
client.on("connected", (addr, port) => {
  console.log(`\nConnected to ${addr}:${port}`);
  console.log("\n=== Monitoring messages in chat ===\n");
});

client.on("message", (channel, context, message, self) => {
  saveMessage(
    context["username"],
    message,
    context["user-id"],
    context["mod"],
    context["subscriber"]
  );
});
