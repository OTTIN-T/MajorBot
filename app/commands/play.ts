import { Message, MessageEmbed } from "discord.js";
import distube from "../distube";
import { BotIsConnected } from "../interfaces/bot.interface";
import { PlayResult } from "../interfaces/player.interface";
import BotService from "../services/bot.service";

export default class Play {
  constructor() {}

  static async action(message: Message<boolean>, args: string[]): PlayResult {
    if (BotService.botIsConnected(message) === null) return;

    if (args.length === 0) {
      message.react("🔗");
      const embed = new MessageEmbed()
        .setColor("#FF4B4B")
        .setTitle(`Il manque un lien...   🙈`);

      return message.reply({
        embeds: [embed],
      });
    }
    const listening: number = distube.queues.collection.size;

    distube.removeAllListeners();

    if (listening > 0 && BotService.botIsConnected(message) === 1) {
      BotService.changeSong(message);
      distube.stop(message);
    }

    if (BotService.botIsConnected(message) === 0) {
      message.react("⌛");

      const embed = new MessageEmbed()
        .setColor("#FFA349")
        .setTitle(`La musique arrive...   🎼`);

      message.reply({
        embeds: [embed],
      });
    }

    distube.play(message, args.join(" "));

    message.react("▶️");
    return BotService.playSong(message);
  }
}
