import EmoteDB from "../models/Emote.js";
import emoteSetName from "./emoteSetName.js";

export default async (emotes, category) => {
  try {
    console.log(`Updating ${category} emote database.\n`);
    for (const emote of emotes) {
      if (!(await EmoteDB.exists({ code: emote.code }))) {
        const newEmote = await EmoteDB.create({
          code: emote.code,
          urls: emote.urls[0].url,
          set: `${emoteSetName(emote.provider)}_${category}`,
        });
        console.log(`Added new emote: ${newEmote}`);
      }
    }
    console.log(`Finished updating ${category} emotes.\n`);
  } catch (e) {
    console.error(e);
  }
};
