import ChatDB from "../models/Chat.js";

export default async (user, msg, Id, mod, sub) => {
  try {
    const newChat = await ChatDB.create({
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
