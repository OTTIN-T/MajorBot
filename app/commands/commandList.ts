import { Message, MessageEmbed } from "discord.js";

export default class ListCommand {
  static action(message: Message<boolean>): Promise<Message<boolean>> {
    const embed = new MessageEmbed()
      .setColor("#379C6F")
      .setTitle("ℹ️   Voici la liste des commandes:  ").setDescription(`
      🔊   -    !play {url youtube/spotify/soundcloud}        
       
      ⏹️   -    !stop 

      ⏭️   -    !skip

      ⏮️   -    !prev

      ⏯️   -    !pause
      
      ⏯️   -    !resume
      
      🗺️   -    !nwmap                       
      
      📊   -    !nwserver  

      📝   -   !commands
      
      💡   -   other (soon)`);

    return message.channel.send({
      embeds: [embed],
    });
  }
}
