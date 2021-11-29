import { Message, MessageEmbed } from "discord.js";
import { Queue, Song } from "distube";
import distube from "../distube";
import { SkipResult } from "../interfaces/player.interface";
import BotService from "../services/bot.service";
import PlayerService from "../services/player.service";

export default class Skip {
  constructor() {}

  static async action(message: Message<boolean>): SkipResult {
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

    const playList: Song[] = queues.songs;

    if (playList.length === 1) {
      message.react("🚫");

      const embed = new MessageEmbed()
        .setColor("#FFA349")
        .setTitle(`Pas de morceau à suivre...   🤷‍♂️`);

      return message.reply({
        embeds: [embed],
        components: [PlayerService.player()],
      });
    }

    message.react("⏭️");
    BotService.changeSong(message);
    distube.skip(message);

    return BotService.playSong(message);
  }
}
