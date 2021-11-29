import { Message, MessageEmbed } from "discord.js";

export default class NwServer {
  static action(message: Message<boolean>): Promise<Message<boolean>> {
    const embed = new MessageEmbed()
      .setColor("#7c510b")
      .setTitle(`📶   Statuts serveur New World`)
      .setURL(`https://newworldstatus.com/`)
      .setDescription(`Statuts des serveurs New World`);

    message.react("📶");
    return message.reply({
      embeds: [embed],
    });
  }
}
