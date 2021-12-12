import { MessageActionRow, MessageButton } from "discord.js";

export default class PlayerService {
  constructor() {}

  static player(): MessageActionRow {
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("play")
          .setStyle("PRIMARY")
          .setEmoji("⏯️")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("prev")
          .setLabel("")
          .setEmoji("⏮️")
          .setStyle("SECONDARY")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("skip")
          .setEmoji("⏭️")
          .setStyle("SECONDARY")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("stop")
          .setEmoji("⏹️")
          .setStyle("DANGER")
      );

    return row;
  }
}
