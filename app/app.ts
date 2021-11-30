import {
  Client,
  Message,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} from "discord.js";
import ENV from "dotenv";
import express from "express";
import bot from "./bot";
import ListCommand from "./commands/commandList";
import NwMap from "./commands/nwMap";
import NwServer from "./commands/nwServer";
import Pause from "./commands/pause";
import Play from "./commands/play";
import Prev from "./commands/prev";
import Resume from "./commands/resume";
import Skip from "./commands/skip";
import Stop from "./commands/stop";
import distube from "./distube";
import { commands } from "./models/command.model";
ENV.config();

const app = express();

const prefix: string = "!";

bot.once("ready", (bot: Client<true>): void => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity("A votre service...!");

  distube.on("error", (channel, error) => {
    console.error(error);
    channel.send(`An error encoutered: ${error}`);
  });
});

bot.on("messageCreate", (message: Message<boolean>): void => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args: string[] = message.content.slice(prefix.length).trim().split(" ");

  let command: string | undefined = args?.shift();
  if (!command) return;
  command = command.toLowerCase();

  if (command === commands.command) {
    ListCommand.action(message);
  }
  if (command === commands.play) {
    Play.action(message, args);
  }
  if (command === commands.pause) {
    Pause.action(message);
  }
  if (command === commands.unpause) {
    Resume.action(message);
  }
  if (command === commands.skip) {
    Skip.action(message);
  }
  if (command === commands.prev) {
    Prev.action(message);
  }
  if (command === commands.stop) {
    Stop.action(message);
  }
  if (command === commands.nwmap) {
    NwMap.action(message);
  }
  if (command === commands.nwserver) {
    NwServer.action(message);
  }
});

bot.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;
  await interaction.reply("⏳");
  await interaction.deleteReply();
  if (interaction.customId === "play") {
    Pause.action(interaction.message);
    // await interaction.deferReply({ ephemeral: true });
    // await interaction.editReply("⏯️");
    // await interaction.deleteReply();
  }
  if (interaction.customId === "skip") {
    Skip.action(interaction.message);
  }
  if (interaction.customId === "prev") {
    Prev.action(interaction.message);
  }
  if (interaction.customId === "stop") {
    Stop.action(interaction.message);
  }
});

bot.login(process.env.DISCORD_TOKEN);

export default app;
