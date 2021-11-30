import { Message, MessageEmbed } from "discord.js";
import distube from "../distube";
import { BotIsConnected } from "../interfaces/bot.interface";
import { Voice } from "../interfaces/player.interface";
import FormatService from "./format.service";
import PlayerService from "./player.service";

export default class BotService {
  static botIsConnected(message: Message<boolean>): BotIsConnected {
    const voiceChannel: Voice = message.member?.voice.channel;

    if (!voiceChannel) {
      message.react("💤");

      const embed = new MessageEmbed()
        .setColor("#FF4B4B")
        .setTitle(`👉   Merci de de te mettre dans un channel vocal`);

      message.edit({
        embeds: [embed],
      });

      return voiceChannel;
    }

    const botIsConnected: number = voiceChannel.members
      .map((user) => user.displayName)
      .filter((botName) => botName.includes("MajorBot")).length;

    return botIsConnected;
  }

  static playSong(message: Message<boolean>): void {
    distube.on("playSong", (queue, song) => {
      message.react("▶️");
      message.react("🔥");

      const duration: string =
        song.duration < 60 ? "sec" : song.duration < 3600 ? "min" : "hrs";

      const embed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle(`🔊   ${song.name}   🎶`)
        .setURL(`${song.url}`)
        .setDescription(
          `Durée:   ${FormatService.formatSeconds(
            song.duration
          )} ${duration}   |   Vues:   ${song.views}`
        );

      queue.textChannel?.lastMessage?.edit({
        embeds: [embed],
        components: [PlayerService.player()],
      });
    });
  }

  static changeSong(message: Message<boolean>): void {
    message.react("🔄");

    const embed = new MessageEmbed()
      .setColor("#FFA349")
      .setTitle(`Changement de son...   🔄`);

    message.edit({
      embeds: [embed],
    });
  }
}
