import ChatLog from "../models/ChatEmote.js";

export default async (user, msg, Id, mod, sub) => {
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
};
