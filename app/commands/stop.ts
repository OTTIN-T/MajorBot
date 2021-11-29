import { Message, MessageEmbed } from "discord.js";
import distube from "../distube";
import { StopResult } from "../interfaces/player.interface";
import BotService from "../services/bot.service";

export default class Stop {
  constructor() {}

  static action(message: Message<boolean>): StopResult {
    if (BotService.botIsConnected(message) === null) return;

    if (BotService.botIsConnected(message) === 0) {
      message.react("🔇");
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

    message.react("⏹️");
    return message.reply({
      embeds: [embed],
    });
  }
}
