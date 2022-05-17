const tmi = require("tmi.js");
const mongoose = require("mongoose");
const ChatLog = require("./models/ChatMessage");

mongoose.connect(
  "mongodb://localhost/TwitchChat",
  () => {
    console.log("\nConnected to Database.\n");
  },
  (e) => console.error(e)
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

async function saveToDB(user, msg, Id, mod, sub) {
  try {
    const newChat = await ChatLog.create({
      userName: user,
      message: msg,
      userID: Id,
      moderator: mod,
      subscriber: sub,
    });
    console.log(newChat);
  } catch (e) {
    console.error(e);
  }
}

client.on("message", (channel, context, message, self) => {
  saveToDB(
    context["username"],
    message,
    context["user-id"],
    context["mod"],
    context["subscriber"],
  );
});
