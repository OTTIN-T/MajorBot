import { Message, VoiceChannel } from "discord.js";
import { Voice } from "./player.interface";

export type BotIsConnected =
  | Promise<Message<boolean>>
  | number
  | VoiceChannel
  | Voice;
