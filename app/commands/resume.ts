import { Message, MessageEmbed } from "discord.js";
import { Queue, Song } from "distube";
import distube from "../distube";
import { BotIsConnected } from "../interfaces/bot.interface";
import { ResumeResult } from "../interfaces/player.interface";
import BotService from "../services/bot.service";
import FormatService from "../services/format.service";
import PlayerService from "../services/player.service";
import Pause from "./pause";

export default class Resume {
  static async action(message: Message<boolean>): ResumeResult {
    const guildId: string | undefined = message?.guild?.id;
    if (!guildId) return;

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

    const resumed: boolean | undefined =
      distube.queues.collection.get(guildId)?.paused;
    if (resumed === false) {
      return Pause.action(message);
    }

    const resume: Queue = distube.resume(message);
    const song: Song = resume.songs[0];
    const currentTime: number = resume.currentTime;
    const duration: string =
      currentTime < 60 ? "sec" : currentTime < 3600 ? "min" : "hrs";

    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`🔊   ${song.name}   🎶`)
      .setURL(`${song.url}`)
      .setDescription(
        `Reprise à:   ${FormatService.formatSeconds(currentTime)} ${duration}`
      );

    message.react("▶️");
    return message.reply({
      embeds: [embed],
      components: [PlayerService.player()],
    });
  }
}