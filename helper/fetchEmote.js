import got from "got";
import saveEmote from "./saveEmote.js";

export default async (emoteCategory, endPoint) => {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await got(endPoint, options).json();
  await saveEmote(response, emoteCategory);
};
