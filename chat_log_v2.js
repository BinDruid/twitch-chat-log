import dotenv from "dotenv";
dotenv.config();
import tmi from "tmi.js";
import mongoose from "mongoose";
import saveMessage from "./helper/saveMessage.js";

mongoose.connect("mongodb://localhost/TwitchChat", { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("\nConnected to database.\n"));

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
