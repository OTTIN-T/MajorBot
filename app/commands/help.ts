import { Message, MessageEmbed } from "discord.js";

export default class Help {
  static action(message: Message<boolean>): Promise<Message<boolean>> {
    const embed = new MessageEmbed()
      .setColor("#379C6F")
      .setTitle("âšī¸   Voici la liste des commandes:  ").setDescription(`
      đ   -    !play {url youtube/spotify/soundcloud}        
       
      âšī¸   -    !stop 

      â­ī¸   -    !skip

      âŽī¸   -    !prev

      â¯ī¸   -    !pause
      
      â¯ī¸   -    !resume
      
      đēī¸   -    !nwmap                       
      
      đ   -    !nwserver  

      đ   -   !help
      
      đĄ   -   other (soon)`);

    return message.channel.send({
      embeds: [embed],
    });
  }
}
