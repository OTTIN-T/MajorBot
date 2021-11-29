import { MessageActionRow, MessageButton } from "discord.js";

export default class PlayerService {
  constructor() {}

  static player(): MessageActionRow {
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("play")
          .setLabel("⏯️")
          .setStyle("PRIMARY")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("prev")
          .setLabel("⏮️")
          .setStyle("SECONDARY")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("skip")
          .setLabel("⏭️")
          .setStyle("SECONDARY")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("stop")
          .setLabel("⏹️")
          .setStyle("DANGER")
      );

    return row;
  }
}
