import { APIMessage } from "discord-api-types";
import { Message, MessageEmbed } from "discord.js";
import distube from "../distube";
import { StopResult } from "../interfaces/player.interface";
import BotService from "../services/bot.service";

export default class Stop {
  constructor() {}

  static async action(
    message: Message<boolean> | APIMessage
  ): Promise<StopResult> {
    if (!message) return;
    message = message as Message<boolean>;

    if (BotService.botIsConnected(message) === null) return;

    if ((await BotService.botIsConnected(message)) === 0) {
      (await message.react("🔇")).remove();

      const embed = new MessageEmbed()
        .setColor("#FFA349")
        .setTitle(`Aucune lecture en cours...   🎼`);

      return message.reply({
        embeds: [embed],
      });
    }

    distube.stop(message);
    const embed = new MessageEmbed()
      .setColor("#FF4B4B")
      .setTitle(`À plus tard !   👋`);

    message.reactions.removeAll();
    message.react("⏹️");
    return message.edit({
      embeds: [embed],
    });
  }
}
