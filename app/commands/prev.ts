import { APIMessage } from "discord-api-types";
import { Message, MessageEmbed } from "discord.js";
import { Queue, Song } from "distube";
import distube from "../distube";
import { PrevResult } from "../interfaces/player.interface";
import BotService from "../services/bot.service";

export default class Prev {
  constructor() {}

  static async action(
    message: Message<boolean> | APIMessage
  ): Promise<PrevResult | number> {
    if (!message) return;
    message = message as Message<boolean>;

    if (BotService.botIsConnected(message) === null) return;

    if ((await BotService.botIsConnected(message)) === 0) {
      (await message.react("🔇")).remove();

      const embed = new MessageEmbed()
        .setColor("#FFA349")
        .setTitle(`Aucune lecture en cours...   🎼`);

      return message.edit({
        embeds: [embed],
      });
    }

    distube.removeAllListeners();
    const queues: Queue | undefined = distube.getQueue(message);

    if (!queues) return;

    const playList: Song[] = queues.previousSongs;

    if (playList.length === 0) {
      (await message.react("🚫")).remove();

      const noSong = new MessageEmbed()
        .setColor("#FFA349")
        .setTitle(`Pas de morceau précédent...   🤷‍♂️`);

      message
        .reply({
          embeds: [noSong],
        })
        .then((messageToReply) => {
          messageToReply.channel.messages
            .fetch(messageToReply.id)
            .then((msg) => {
              setTimeout(() => {
                return msg.delete();
              }, 3000);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });

      return;
    }
    message.reactions.removeAll();
    message.react("⏮️");

    distube.previous(message);
    BotService.changeSong(message);

    return BotService.playSong(message);
  }
}
