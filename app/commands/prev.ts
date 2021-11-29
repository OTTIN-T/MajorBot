import { Message, MessageEmbed } from "discord.js";
import { Queue, Song } from "distube";
import distube from "../distube";
import { PrevResult } from "../interfaces/player.interface";
import BotService from "../services/bot.service";
import PlayerService from "../services/player.service";

export default class Prev {
  constructor() {}

  static action(message: Message<boolean>): PrevResult {
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

    distube.removeAllListeners();
    const queues: Queue | undefined = distube.getQueue(message);

    if (!queues) return;

    const playList: Song[] = queues.previousSongs;

    if (playList.length === 0) {
      message.react("🚫");

      const embed = new MessageEmbed()
        .setColor("#FFA349")
        .setTitle(`Pas de morceau précédent...   🤷‍♂️`);

      return message.reply({
        embeds: [embed],
        components: [PlayerService.player()],
      });
    }

    message.react("⏮️");
    BotService.changeSong(message);
    distube.previous(message);

    return BotService.playSong(message);
  }
}
