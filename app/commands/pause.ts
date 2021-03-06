import { APIMessage } from "discord-api-types";
import { Message, MessageEmbed } from "discord.js";
import { Queue, Song } from "distube";
import distube from "../distube";
import { PauseResult } from "../interfaces/player.interface";
import BotService from "../services/bot.service";
import FormatService from "../services/format.service";
import PlayerService from "../services/player.service";
import Resume from "./resume";

export default class Pause {
  constructor() {}

  static async action(message: Message<boolean> | APIMessage): PauseResult {
    message = message as Message<boolean>;

    const guildId: string | undefined = message?.guild?.id;
    if (!guildId) return;

    if (BotService.botIsConnected(message) === null) return;

    if ((await BotService.botIsConnected(message)) === 0) {
      (await message.react("π")).remove();

      const embed = new MessageEmbed()
        .setColor("#FFA349")
        .setTitle(`Aucune lecture en cours...   πΌ`);

      return message.edit({
        embeds: [embed],
      });
    }

    const paused: boolean | undefined =
      distube.queues.collection.get(guildId)?.paused;
    if (paused === true) {
      return Resume.action(message);
    }

    const pause: Queue = distube.pause(message);
    const song: Song = pause.songs[0];
    const currentTime: number = pause.currentTime;
    const duration: string =
      currentTime < 60 ? "sec" : currentTime < 3600 ? "min" : "hrs";

    const embed = new MessageEmbed()
      .setColor("#FFA349")
      .setTitle(`π   ${song.name}   πΆ`)
      .setURL(`${song.url}`)
      .setDescription(
        `Mis en pause Γ :   ${FormatService.formatSeconds(
          currentTime
        )} ${duration}`
      );

    message.reactions.removeAll();
    message.react("βΈοΈ");
    return message.edit({
      embeds: [embed],
      components: [PlayerService.player()],
    });
  }
}
