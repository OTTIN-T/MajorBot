import { Message, MessageEmbed } from "discord.js";

export default class NwMap {
  static action(message: Message<boolean>): Promise<Message<boolean>> {
    const embed = new MessageEmbed()
      .setColor("#7c510b")
      .setTitle(`🗺️   Map New World`)
      .setURL(`https://www.newworld-map.com/#/`)
      .setDescription(`Map interactive New World`);

    message.reactions.removeAll();
    message.react("🗺️");
    return message.reply({
      embeds: [embed],
    });
  }
}
