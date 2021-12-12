import { ButtonInteraction, CacheType, Message } from "discord.js";
import DisTube from "distube";
import Pause from "./pause";
import Prev from "./prev";
import Skip from "./skip";
import Stop from "./stop";

export default class Interaction {
  constructor() {}

  static async action(
    interaction: ButtonInteraction<CacheType>
  ): Promise<void | Message<boolean> | number | DisTube> {
    if (interaction.customId === "play") {
      return await Pause.action(interaction.message);
    }
    if (interaction.customId === "skip") {
      return await Skip.action(interaction.message);
    }
    if (interaction.customId === "prev") {
      return await Prev.action(interaction.message);
    }
    if (interaction.customId === "stop") {
      return await Stop.action(interaction.message);
    }
  }
}
