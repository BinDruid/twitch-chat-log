import mongoose from "mongoose";
import saveEmotes from "./helper/saveEmotes.js";
import got from "got";
mongoose.connect("mongodb://localhost/TwitchChat", { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("\nConnected to database.\n"));

const fetchEmote = async (emoteCategory, endPoint) => {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await got(endPoint, options).json();
  saveEmotes(response, emoteCategory);
  console.log(`Done fetch ${emoteCategory}`);
};

// setTimeout(
//   async () =>
//     await fetchEmote(
//       "Channel",
//       "https://emotes.adamcy.pl/v1/channel/quin69/emotes/twitch"
//     ),
//   3000
// );

// setTimeout(
//   async () =>
//     await fetchEmote(
//       "Global",
//       "https://emotes.adamcy.pl/v1/global/emotes/twitch.7tv.bttv.ffz"
//     ),
//   3000
// );
await fetchEmote(
  "Channel",
  "https://emotes.adamcy.pl/v1/channel/quin69/emotes/twitch"
);
