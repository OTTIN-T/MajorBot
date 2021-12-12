import { Message, MessageEmbed } from "discord.js";
import DisTube from "distube";
import distube from "../distube";
import { BotIsConnected } from "../interfaces/bot.interface";
import { Voice } from "../interfaces/player.interface";
import FormatService from "./format.service";
import PlayerService from "./player.service";

export default class BotService {
  static botIsConnected(message: Message<boolean>): BotIsConnected {
    if (!message) return;

    const voiceChannel: Voice = message.member?.voice.channel;

    if (!voiceChannel) {
      message.react("💤");

      const embed = new MessageEmbed()
        .setColor("#FF4B4B")
        .setTitle(`👉   Merci de te mettre dans un channel vocal   👈`);

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
        message.lastMessage.react("🔇");

        const embed = new MessageEmbed()
          .setColor("#FFA349")
          .setTitle(`Erreur dans le lien...   🔇`)
          .setDescription(`Ou vidéo restreinte (âge, pays, etc.)`);

        message.lastMessage.reply({
          embeds: [embed],
        });
      }
    });

    distube.on("playSong", (queue, song) => {
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

      if (!queue.textChannel) {
        return BotService.editMessage(message, embed);
      }
      if (!queue.textChannel.lastMessage) {
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
            // .then((msg) => {
            //   msg.reactions.removeAll();
            //   // msg.react("▶️");
            //   // return msg.react("🔥");
            // })
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
      // .then((msg) => {
      //   msg.reactions.removeAll();
      //   // msg.react("▶️");
      //   // return msg.react("🔥");
      // })
      .catch((error) => console.log(error));
  }

  static changeSong(
    message: Message<boolean>
  ): Promise<Message<boolean>> | undefined {
    if (!message) return;
    message.react("🔄");

    const embed = new MessageEmbed()
      .setColor("#FFA349")
      .setTitle(`Changement de son...   🔄`);

    return message.edit({
      embeds: [embed],
      components: [PlayerService.player()],
    });
  }
}
