import { Message, MessageEmbed } from "discord.js";
import bot from "../bot";
import distube from "../distube";
import { BotIsConnected } from "../interfaces/bot.interface";
import { Voice } from "../interfaces/player.interface";
import FormatService from "./format.service";
import PlayerService from "./player.service";

export default class BotService {
  static async botIsConnected(
    message: Message<boolean>
  ): Promise<BotIsConnected> {
    if (!message) return;

    const voiceChannel: Voice = message.member?.voice.channel;

    if (!voiceChannel) {
      (await message.react("๐ค")).remove();

      const embed = new MessageEmbed()
        .setColor("#FF4B4B")
        .setTitle(`๐   Merci de te mettre dans un channel vocal   ๐`);

      message.reply({
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
    if (!message) return;

    distube.on("error", (message) => {
      if (message.lastMessage) {
        message.lastMessage.react("๐");

        const embed = new MessageEmbed()
          .setColor("#FFA349")
          .setTitle(`Erreur dans le lien...   ๐`)
          .setDescription(`Ou vidรฉo restreinte (รขge, pays, etc.)`);

        message.lastMessage.reply({
          embeds: [embed],
        });
      }
    });

    distube.on("playSong", async (queue, song) => {
      distube.removeAllListeners();
      bot.user?.setActivity(`en lecture de: ${song.name}`);
      const duration: string =
        song.duration < 60 ? "sec" : song.duration < 3600 ? "min" : "hrs";

      const embed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle(`๐   ${song.name}   ๐ถ`)
        .setURL(`${song.url}`)
        .setDescription(
          `Durรฉe:   ${FormatService.formatSeconds(
            song.duration
          )} ${duration}   |   Vues:   ${song.views}`
        );
      message.reactions.removeAll();

      if (!queue.textChannel) {
        message.react("โถ๏ธ");
        (await message.react("๐ฅ")).remove();
        return BotService.editMessage(message, embed);
      }
      if (!queue.textChannel.lastMessage) {
        message.react("โถ๏ธ");
        (await message.react("๐ฅ")).remove();
        return BotService.editMessage(message, embed);
      }

      message.channel.messages
        .fetch(queue.textChannel.lastMessage.id)
        .then((messageToReply) => {
          messageToReply
            .reply({
              embeds: [embed],
              components: [PlayerService.player()],
            })
            .then(async (msg) => {
              msg.react("โถ๏ธ");
              (await msg.react("๐ฅ")).remove();
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    });
  }

  static editMessage(message: Message<boolean>, embed: MessageEmbed): void {
    message
      .edit({
        embeds: [embed],
        components: [PlayerService.player()],
      })
      .catch((error) => console.log(error));
  }

  static async changeSong(
    message: Message<boolean>
  ): Promise<Promise<Message<boolean>> | undefined> {
    if (!message) return;

    const embed = new MessageEmbed()
      .setColor("#FFA349")
      .setTitle(`Changement de son...   ๐`);

    (await message.react("๐")).remove();

    return message.edit({
      embeds: [embed],
      components: [PlayerService.player()],
    });
  }
}
