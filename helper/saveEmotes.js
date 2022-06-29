import EmoteLog from "../models/Emote.js";
import emoteSetName from "./emoteSetName.js";

export default async (emotes, category) => {
  try {
    for (const emote of emotes) {
      const newEmote = await EmoteLog.create({
        code: emote.code,
        urls: emote.urls[0].url,
        set: `${emoteSetName(emote.provider)}_${category}`,
      });
      console.log(newEmote);
    }
  } catch (e) {
    console.error(e);
  }
};
