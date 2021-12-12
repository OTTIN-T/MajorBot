import { Client, Message, MessageEmbed } from "discord.js";
import ENV from "dotenv";
import express from "express";
import bot from "./bot";
import Command from "./commands/command";
import Interaction from "./commands/interaction";
import distube from "./distube";
ENV.config();

const app = express();

const prefix: string = "!";

bot.once("ready", (bot: Client<true>): void => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity("A votre service...!");

  // bot.user.setAvatar("./app/assets/images/crown.png").catch(console.error);

  distube.on("error", (channel, error) => {
    console.error(error);
    channel.send(`An error encoutered: ${error}`);
  });
});

bot.on("messageCreate", async (message: Message<boolean>): Promise<void> => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args: string[] = message.content.slice(prefix.length).trim().split(" ");

  let command: string | undefined = args?.shift();
  if (!command) return;
  command = command.toLowerCase();
  if (command) {
    await Command.action(message, args, command);
  }
});

bot.on("interactionCreate", async (interaction): Promise<any> => {
  if (!interaction.isButton()) return;

  if (interaction.channel) {
    if (interaction.channel.client.voice.adapters.size === 0) {
      const embed = new MessageEmbed()
        .setColor("#FF4B4B")
        .setTitle(`👉   Merci de m'appeler dans un salon vocal   👈`);

      interaction.reply({
        embeds: [embed],
      });

      return setTimeout(async () => {
        await interaction.deleteReply();
      }, 2000);
    }

    await interaction.reply("⏳");
    await interaction.deleteReply();
  }

  await Interaction.action(interaction);

  // if (interaction.customId === "play") {
  //   await Pause.action(interaction.message);
  // }
  // if (interaction.customId === "skip") {
  //   await Skip.action(interaction.message);
  // }
  // if (interaction.customId === "prev") {
  //   await Prev.action(interaction.message);
  // }
  // if (interaction.customId === "stop") {
  //   await Stop.action(interaction.message);
  // }
});

bot.login(process.env.DISCORD_TOKEN);

export default app;
