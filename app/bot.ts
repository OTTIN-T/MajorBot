import Discord from "discord.js";

const bot: Discord.Client<boolean> = new Discord.Client({
  intents: ["GUILDS", "GUILD_VOICE_STATES", "GUILD_MESSAGES"],
});

export default bot;
